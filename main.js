// DOM elements
const $books = document.getElementById('books')
const $seussology = document.getElementById('seussology')

let books = []



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
    </div>
    `

}


$seussology.addEventListener('click', function(e){
    e.preventDefault()

    console.log(e.target.closest('.book'))
    getBook(e.target.closest('.book').dataset.id)


})