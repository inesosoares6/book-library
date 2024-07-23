export type Book = {
	id: number
	title: string
	author: string
	cover: string
	read: boolean
	library: string
}

export type StoreState = {
	books: Book[]
	orderByList: string[]
	libraries: string[]
  currentOrderKey: string
  currentLibrary: string
}
