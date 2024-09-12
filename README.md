# Star Wars Assignment

## General
1. This App was created with react-create-app altho for larger apps i recommend using vite/webpack to have more control.
2. Latest React and Typescript versions used.
3. CSS - I did want to have more control over the css so i used CSS Modules with a combination of default css vars.
4. Linters - eslint for code lint, stylelint for css lint

## Search Page
* Added debounce logic on the input

## Optimizations If I had more time
1. The API is slow, i would suggest caching in the backend using redis or something.
2. I did the search with promise.all but i think a better solution will be to display each category once the data is ready.
3. Skeleton Loader.
4. Better accessibility
5. Enhanced UX

## Running
You can use the app in github pages, to run locally:
1. npm install
2. npm run start