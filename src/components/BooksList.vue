<template>
	<v-text-field
		v-model="search"
		label="Pesquisa"
		prepend-inner-icon="mdi-magnify"
		variant="outlined"
		hide-details
		single-line
	/>

	<v-list lines="two">
		<div v-if="booksFiltered.length">
			<div
				v-for="(book, index) in booksFiltered"
				:key="index"
			>
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
								@confirm="handleDelete(book.id)"
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
			</div>
		</div>
		<div
			v-else
			class="text-center pa-4"
		>
			No Books found with those filters.
		</div>
	</v-list>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { colorMapper } from '@/helpers/mappers'
import { Book } from '@/types/AppTypes'

defineProps<{
	purpose: 'display' | 'delete'
}>()

const store = useAppStore()

const search = ref('')
const editBookDialog: Ref<Record<string, boolean>> = ref({})

const books = computed(() => store.getBooks)
const booksFiltered = computed(() => {
	if (!books.value?.length) return []
	if (!search.value?.length) return books.value

	let searchData = search.value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/ /g, ')(?=.*')
	searchData = '(?=.*' + searchData + ').*'
	const regexToSearch = new RegExp(searchData, 'gi')

	return books.value?.filter(e => {
		return (e.title + ' ' + e.author)
			.toString()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.match(regexToSearch)
	})
})

const orderBy = computed(() => store.getCurrentOrderKey)

const getAvatarLetter = (book: Book) => {
	return orderBy.value === 'Title' ? book.title[0] : book.author[0]
}

const getConfirmationText = (book: Book) => {
	return `Are you sure you want to delete
							<span class='font-weight-bold text-secondary'>
								${book.title} (${book.author})
							</span>
							?`
}

const handleDelete = (id: number) => {
	store.deleteBook(id)
}
</script>
