// DOM elements
const $books = document.getElementById('books')
const $seussology = document.getElementById('seussology')
const $wishList = document.getElementById('wishList')

// let books = []
let save = []



// Function to display all the books

function buildBooks(books){

    const html = []

    for( const book of books){
        html.push(`
        <a href="#" class="book col-4 mb-3" data-id="${book.id}">
            <img src="${book.image}" alt="${book.title}" class="img-fluid">
        </a>
        `)
    }

    return html
}

// Fetch
// fetch('https://seussology.info/api/books')
//   .then(response => response.json())
//   .then(json => console.log(json))

async function getBooks(){
    const response = await fetch('https://seussology.info/api/books')
    const data = await response.json()

    console.log(data)
    const html = buildBooks(data)

    $books.innerHTML = html.join('')
}

getBooks()
buildWishList()


// Display details

async function getBook(id){
    const response = await fetch('https://seussology.info/api/books/' + id)
    const obj = await response.json()

    $books.innerHTML = `
    <a href="" class="col-6 mb-3">
        <img src="${obj.image}" alt="" class="img-fluid">
    </a>
    <div class="col-6">
        <h1>${obj.title}</h1>
        <p>${obj.description}</p>
        <button class="back btn btn-secondary">Back</button>
        <button class="save btn btn-primary"
            data-id="${obj.id}"
            data-title="${obj.title}"
            data-description="${obj.description}"
            data-image="${obj.image}"
        >+</button>
        <button class="remove btn btn-danger">-</button>
        
    </div>
    `

}


$seussology.addEventListener('click', function(e){
    e.preventDefault()

    if(e.target.closest('.book')){
        getBook(e.target.closest('.book').dataset.id)
    }else if(e.target.classList.contains('back')){
        getBooks()
    }else if(e.target.classList.contains('save')){
        if(!save.find(book => book.id === e.target.dataset.id)){
            save.push({
                id: e.target.dataset.id,
                title: e.target.dataset.title,
                description: e.target.dataset.description,
                image: e.target.dataset.image
            })
            
            localStorage.setItem('save', JSON.stringify(save))
            buildWishList()
        }
    }else if(e.target.classList.contains('save')){
        
    }


})


function buildWishList(){
    const ls = JSON.parse(localStorage.getItem('save'))

    if(ls){
        save = ls
    }
    const html = buildBooks(save)
    $wishList.innerHTML = html.join('')
}

