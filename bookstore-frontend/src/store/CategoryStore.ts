import { Category } from '@/types/common';
import { create } from 'zustand';

interface CategoryState {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    createCategory: (name: string) => Promise<void>;
    updateCategory: (id: number, name: string) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
    loadCategories: (search?:string) => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],
    fetchCategories: async () => {
        try{
            const response = await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            if(!response.ok){
                throw new Error("Failed to fetch Data");
            }
            const data = await response.json();
            set({categories: data})
        } catch(error){
            throw error;
        }
    },
    createCategory: async(name) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ name: name })
            })
            if(!response.ok){
                throw new Error("Failed to create data.")
            }
        } catch (error){
            throw error;
        }
    },
    updateCategory: async(id, name) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ name: name })
            })
            if(!response.ok){
                throw new Error("Failed to update data.");
            }
        } catch (error){
            throw error;
        }

    },
    deleteCategory: async (id) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
                method: "DELETE"
            })
            if(!response.ok){
                throw new Error("Error in fetch data")
            }
        } catch (error){
            throw error;
        }
    },
    loadCategories: async (search="") => {

    }
}))

export default useCategoryStore;