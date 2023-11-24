// Dom elements

const $books =  document.getElementById('books')
const $store = document.getElementById('store')
const $wishList = document.getElementById('wishList')


let saved= []



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
buildWishList()

//Fetch a single book

async function getBook(id){
    console.log(id)
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
            <button class="save btn btn-primary"
            data-id="${book.id}"
            data-title="${book.title}"
            data-description="${book.description}"
            data-image="${book.image}"
            >+</button>
            <button class="remove btn btn-danger" data-id=${book.id}>-</button>

        </div>
    </div>
    `

}


$store.addEventListener('click', function(e){
    e.preventDefault()
    // console.log(e.target)
    // console.log(e.target.closest('.book'))
    // console.log(e.target.closest('.book').dataset.id)

    if(e.target.closest('.book')){
        getBook(e.target.closest('.book').dataset.id)
    }else if(e.target.classList.contains('back')){
        getBooks()
    }else if(e.target.classList.contains('save')){
        saved.push({
            id: e.target.dataset.id,
            title: e.target.dataset.title,
            description: e.target.dataset.description,
            image: e.target.dataset.image
        })

        localStorage.setItem('saved', JSON.stringify(saved))

        buildWishList()
    }else if(e.target.classList.contains('remove')){
        const index = saved.findIndex(book => book.id === e.target.dataset.id)
        console.log(index)

        if(index >= 0){
            saved.splice(index, 1)
            localStorage.setItem('saved', JSON.stringify(saved))
            buildWishList()
        }
    }
})


function buildWishList(){

    const ls = localStorage.getItem('saved')
    console.log(ls)

    if(ls){
       saved = JSON.parse(ls)
    }

    $wishList.innerHTML = buildBooks(saved).join('')
}
