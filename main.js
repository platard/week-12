// Dom elements

const $books =  document.getElementById('books')
const $store = document.getElementById('store')



// function create the elements
function buildBooks(books){
    const html =[]

    for(const book of books){
        html.push(`
        <a href="#" class="col-4 mb-3 book">
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

    console.log(data)
    const html = buildBooks(data)
    $books.innerHTML = html.join('')
}

getBooks()