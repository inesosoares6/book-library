import axios from 'axios'

const librariesApi = [() => getFromGoogleApi, () => getFromOpenLibrary]

export const getBookDetails = async (isbnCode: string) => {
	for (const api of librariesApi) {
		const response = await api()(isbnCode)
		if (response) {
			return response
		}
	}
	return null
}

export const getFromOpenLibrary = async (isbnCode: string) => {
	const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbnCode}&jscmd=details&format=json`

	try {
		const response = await axios.get(url)
		if (response.data[`ISBN:${isbnCode}`]) {
			const bookData = response.data[`ISBN:${isbnCode}`]
			return {
				title: bookData.details.title,
				author: bookData.details?.authors ? bookData.details?.authors[0] : '',
				date: bookData.details.publish_date
			}
		} else {
			return null
		}
	} catch (error) {
		console.error('Error fetching book details:', error)
		return null
	}
}

const getFromGoogleApi = async (isbnCode: string) => {
	const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnCode}`

	try {
		const response = await axios.get(url)
		if (response.data.items?.length > 0) {
			const bookData = response.data.items[0].volumeInfo
			return {
				title: bookData.title,
				author: bookData?.authors ? bookData?.authors[0] : '',
				date: bookData.publishedDate.split('-')[0]
			}
		} else {
			return null
		}
	} catch (error) {
		console.error('Error fetching book details:', error)
		return null
	}
}
