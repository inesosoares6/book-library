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
	defaultLibrary: string
	dataLoaded: boolean
}

export type OverviewData = {
	Books: number
	Read: number
	Unread: number
}
