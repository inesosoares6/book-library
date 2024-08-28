# book-library

<p align="center">
<img height="600" alt="image" src="https://github.com/user-attachments/assets/f425d8fe-a568-455a-be6a-c118eb3835c9">
</p>

<p align="center">
<img height="600" alt="image" src="https://github.com/user-attachments/assets/984c5e01-d695-46c5-824b-6b5064397e1b">
</p>

## Context
Me and my father are passionate about reading and sometimes our tastes in books collide. To avoid buying books that we already had at home, I decided to create a mobile app to store our books and distinguish to which library they belong (mine or my father's). So, now we can save the money we would waste on duplicated books and buy new ones.

## Requirements
- Create a database for the home library;
- Have a way to quickly add books: scan the ISBN bar code and automatically retrieve the book data;
- Have a fallback plan when the API does not find the book data: manually insert the data;
- Have a fallback plan when the camera is not able to read the barcode: manually insert the ISBN code;
- Add filters to easily search for books within the app;
- Possibility to have multiple libraries.

## Development
Technologies:
- Frameworks: VueJS and Vuetify
- State Management: Pinia
- Database: Google Firebase (Realtime Database)

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run dev
```


### Build the app for production
```bash
npm run build
```
