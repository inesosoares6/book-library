export const colorMapper = (letter: string) => {
	const obj = {
		A: 'green-lighten-5',
		B: 'green-lighten-4',
		C: 'green-lighten-3',
		D: 'green-lighten-2',
		E: 'green-lighten-1',
		F: 'green',
		G: 'green-darken-1',
		H: 'light-green-lighten-5',
		I: 'light-green-lighten-4',
		J: 'light-green-lighten-3',
		K: 'light-green-lighten-2',
		L: 'light-green-lighten-1',
		M: 'light-green',
		N: 'light-green-darken-1',
		O: 'teal-lighten-5',
		P: 'teal-lighten-4',
		Q: 'teal-lighten-3',
		R: 'teal-lighten-2',
		S: 'teal-lighten-1',
		T: 'teal',
		U: 'teal-darken-1',
		V: 'cyan-lighten-5',
		W: 'cyan-lighten-4',
		X: 'cyan-lighten-3',
		Y: 'cyan-lighten-2',
		Z: 'cyan-lighten-1'
	}
	//@ts-ignore
	return obj[letter]
}
