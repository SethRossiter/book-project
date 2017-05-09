function BookService(){
        
        var url = "http://localhost:3400/books"

    this.createBook = function createBook(book){
        $.post(url, book).then(function(res){
            console.log(res)
        })
    }
}