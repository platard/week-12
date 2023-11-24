// Dom elements

const $books =  document.getElementById('books')
const $store = document.getElementById('store')



// function create the elements
function buildBooks(books){
    const html =[]

    for(const book of books){
        html.push(`
        <a href="#" class="col-4 mb-3 book">
            <img src="" alt="" class="img-fluid">
        </a>`)
    }
    return html
}