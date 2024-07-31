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
		<BooksList
			v-if="booksLoaded"
			purpose="display"
		/>
		<v-skeleton-loader
			v-else
			class="w-100"
			type="list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line,list-item-avatar-two-line"
		/>

		<div class="floating-button">
			<v-btn
				style="pointer-events: all"
				icon
				size="large"
				color="primary"
			>
				<v-icon>mdi-plus</v-icon>
				<AddEditBook />
			</v-btn>
		</div>
	</v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const booksLoaded = computed(() => store.getBooksLoaded)

const libraries = computed(() => store.getAllLibraries)
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

onBeforeMount(() => {
	store.fetchBooks()
	store.fetchLibraries()
	store.fetchSettings()
})
</script>

<style scoped lang="css">
.floating-button {
	position: fixed;
	bottom: 25px;
	left: 50%;
	z-index: 10;
	pointer-events: none;
	transform: translate(-50%, 0%);
}
</style>
