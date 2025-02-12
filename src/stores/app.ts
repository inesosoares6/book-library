import { Book, OverviewData, StoreState } from '@/types/AppTypes'
import { defineStore } from 'pinia'
import {
	getDatabase,
	ref,
	set,
	remove,
	update,
	onValue
} from 'firebase/database'

const db = getDatabase()
export const useAppStore = defineStore('app', {
	state: (): StoreState => ({
		books: [],
		orderByList: ['Title', 'Author'],
		libraries: [],
		currentOrderKey: 'Title',
		currentLibrary: 'All',
		dataLoaded: false,
		settings: {
			defaultLibrary: '',
			closeModalAfterAddingBook: false
		}
	}),
	getters: {
		getBooksLoaded: state => state.dataLoaded,
		getBooks: state => {
			let booksTmp = state.books
			if (state.currentLibrary !== 'All') {
				booksTmp = booksTmp.filter(
					(book: Book) => book.library === state.currentLibrary
				)
			}
			switch (state.currentOrderKey) {
				case 'Title':
					return booksTmp.sort((a: Book, b: Book) =>
						a.title.localeCompare(b.title)
					)
				case 'Author':
					return booksTmp.sort((a: Book, b: Book) =>
						a.author.localeCompare(b.author)
					)
			}
			return booksTmp
		},
		getOrderByList: state => state.orderByList,
		getAllLibraries: state => ['All', ...state.libraries],
		getLibraries: state => state.libraries,
		getCurrentOrderKey: state => state.currentOrderKey,
		getCurrentLibrary: state => state.currentLibrary,
		getDefaultLibrary: state => state.settings.defaultLibrary,
		getCloseModalAfterAddingBook: state =>
			state.settings.closeModalAfterAddingBook,
		getOverviewData(state) {
			let overviewData: Record<string, OverviewData> = {
				All: {
					Books: state.books.length,
					Read: state.books.filter((book: Book) => book.read).length,
					Unread: state.books.filter((book: Book) => !book.read).length
				}
			}
			this.getLibraries.forEach((library: any) => {
				overviewData[library] = {
					Books: state.books.filter((book: Book) => book.library === library)
						.length,
					Read: state.books.filter(
						(book: Book) => book.library === library && book.read
					).length,
					Unread: state.books.filter(
						(book: Book) => book.library === library && !book.read
					).length
				}
			})
			return overviewData
		}
	},
	actions: {
		addBook(book: Book) {
			this.writeToDB('books', book)
		},
		addLibrary(library: string) {
			set(ref(db, `libraries/${this.libraries.length}`), library)
		},
		setCurrentOrderKey(currentOrderKey: string) {
			this.currentOrderKey = currentOrderKey
		},
		setCurrentLibrary(currentLibrary: string) {
			this.currentLibrary = currentLibrary
		},
		setDefaultLibrary(defaultLibrary: string) {
			set(ref(db, 'settings/defaultLibrary'), defaultLibrary)
		},
		setCloseModalAfterAddingBook(value: boolean) {
			set(ref(db, 'settings/closeModalAfterAddingBook'), value)
		},
		deleteBook(id: string) {
			this.removeItemInDB(`books/${id}`)
		},
		writeToDB(key: string, payload: any) {
			set(ref(db, `${key}/` + payload.id), payload)
		},
		updateItemInDB(updates: Record<string, never>) {
			update(ref(db), updates)
		},
		removeItemInDB(path: string) {
			remove(ref(db, path))
		},
		fetchBooks() {
			onValue(ref(db, 'books'), snapshot => {
				this.books = Object.values(snapshot.val() ?? [])
				this.dataLoaded = true
			})
		},
		fetchLibraries() {
			onValue(ref(db, 'libraries'), snapshot => {
				this.libraries = Object.values(snapshot.val() ?? [])
			})
		},
		fetchSettings() {
			onValue(ref(db, 'settings'), snapshot => {
				this.settings = snapshot.val()
			})
		}
	}
})
