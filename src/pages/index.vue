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
			v-if="books.length"
		>
			<div
				v-for="(book, index) in books"
				:key="index"
			>
				<v-list-item
					:title="book.title"
					:subtitle="book.author"
				>
					<template v-slot:prepend>
						<v-avatar>
							<v-img
								:src="book.cover"
								cover
							/>
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
	</v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const search = ref('')

const books = computed(() => store.getBooks)
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
</script>
