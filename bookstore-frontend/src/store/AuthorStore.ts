import { Author } from '@/types/common';
import { create } from 'zustand';
import useAuthStore from './AuthStore';

interface AuthorState {
    authors: Author[];
    currentAuthor: Author | null;
    currentPage: number;
    lastPage: number;
    fetchAuthors: (search?: string) => Promise<void>;
    fetchSingleAuthor: (id: number) => Promise<void>;
    addAuthor: (name: string, bio: string, image?: File | null) => Promise<void>;
    updateAuthor: (id: number, name: string, bio: string, image?: File | null) => Promise<void>;
    deleteAuthor: (id: number) => Promise<void>;
}

const useAuthorStore = create<AuthorState>((set) => ({
    authors: [],
    currentAuthor: null,
    currentPage: 1,
    lastPage: 1,
    fetchAuthors: async (search="") => {
        try {
            const token = useAuthStore.getState().accessToken;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors?search=${search}&`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok) throw new Error("failed to fetch books");

            const data = await response.json();
            set({ 
                authors: data.data,
                currentPage: data.current_page,
                lastPage: data.last_page
            })
        } catch(error){
            throw error;
        }
    },
    fetchSingleAuthor: async(id) => {
        try {
            const token = useAuthStore.getState().accessToken;
            if(!token) throw new Error("Unauthorized");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error("Failed to fetch author");
            const data = await response.json();
            set({ currentAuthor: data });
        } catch (error){
            throw error;
        }

    },
    addAuthor: async (name, bio, image) => {
        try{
            const token = useAuthStore.getState().accessToken;
            if(!token) throw new Error("Unauthorized");
            const formData = new FormData();
            formData.append("name", name);
            formData.append("bio", bio);
            if(image){
                formData.append("image", image);
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if(!response.ok){
                throw new Error("Failed to create data")
            }
        } catch (error){
            throw error;
        }
    },
    updateAuthor: async(id, name, bio, image) => {
        try{
            const token = useAuthStore.getState().accessToken;
            if(!token) throw new Error("Unauthorized");
            const form = new FormData();
            form.append("name", name);
            form.append("bio", bio);
            if(image){
                form.append("image", image);
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/authors/${id}`,{
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: form, 
            })
            if (!response.ok) throw new Error("Failed to update author");
        } catch (error){
            throw error;

        }

    },
    deleteAuthor: async(id) => {
        try{
            const token = useAuthStore.getState().accessToken;
            if(!token) throw new Error("Unauthorized");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/authors/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if(!response.ok) throw new Error("Failed to delete book");
        } catch(error){
            throw error;
        }
    }
}));

export default useAuthorStore;