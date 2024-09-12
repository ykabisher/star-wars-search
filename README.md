# Star Wars Assignment
![star wars](https://github.com/user-attachments/assets/ef80a3ce-a0bc-400c-a333-0d86d7ebe2a8)
 
URL (Will be deleted in a week):
https://ykabisher.github.io/star-wars-search

## General
1. This App was created with react-create-app altho for larger apps i recommend using vite/webpack to have more control.
2. Latest React and Typescript versions used.
3. CSS - I did want to have more control over the css so i used CSS Modules with a combination of default css vars.
4. Linters - eslint for code lint, stylelint for css lint

## Folder Structure
Folder structure is self explanatory, and supports small app scalability.

## Search Page
* Added debounce logic on the input
* The search string is marked on the letters

## Category Page
* If there are more than 10 entries, there will be a load more button
* The item will be added to the end of the table

## Optimizations If I had more time
1. The API is slow, i would suggest caching in the backend using redis or something.
2. I did the search with promise.all but i think a better solution will be to display each category once the data is ready.
3. Skeleton Loader.
4. Better accessibility
5. Enhanced UX, also a minor issue with the icons with typescript 5, had to load separately.

## Running
You can use the app in github pages, to run locally:
1. npm install
2. npm run start