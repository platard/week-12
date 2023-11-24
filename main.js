// Dom elements

const $books =  document.getElementById('books')
const $store = document.getElementById('store')


let books = null


// function create the elements
function buildBooks(books){
    const html =[]

    for(const book of books){
        html.push(`
        <a href="#" class="col-4 mb-3 book" data-id="${book.id}">
            <img src="${book.image}" alt="${book.title}" class="img-fluid">
        </a>`)
    }
    return html
}


// fetch
// fetch('https://seussology.info/api/books')
//     .then(response => response.json())
//     .then(json => console.log(json))


async function getBooks(){
    const response = await fetch('https://seussology.info/api/books')
    const data = await response.json()
    // books = data
    console.log(data)
    const html = buildBooks(data)
    $books.innerHTML = html.join('')
}

getBooks()

//Fetch a single book

async function getBook(id){
    const response = await fetch('https://seussology.info/api/books/' + id)
    const book = await response.json() 

    $books.innerHTML = `
    <div class="row">
        <a href="#" class="col-6 mb-3 book">
            <img src="${book.image}" alt="" class="img-fluid">
        </a>
        <div class="col-6">
            <h1>${book.title}</h1>
            <p>${book.description}</p>
            <button class="back btn btn-secondary">Back</button>
            <button class="save btn btn-secondary">+</button>
            <button class="remove btn btn-secondary">-</button>

        </div>
    </div>
    `

}


$store.addEventListener('click', function(e){
    e.preventDefault()
    console.log(e.target)
    // console.log(e.target.closest('.book'))
    // console.log(e.target.closest('.book').dataset.id)

    if(e.target.closest('.book')){
        getBook(e.target.closest('.book').dataset.id)
    }else if(e.target.classList.contains('back')){
        getBooks()
    }
})
