import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js" 
const matches = [...books] //cloning books object
const [{ id, genres: genre, popularity, title, image, description, pages, published, author}] = matches //destructuring
const page = 1;

if (!books && !Array.isArray(books)) throw new Error('Source required') 
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')  //what is range referring to?

const css = {
    day : {
    dark: '10, 10, 20',
    light: '255, 255, 255',
},

    night : {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}
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
const createPreviewsFragment = (matches, startIndex, endIndex) => {
  const fragment = document.createDocumentFragment();
   
  for (let i = startIndex; i < endIndex && i < matches.length; i++) {
    const match = matches[i];
    const preview = document.createElement('div')
    preview.classList = 'preview';
    preview.innerHTML = /* html */ `
    <img
        class="preview__image"
        src="${match.image}"
    />
    
    <div class="preview__info">
        <h3 class="preview__title">${match.title}</h3>
        <div class="preview__author">${authors[match.author]}</div>
    </div>
`

    fragment.appendChild(preview) 

  }
 
   return fragment
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
    element.textText = "All Genres"
    element.value = id
    element.innerHTML = name
    
    genresFragment.appendChild(element)
}

dataSearchGenres.appendChild(genresFragment)

const authorsFragment = document.createDocumentFragment()

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsFragment.appendChild(element)
}




dataSearchAuthors.appendChild(authorsFragment);

const dataSettingsTheme = document.querySelector('[data-settings-theme]');
// assigns either "night" or "day" depending on user's preference
const themePreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
dataSettingsTheme.value = themePreference;

// sets the page's root element based on the value of themePreference variable
document.documentElement.style.setProperty('--color-dark', css[themePreference].dark);
document.documentElement.style.setProperty('--color-light', css[themePreference].light);

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

dataSearchCancel.addEventListener("click", () => { dataSearchOverlay.open = false });
dataSettingsCancel.addEventListener("click", () => { dataSettingsOverlay.open = false });
dataSettingsForm.addEventListener("submit", (e) => { e.preventDefault; const formData = new FormData(e.target)}) ;// change the inside to something that will submit the form 
dataListClose.addEventListener("click", ()=>  { dataListActive.open = false });
const updateRemaining = () => {
    
    const initial = matches.length - [page * BOOKS_PER_PAGE]
    const hasRemaining = matches.length > [(page + 1) * BOOKS_PER_PAGE]
    const remaining = hasRemaining ? initial : 0
    // dataListButton.disabled = initial > 0 ? true : false
    // const initial = matches.length - startIndex;
    // console.log(endIndex)
    // const hasRemaining = matches.length > endIndex;
    // const remaining = hasRemaining ? initial : 0
    // dataListButton.disabled = remaining > 0 ? true : false
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.open = false;

    dataListButton.innerHTML = /* html */ `
                         <span>Show more</span>
                         <span class="list__remaining"> (${remaining})</span>`

   
}
dataListButton.addEventListener("click", () => {
    dataListItems.appendChild(createPreviewsFragment(matches, (page * BOOKS_PER_PAGE), ((page + 1) * BOOKS_PER_PAGE)))
    // dataListButton(updateRemaining())
    page = page + 1 
})

const dataHeaderSearch = document.querySelector('[data-header-search]');
const dataHeaderSettings = document.querySelector('[data-header-settings]');
const dataSearchTitle = document.querySelector('[data-search-title]');
const dataSearchForm = document.querySelector('[data-search-form]')
const dataListMessage = document.querySelector('[data-list-message]')


dataHeaderSettings.addEventListener('click', ()=> {
    dataSettingsOverlay.open = true;
    // dataSettingsTitle.focus();
});

dataHeaderSearch.addEventListener('click', ()=> {
    dataSearchOverlay.open = true;
    dataSearchTitle.focus();
});

dataSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const filters = Object.fromEntries(formData)
    let result = []

    for (const book of matches) {
        const titleMatch = filters.title.trim() === '' && book.title.toLowerCase().includes(filters.title.toLowerCase())

        let authorMatch = filters.author === 'any' || book.author === filters.author
        for (const author of book.author) { 

            if (author === filters.author) { 
                authorMatch = true;
                break; 
            }
        }

            let genreMatch = filters.genre === 'any' || book.genres === filters.genres
            for (const genre of book.genres) { 

                if (genre === filters.genre) { 
                    genreMatch = true;
                    break; 
                }
            }
        

        if (titleMatch && authorMatch && genreMatch ) { 
            result.push(book)
        }
    }

    if (result.length < 1) {
        dataListMessage.classList.add('list__message_show')
    }
    else {
        dataListMessage.classList.remove('list__message_show')
    }

    dataListItems.innerHTML = ''
    const fragment = document.createDocumentFragment()
    const extracted = result.slice(0, BOOKS_PER_PAGE)

    for (const book of extracted) {
        const { author: authorId, id, image, title } = book

        const element = document.createElement('button')
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
    
    dataListItems.appendChild(fragment)

    
})


        // const initial = matches.length - (page * BOOKS_PER_PAGE)
        // const remaining = hasRemaining ? initial : 0
        // dataListButton.disabled = initial > 0 ? true : false

        // dataListButton.innerHTML = /* html */ `
        //                          <span>Show more</span>
        //                          <span class="list__remaining"> (${remaining})</span>
        //                         `

        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //     dataSearchOverlay.open = false
    

  
dataSettingsOverlay.addEventListener('submit', (e) => {   
      e.preventDefault();
      const formData = new FormData(e.target);
      const result = Object.fromEntries(formData);
      document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
      document.documentElement.style.setProperty('--color-light', css[result.theme].light);
      dataSettingsOverlay.open = false;
 });
        

const dataListBlur = document.querySelector('[data-list-blur]');
let dataListTitle = document.querySelector('[data-list-title]');
const dataListSubtitle = document.querySelector('[data-list-subtitle]');
const dataListDescription = document.querySelector('[data-list-description]');
let dataListImage = document.querySelector('[data-list-image]');

dataListItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null;

    for (const node of pathArray) {
       
        const previewId = node?.dataset?.preview;

        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook;
                break;
            } 
        }
         
        if (active) {
        
            dataListActive.open = true,
            dataListBlur.dataListImage = active.image;
            dataListTitle.innerHTML = active.title,
            dataListSubtitle.innerHTML = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
            dataListDescription.innerHTML = `${active.description}`
            break;
        } 
        
        // if (active) {
        //     return;
        // }
    }
    
});
