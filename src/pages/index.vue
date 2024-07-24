<template>
	<v-container class="d-flex flex-column ga-5">
		<div class="d-flex ga-3">
			<v-select
				v-model="library"
				label="Library"
				variant="outlined"
				hide-details
				:items="libraries"
			/>
			<v-select
				v-model="orderBy"
				label="Order By"
				variant="outlined"
				hide-details
				:items="orderList"
			/>
		</div>
		<v-text-field
			v-model="search"
			label="Pesquisa"
			prepend-inner-icon="mdi-magnify"
			variant="outlined"
			hide-details
			single-line
		/>

		<v-list
			lines="two"
			v-if="books?.length"
		>
			<div
				v-for="(book, index) in booksFiltered"
				:key="index"
			>
				<v-list-item
					:title="book.title"
					:subtitle="book.author"
				>
					<template v-slot:prepend>
						<v-avatar :color="colorMapper(getAvatarLetter(book))">
							{{ getAvatarLetter(book) }}
						</v-avatar>
					</template>
					<template v-slot:append>
						<div class="d-flex flex-column ga-2">
							<v-icon :color="book.read ? 'green' : 'grey'">
								mdi-check-bold
							</v-icon>
							<v-icon :color="book.library">mdi-book-variant</v-icon>
						</div>
					</template>
				</v-list-item>
				<v-divider
					inset
					v-if="index < books.length - 1"
					class="my-2"
				/>
			</div>
		</v-list>
		<v-skeleton-loader
			v-else
			class="w-100"
			type="list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,"
		/>

		<div class="floating-button">
			<v-btn
				style="pointer-events: all"
				icon
				size="small"
				color="primary"
			>
				<v-icon>mdi-plus</v-icon>
				<AddBook />
			</v-btn>
		</div>
	</v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { colorMapper } from '@/helpers/mappers'
import { Book } from '@/types/AppTypes'

const store = useAppStore()

const search = ref('')

const books = computed(() => store.getBooks)

const booksFiltered = computed(() =>
	books.value?.filter(
		book =>
			book.title.toLowerCase().includes(search.value.toLowerCase()) ||
			book.author.toLowerCase().includes(search.value.toLowerCase())
	)
)

const libraries = computed(() => store.getLibraries)
const orderList = computed(() => store.getOrderByList)
const library = computed({
	get() {
		return store.getCurrentLibrary
	},
	set(value) {
		store.setCurrentLibrary(value)
	}
})
const orderBy = computed({
	get() {
		return store.getCurrentOrderKey
	},
	set(value) {
		store.setCurrentOrderKey(value)
	}
})

const getAvatarLetter = (book: Book) => {
	return orderBy.value === 'Title' ? book.title[0] : book.author[0]
}
</script>

<style scoped lang="css">
.floating-button {
	position: fixed;
	bottom: 25px;
	left: 50%;
	z-index: 10;
	pointer-events: none;
	transform: translate(-25%, 0%);
}
</style>
