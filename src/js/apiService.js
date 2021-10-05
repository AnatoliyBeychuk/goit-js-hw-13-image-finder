/**
 * Файл apiService.js с дефолтным экспортом объекта 
 * отвечающего за логику HTTP-запросов к API
 */

const API_KEY = '18530950-a935dc045ea4774fb23c446e2';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';

export const pictureLoader =
{
    page: 1,
    perPage: 12,
    query: '',

    async loadPictures()
    {
        const response = await fetch(`${BASE_URL}q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`);
        const data = await response.json();
        return data;
    },
    nextPage()
    {
        this.page += 1;
    },
    clearPage()
    {
        this.page = 1;
    },
    setQuery(searchQuery)
    {
        this.query = searchQuery;
    }
}