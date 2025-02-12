<template>
	<v-text-field
		v-model="search"
		label="Pesquisa"
		prepend-inner-icon="mdi-magnify"
		variant="outlined"
		clearable
		hide-details
		single-line
		:class="{ 'mb-4': purpose === 'delete' }"
	/>

	<div ref="listContainer">
		<v-virtual-scroll
			v-if="booksFiltered.length"
			:height="scrollerHeight"
			:items="booksFiltered"
			item-height="75"
		>
			<template v-slot:default="{ item: book, index }">
				<v-list-item
					:title="book.title"
					:subtitle="book.author"
					@click="editBookDialog[book.id] = true"
				>
					<template v-slot:prepend>
						<v-avatar :color="colorMapper(getAvatarLetter(book))">
							{{ getAvatarLetter(book) }}
						</v-avatar>
					</template>
					<template v-slot:append>
						<div
							v-if="purpose === 'display'"
							class="d-flex flex-column ga-2"
						>
							<v-icon :color="book.read ? 'green' : 'grey'">
								mdi-check-bold
							</v-icon>
							<v-icon :color="book.library.toLowerCase()">
								mdi-book-variant
							</v-icon>
						</div>
						<v-btn
							v-else
							icon
							flat
						>
							<v-icon color="red">mdi-delete</v-icon>
							<ConfirmationPopup
								:text="getConfirmationText(book)"
								button-class="red-darken-3"
								@confirm="store.deleteBook(book.id)"
							/>
						</v-btn>
					</template>
					<AddEditBook
						v-if="editBookDialog[book.id]"
						v-model="editBookDialog[book.id]"
						:book="book"
						@completed="editBookDialog[book.id] = false"
					/>
				</v-list-item>
				<v-divider
					inset
					v-if="index < booksFiltered.length - 1"
					class="my-2"
				/>
			</template>
		</v-virtual-scroll>
		<div
			v-else
			class="text-center pa-4"
		>
			No Books found with those filters.
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { colorMapper } from '@/helpers/mappers'
import { Book } from '@/types/AppTypes'
import { cleanString } from '@/helpers/stringHelpers'

defineProps<{
	purpose: 'display' | 'delete'
}>()

const store = useAppStore()

const search = ref('')
const listContainer = ref<HTMLElement>()
const editBookDialog: Ref<Record<string, boolean>> = ref({})
const scrollerHeight = ref(0)

const books = computed(() => store.getBooks)
const booksFiltered: ComputedRef<Book[]> = computed(() => {
	if (!books.value?.length) return []
	if (!search.value?.length) return books.value

	let searchData = cleanString(search.value).replace(/ /g, ')(?=.*')
	searchData = '(?=.*' + searchData + ').*'
	const regexToSearch = new RegExp(searchData, 'gi')

	return books.value?.filter((e: Book) =>
		cleanString(e.title + ' ' + e.author).match(regexToSearch)
	)
})

const orderBy = computed(() => store.getCurrentOrderKey)

const getAvatarLetter = (book: Book) =>
	orderBy.value === 'Title' ? book.title[0] : book.author[0]

const getConfirmationText = (book: Book) =>
	`Are you sure you want to delete
							<span class='font-weight-bold text-secondary'>
								${book.title} (${book.author})
							</span>
							?`

onMounted(() => {
	scrollerHeight.value =
		window.innerHeight -
		(listContainer.value as HTMLElement)?.getBoundingClientRect().top
})
</script>
