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
			<div
				v-if="state === 1"
				class="d-flex flex-column align-center justify-center h-100 w-100"
			>
				<span class="text-h4">ISBN: {{ resultValue }}</span>
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
				<v-text-field
					v-model="book.title"
					label="Title"
					variant="outlined"
					:autofocus="!book.title"
					required
					hide-details
				/>
				<v-text-field
					v-model="book.author"
					label="Author"
					variant="outlined"
					:autofocus="!book.author && !!book.title"
					required
					hide-details
				/>
				<v-text-field
					v-model="book.cover"
					label="Cover"
					variant="outlined"
					:autofocus="!book.cover && !!book.title && !!book.author"
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
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'
import { useAppStore } from '@/stores/app'
import { getBookDetails } from '@/services/app-services'

const store = useAppStore()

const libraries = computed(() => store.getLibraries)
const addBookDialog = ref(false)
const showStopScanButton = ref(false)
const state = ref(0)

const bookInitialState = {
	title: '',
	author: '',
	cover: '',
	read: false,
	library: ''
}
const book = ref({ ...bookInitialState })

const closeModal = () => {
	state.value = 0
	addBookDialog.value = false
	book.value = { ...bookInitialState }
}

const addBook = () => {
	store.addBook({ ...book.value, id: store.getNextBookId })
	closeModal()
}

const resultValue = ref()

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
}

watch(state, async () => {
	if (state.value === 1) {
		showStopScanButton.value = true
		resultValue.value = await scanSingleBarcode()
		const result = await getBookDetails(resultValue.value)
		if (result) {
			book.value = { ...result }
		} else {
			//show warning to fill it manually
		}
		showStopScanButton.value = false
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
