export type Book = {
    id: number;
    title: string;
    description: string;
    image?: string;
    isbn: string;
    quantity: number;
    category?: Category;
    author?: Author;
    created_at: string;
    updated_at: string;
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