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
				class="h-100 w-100 px-10 d-flex flex-column ga-10 justify-center"
			>
				<v-btn
					color="primary"
					size="x-large"
					@click="state = 1"
				>
					Read barcode
				</v-btn>
				<BaseSeparator text="OR" />
				<v-btn
					variant="outlined"
					size="x-large"
					color="primary"
					@click="state = 2"
				>
					Enter data manually
				</v-btn>
			</div>
			<div
				v-if="state === 1"
				class="d-flex flex-column align-center justify-center h-100 w-100"
			>
				<v-progress-circular
					color="primary"
					indeterminate
				/>
				<v-btn
					v-if="showStopScanButton"
					class="stop-scan-btn position-absolute bottom-0 mb-10"
					color="error"
					@click="stopScan"
				>
					Stop Scan
				</v-btn>
			</div>
			<div
				v-if="state === 2"
				class="pa-10 d-flex flex-column ga-5"
			>
				<v-alert
					v-if="showWarningAlert"
					text="It was not possible to retrieve the book data through the ISBN code. Please fill it manually."
					title="Warning"
					type="warning"
					variant="outlined"
					min-height="120"
				/>
				<div
					v-if="!props.book"
					class="d-flex flex-column ga-8"
				>
					<div class="w-100 d-flex ga-8 mb-3 align-center">
						<v-text-field
							v-model="isbnCode"
							label="ISBN"
							variant="outlined"
							required
							clearable
							hide-details
							:disabled="isLoading"
						/>
						<v-btn
							:disabled="isbnCode?.length !== 13"
							variant="outlined"
							color="primary"
							icon="mdi-arrow-right-bold"
							@click="fetchBookDetails"
						/>
					</div>
					<BaseSeparator
						text="OR"
						class="mb-5"
					/>
				</div>
				<v-text-field
					v-model="book.title"
					label="Title"
					variant="outlined"
					:autofocus="!book.title"
					required
					clearable
					hide-details
					:disabled="isLoading"
				/>
				<div class="d-flex ga-3">
					<v-text-field
						v-model="book.author"
						label="Author"
						variant="outlined"
						:autofocus="!book.author && !!book.title"
						required
						clearable
						hide-details
						:disabled="isLoading"
					/>
					<v-checkbox
						v-model="keepAuthorName"
						hide-details
						:disabled="isLoading"
					/>
				</div>
				<div class="d-flex ga-3">
					<v-select
						v-model="book.library"
						:items="libraries"
						label="Library"
						variant="outlined"
						hide-details
						required
						:disabled="isLoading"
					/>
					<v-checkbox
						v-model="book.read"
						label="Already read"
						hide-details
						:disabled="isLoading"
					/>
				</div>
				<v-btn
					class="mt-5"
					color="primary"
					:disabled="
						Object.values(book).some(value => ['', null, undefined].includes(value as string))
					"
					@click="submitBook"
					:loading="isLoading"
				>
					Submit
				</v-btn>
			</div>
			<v-btn
				v-if="props.book"
				class="position-absolute bottom-0 mb-10"
				style="left: 50%; transform: translate(-50%, 0%)"
				color="red"
				variant="outlined"
				@click="deleteBook"
				:disabled="isLoading"
			>
				Delete
			</v-btn>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'
import { useAppStore } from '@/stores/app'
import { getBookDetails } from '@/services/app-services'
import { Book } from '@/types/AppTypes'
import { v4 as uuidv4 } from 'uuid'

const store = useAppStore()

const props = defineProps<{
	book?: Book
}>()
const emit = defineEmits(['completed'])

const libraries = computed(() => store.getLibraries)
const defaultLibrary = computed(() => store.getDefaultLibrary)
const closeModalAfterAddingBook = computed(
	() => store.getCloseModalAfterAddingBook
)
const addBookDialog = ref(false)
const showStopScanButton = ref(false)
const showWarningAlert = ref(false)
const state = ref(0)
const keepAuthorName = ref(false)
const isLoading = ref(false)

const bookInitialState = {
	id: 'new',
	title: '',
	author: '',
	read: false,
	library: ''
}
const book = ref({ ...bookInitialState })

const isbnCode = ref()

const closeModal = () => {
	book.value = {
		...bookInitialState,
		library: defaultLibrary.value,
		author: keepAuthorName.value ? book.value.author : ''
	}
	showWarningAlert.value = false
	isbnCode.value = null

	if (closeModalAfterAddingBook.value || !isLoading.value) {
		state.value = 0
		addBookDialog.value = false
	}
	isLoading.value = false
	emit('completed')
}

const deleteBook = () => {
	store.deleteBook(book.value.id)
	closeModal()
}

const submitBook = async () => {
	isLoading.value = true
	if (props.book) {
		await store.addBook(book.value)
	} else {
		await store.addBook({ ...book.value, id: uuidv4() })
	}
	closeModal()
}

const scanSingleBarcode = async () => {
	return new Promise<string>(async resolve => {
		document.querySelector('body')?.classList.add('barcode-scanner-active')

		const listener = await BarcodeScanner.addListener(
			'barcodeScanned',
			async result => {
				await listener.remove()
				document
					.querySelector('body')
					?.classList.remove('barcode-scanner-active')
				await BarcodeScanner.stopScan()
				resolve(result.barcode.displayValue)
			}
		)

		await BarcodeScanner.startScan()
	})
}

const stopScan = async () => {
	showStopScanButton.value = false
	document.querySelector('body')?.classList.remove('barcode-scanner-active')
	await BarcodeScanner.removeAllListeners()
	await BarcodeScanner.stopScan()
	state.value = 2
	showWarningAlert.value = true
	book.value = { ...bookInitialState, library: defaultLibrary.value }
}

const fetchBookDetails = async () => {
	showWarningAlert.value = false
	const result = await getBookDetails(isbnCode.value)
	if (result) {
		book.value = { ...book.value, ...result }
	} else {
		showWarningAlert.value = true
		book.value = { ...bookInitialState, library: defaultLibrary.value }
	}
}

watch(state, async () => {
	if (state.value === 1) {
		showStopScanButton.value = true
		isbnCode.value = await scanSingleBarcode()
		await fetchBookDetails()
		state.value = 2
	}
})

watch(defaultLibrary, () => {
	book.value.library = defaultLibrary.value
})

onBeforeMount(() => {
	if (props.book) {
		book.value = { ...book.value, ...props.book }
		state.value = 2
	}
})
</script>

<style lang="css">
body.barcode-scanner-active {
	visibility: hidden;
}

.stop-scan-btn {
	visibility: visible;
}
</style>
