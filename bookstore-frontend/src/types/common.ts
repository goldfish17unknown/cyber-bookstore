export type Book = {
    id: number;
    title: string;
    description: string;
    image?: string;
    isbn: string;
    category?: Category;
    author?: Author;
    created_at: string;
    updated_at: string;
    borrowStatus: string;
}

export type Category = {
    id: number;
    name: string;
}

export type Author = {
    id: number;
    name: string;
    bio: string;
    image?: string;
    created_at: string;
    updated_at: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export type BorrowedBook = {
    id: number;
    user: User;
    book: Book;
    borrowed_at: string;
    due_at: string;
    status: enum
}