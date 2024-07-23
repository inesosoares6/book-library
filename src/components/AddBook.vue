<template>
	<v-dialog
		v-model="addBookDialog"
		activator="parent"
		transition="dialog-bottom-transition"
		fullscreen
	>
		<v-card>
			<v-toolbar>
				<v-btn
					icon="mdi-close"
					@click="closeModal"
				/>

				<v-toolbar-title>Add Book</v-toolbar-title>
			</v-toolbar>
			<div
				v-if="state === 0"
				class="h-100 d-flex flex-column ga-10 justify-center align-center"
			>
				<v-btn
					color="primary"
					@click="state = 1"
				>
					Read barcode
				</v-btn>
				<v-btn
					variant="outlined"
					color="primary"
					@click="state = 2"
				>
					Enter data manually
				</v-btn>
			</div>
			<div v-if="state === 1">Read barcode</div>
			<div
				v-if="state === 2"
				class="pa-10 d-flex flex-column ga-5"
			>
				<v-text-field
					v-model="book.title"
					label="Title"
					variant="outlined"
					required
					autofocus
					hide-details
				/>
				<v-text-field
					v-model="book.author"
					label="Author"
					variant="outlined"
					required
					hide-details
				/>
				<v-text-field
					v-model="book.cover"
					label="Cover"
					variant="outlined"
					required
					hide-details
				/>
				<div class="d-flex ga-3">
					<v-select
						v-model="book.library"
						:items="libraries"
						label="Library"
						variant="outlined"
						hide-details
						required
					/>
					<v-checkbox
						v-model="book.read"
						label="Already read"
						hide-details
					/>
				</div>
				<v-btn
					class="mt-5"
					color="primary"
					:disabled="Object.values(book).some(value => value === '')"
					@click="addBook"
				>
					Submit
				</v-btn>
			</div>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const libraries = computed(() => store.getLibraries)
const addBookDialog = ref(false)

const state = ref(0)
const book = ref({
	title: '',
	author: '',
	cover: '',
	read: false,
	library: ''
})

const closeModal = () => {
	state.value = 0
	addBookDialog.value = false
}

const addBook = () => {
	store.addBook({ ...book.value, id: store.getNextBookId })
	closeModal()
}
</script>
