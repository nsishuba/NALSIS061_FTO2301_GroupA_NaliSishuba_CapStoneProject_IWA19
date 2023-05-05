import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js" 
const matches = [...books] //cloning books object
const [{ id, genres: genre, popularity, title, image, description, pages, published, author}] = matches //destructuring
const page = 1;

if (!books && !Array.isArray(books)) throw new Error('Source required') 
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')  //what is range referring to?

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const dataListItems = document.querySelector('[data-list-items]')
const dataSearchGenres = document.querySelector('[data-search-genres]')
const dataSearchAuthors = document.querySelector('[data-search-authors]')

const fragment = document.createDocumentFragment()
const extracted = matches.slice(0, 36) // variable 'extracted' extracts the first 36 array elements from matches object

const createPreview = (author, id, image, title) => {
   
    const preview = document.createElement('button')
    preview.classList = 'preview'
    preview.setAttribute('data-preview', id)
 
    preview.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
    
    return preview
}

for (let i = 0; i < extracted.length; i++) {
    const preview = createPreview(
        extracted[i].author,
        extracted[i].id,
        extracted[i].image,
        extracted[i].title
)

    fragment.appendChild(preview)
}

dataListItems.appendChild(fragment)

const genresFragment = document.createDocumentFragment()

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerHTML = name
    genresFragment.appendChild(element)
}

dataSearchGenres.appendChild(genresFragment)

const authorsFragment = document.createDocumentFragment()

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = 'any'
    element.innerText = 'All Authors'
    authorsFragment.appendChild(element)
}

dataSearchAuthors.appendChild(authorsFragment);

const dataSettingsTheme = document.querySelector('[data-settings-theme]')
//assigns either "night" or "day" depending on users preference
dataSettingsTheme.value === window.matchMedia('(prefers-color-scheme: dark)') && window.matchMedia('(prefers-color-scheme: dark)').matches ? night : day; //change this to light?
const v = window.matchMedia('(prefers-color-scheme: dark)') && window.matchMedia('(prefers-color-scheme: dark)').matches? night : day;
//sets the pages root element based on the value of v variable
document.documentElement.style.setProperty('--color-dark', v.dark);
document.documentElement.style.setProperty('--color-light', v.light);

const dataListButton = document.querySelector('[data-list-button]');
const dataSearchCancel = document.querySelector('[data-search-cancel]');
const dataSettingsCancel = document.querySelector('[data-settings-cancel]');
const dataSettingsForm = document.querySelector('[data-settings-form]');
const dataListClose = document.querySelector('[data-list-close]');
const dataListActive = document.querySelector('[data-list-active]');

dataListButton.innerHTML = "Show more (" + (matches.length - BOOKS_PER_PAGE) + ")" ; //shows how books left to show
dataListButton.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0); //if no more books to show disable button
dataListButton.innerHTML = /* html */ 
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`;


const dataSearchOverlay = document.querySelector('[data-search-overlay]');
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]');

dataSearchCancel.addEventListener("click", () => { dataSearchOverlay.open === false });
dataSettingsCancel.addEventListener("click", () => { dataSettingsOverlay.open === false });
dataSettingsForm.addEventListener("submit", (e) => { e.preventDefault; const formData = new FormData(e)}) ;// change the inside to something that will submit the form 
dataListClose.addEventListener("click", ()=>  { dataListActive.open === false });

dataListButton.addEventListener("click", () => {
    dataListItems.appendChild(createPreviewsFragment(matches, (page * BOOKS_PER_PAGE), ((page + 1) * BOOKS_PER_PAGE)))
    data.updateRemaining()
    page = page + 1 
})

const dataHeaderSearch = document.querySelector('[data-header-search]');
const dataSearchTitle = document.querySelector('[data-search-title]');
const dataSearchForm = document.querySelector('[data-search-form]')

dataHeaderSearch.addEventListener('click', ()=> {
    dataSettingsOverlay.open === true ;
    dataSearchTitle.focus();
});

dataSearchForm.addEventListener('click', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    let result = []

    for (matches; booksList[i]; i++) {
        titleMatch = filters.title.trim() = '' && matches.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || matches.author === filters.author

        
            genreMatch = filters.genre = 'any'
            for (genre; matches.genres; i++) { 
                if (singleGenre === filters.genre) 
                { genreMatch === true }
            }
        

        if (titleMatch === true && authorMatch === true && genreMatch === true){ result.push(book)}
    }

    if (display.length < 1) 
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')
    

    dataListItems.innerHTML = ''
    const fragment = document.createDocumentFragment()
    const extracted = source.slice(range[0], range[1])

    for ({ author, image, title, id }; extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }
    
    dataListItems.appendChild(fragments)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    dataListButton.disabled = initial > 0

    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open === false
})

data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay.open === false
}

dataListItems.addEventListener('click', () => {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if (active) break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if (!active) return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === `${authors[active.author]} (${Date(active.published).year})`
    data-list-description === active.description
})
