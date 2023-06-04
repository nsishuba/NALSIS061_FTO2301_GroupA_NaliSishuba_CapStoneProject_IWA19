import { BOOKS_PER_PAGE, 
    authors, 
    genres, 
    books } 
    from "./data.js" ;
const matches = [...books];//cloning books object
let page = 1;
const extracted = matches.slice(0, 36) ;

if (!books && !Array.isArray(books)) throw new Error('Source required') ;
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
};

const dataSettingsOverlay = document.querySelector('[data-settings-overlay]');
const dataSettingsForm = document.querySelector('[data-settings-form]');
const dataSettingsTheme = document.querySelector('[data-settings-theme]');
const dataSettingsCancel = document.querySelector('[data-settings-cancel]');

dataSettingsCancel.addEventListener("click", () => { dataSettingsOverlay.open = false });

//Changes the colour scheme of the page when the user selects a theme.
dataSettingsForm.addEventListener('submit', (e) => {   
      e.preventDefault(); // Allows the form to be submitted without a page refresh.
      const formData = new FormData(e.target);
      const result = Object.fromEntries(formData);
      document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
      document.documentElement.style.setProperty('--color-light', css[result.theme].light);
      dataSettingsOverlay.open = false;
 });

/* Sets the initial colour scheme of the page based on users device preference. 
   Checks if the css media query matches the current state of the window.*/ 
const themePreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
dataSettingsTheme.value = themePreference;
document.documentElement.style.setProperty('--color-dark', css[themePreference].dark);
document.documentElement.style.setProperty('--color-light', css[themePreference].light);

const dataListItems = document.querySelector('[data-list-items]')
const dataSearchOverlay = document.querySelector('[data-search-overlay]');
const dataSearchForm = document.querySelector('[data-search-form]')
const dataSearchTitle = document.querySelector('[data-search-title]');
const dataSearchGenres = document.querySelector('[data-search-genres]');
const dataSearchAuthors = document.querySelector('[data-search-authors]');
const dataSearchCancel = document.querySelector('[data-search-cancel]');
const dataHeaderSearch = document.querySelector('[data-header-search]');
const dataHeaderSettings = document.querySelector('[data-header-settings]');

const genresFragment = document.createDocumentFragment();

const genreElement = document.createElement('option')
genreElement.value = 'any'
genreElement.innerText = 'All Genres'
genresFragment.appendChild(genreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerHTML = name;
    
    genresFragment.appendChild(element);
}

dataSearchGenres.appendChild(genresFragment); //appending to select HTML tag

const authorsFragment = document.createDocumentFragment();

const authorElement = document.createElement('option')
authorElement.value = 'any'
authorElement.innerText = 'All Authors'
authorsFragment.appendChild(authorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsFragment.appendChild(element);
}

dataSearchAuthors.appendChild(authorsFragment);

dataSearchCancel.addEventListener("click", () => { dataSearchOverlay.open = false });
dataHeaderSettings.addEventListener('click', ()=> {
    dataSettingsOverlay.open = true;
});
dataHeaderSearch.addEventListener('click', ()=> {
    dataSearchOverlay.open = true;
    dataSearchTitle.focus();
});
dataSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()//prevents the page from reloading when form is submited
    const formData = new FormData(e.target)
    const filters = Object.fromEntries(formData)//creates object with key-value pairs from the form data
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
            result.push(book);
        }
    }

    if (result.length < 1) {
        dataListMessage.classList.add('list__message_show');
    }
    else {
        dataListMessage.classList.remove('list__message_show');
    }

    dataListItems.innerHTML = ''; 
    const fragment = document.createDocumentFragment();
    const extracted = result.slice(0, BOOKS_PER_PAGE); // variable 'extracted' extracts the first 36 array elements from matches object

    for (const book of extracted) {
        const { author: authorId, id, image, title } = book;

        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

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

        fragment.appendChild(element);
    }

    dataListItems.appendChild(fragment);
    const initial = matches.length - [page * BOOKS_PER_PAGE]
    const hasRemaining = 0; //? 
    const remaining = hasRemaining ? initial : 0
    dataListButton.disabled = initial > 0

    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.open = false;
    
});

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

const fragment = document.createDocumentFragment()

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

const dataListButton = document.querySelector('[data-list-button]');
const dataListClose = document.querySelector('[data-list-close]');
const dataListActive = document.querySelector('[data-list-active]');

dataListButton.innerHTML = /* html */ 
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? (matches.length - [page * BOOKS_PER_PAGE]) : 0})</span>`; 
dataListButton.disabled = (!(matches.length - [page * BOOKS_PER_PAGE] > 0)); //if no more books to show disable button
dataListClose.addEventListener("click", ()=>  { dataListActive.open = false });

dataListButton.addEventListener("click", () => {
    dataListItems.appendChild(createPreviewsFragment(matches, (page * BOOKS_PER_PAGE), ((page + 1) * BOOKS_PER_PAGE)))
    page = page + 1;
    dataListButton.innerHTML = /* html */ 
    `<span>Show more</span>
    <span class="list__remaining">(${matches.length - (page + 1) * BOOKS_PER_PAGE > 0 ? matches.length - (page + 1) * BOOKS_PER_PAGE : 0})</span>`;
    
    dataListButton.disabled = !(matches.length > (page + 1) * BOOKS_PER_PAGE);

});

const dataListMessage = document.querySelector('[data-list-message]')
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

        for (const singleBook of matches) {
            if (singleBook.id === previewId) {
                active = singleBook;
                break;
            } 
        }
         
        if (active) {
        
            dataListActive.open = true,
            dataListImage.src = active.image;
            dataListTitle.innerHTML = active.title,
            dataListSubtitle.innerHTML = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
            dataListDescription.innerHTML = `${active.description}`
            break;
        } 
   
    }
    
});
