import { Book, StoreState } from '@/types/AppTypes'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: (): StoreState => ({
		books: [
			{
				id: 1,
				title: 'Terra americana',
				author: 'Jeanine Cummins',
				cover:
					'http://books.google.com/books/content?id=p8s2zgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
				read: false,
				library: 'orange'
			},
			{
				id: 2,
				title: 'The Nightingale',
				author: 'Kristin Hannah',
				cover:
					'http://books.google.com/books/content?id=B6eQBQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
				read: true,
				library: 'blue'
			},
			{
				id: 3,
				title: 'Americanah',
				author: 'Chimamanda Ngozi Adichie',
				cover:
					'http://books.google.com/books/content?id=oOeMEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
				read: true,
				library: 'blue'
			}
		],
		orderByList: ['Title', 'Author'],
		libraries: ['All', 'orange', 'blue'],
		currentOrderKey: 'Title',
		currentLibrary: 'All'
	}),
	getters: {
		getBooks: state => {
			let booksTmp = state.books
			if (state.currentLibrary !== 'All') {
				booksTmp = booksTmp.filter(
					book => book.library === state.currentLibrary
				)
			}
			switch (state.currentOrderKey) {
				case 'Title':
					return booksTmp.sort((a, b) => a.title.localeCompare(b.title))
				case 'Author':
					return booksTmp.sort((a, b) => a.author.localeCompare(b.author))
			}
		},
		getOrderByList: state => state.orderByList,
		getLibraries: state => state.libraries,
		getCurrentOrderKey: state => state.currentOrderKey,
		getCurrentLibrary: state => state.currentLibrary
	},
	actions: {
		setBooks(books: Book[]) {
			this.books = books
		},
		addLibrary(library: string) {
			this.libraries.push(library)
		},
		setCurrentOrderKey(currentOrderKey: string) {
			this.currentOrderKey = currentOrderKey
		},
		setCurrentLibrary(currentLibrary: string) {
			this.currentLibrary = currentLibrary
		}
	}
})
