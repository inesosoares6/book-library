export type Book = {
	id: number
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
}

export type OverviewData = {
  Books: number
  Read: number
  Unread: number
}
