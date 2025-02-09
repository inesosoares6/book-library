import { cleanString } from './stringHelpers'

export const colorMapper = (input: string | number) => {
	const obj = {
		0: 'green-lighten-5',
		1: 'green-lighten-4',
		2: 'green-lighten-3',
		3: 'green-lighten-2',
		4: 'green-lighten-1',
		5: 'green',
		6: 'green-darken-1',
		7: 'light-green-lighten-5',
		8: 'light-green-lighten-4',
		9: 'light-green-lighten-3',
		A: 'light-green-lighten-2',
		B: 'light-green-lighten-1',
		C: 'light-green',
		D: 'light-green-darken-1',
		E: 'teal-lighten-5',
		F: 'teal-lighten-4',
		G: 'teal-lighten-3',
		H: 'teal-lighten-2',
		I: 'teal-lighten-1',
		J: 'teal',
		K: 'teal-darken-1',
		L: 'cyan-lighten-5',
		M: 'cyan-lighten-4',
		N: 'cyan-lighten-3',
		O: 'cyan-lighten-2',
		P: 'cyan-lighten-1',
		Q: 'amber-lighten-5',
		R: 'amber-lighten-4',
		S: 'amber-lighten-3',
		T: 'amber-lighten-2',
		U: 'amber-lighten-1',
		V: 'amber',
		W: 'amber-darken-1',
		X: 'orange-lighten-5',
		Y: 'orange-lighten-4',
		Z: 'orange-lighten-3'
	}

	const key = cleanString(String(input)).toUpperCase()
	return obj[key as keyof typeof obj]
}
