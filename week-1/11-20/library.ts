import { Book } from "../1-10/book";
import { User } from "../1-10/user";

export class Library {
    private books: Book[] = [];
    private users: User[] = [];

    public addBook(book: Book): void {
        this.books.push(book);
    }

    public addUser(user: User): void {
        this.users.push(user);
    }

    public displayBooks(): void {
        for (const book of this.books) {
            book.displayInfo();
        }
    }

    public displayUsers(): void {
        for (const user of this.users) {
            console.log("User: " + user.getName());
        }
    }
}

const library: Library = new Library();

const book1: Book = new Book("1984", "George Orwell", 1949);
const book2: Book = new Book("The Hobbit", "J.R.R. Tolkien", 1937);

const user1: User = new User("John");

library.addBook(book1);
library.addBook(book2);
library.addUser(user1);

library.displayBooks();
library.displayUsers();