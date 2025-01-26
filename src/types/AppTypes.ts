export type Book = {
	id: string
	title: string
	author: string
	read: boolean
	library: string
}

export type StoreState = {
	books: Book[]
	orderByList: string[]
	libraries: string[]
	currentOrderKey: string
	currentLibrary: string
	dataLoaded: boolean
	settings: {
		defaultLibrary: string
		closeModalAfterAddingBook: boolean
	}
}

export type OverviewData = {
	Books: number
	Read: number
	Unread: number
}
