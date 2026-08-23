export class Book {
    public title: string;
    public author: string;
    public year: number;

    public constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    public displayInfo(): void {
        console.log("Title: " + this.title);
        console.log("Author: " + this.author);
        console.log("Year: " + this.year);
    }
}

const book: Book = new Book("1984", "George Orwell", 1949);
book.displayInfo();