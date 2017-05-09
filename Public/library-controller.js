function BookController() {

    var bookService = new bookService

    this.createBook = function getBook(e) {
        e.preventDefault()
        var book = {
         title: event.target.title.value,
         published: event.target.published.value,
         rating: event.target.rating.value,
         author: event.target.author.value
        }
        bookService.createBook(book)
    }


}