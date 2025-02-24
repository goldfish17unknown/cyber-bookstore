import { Category } from '@/types/common';
import { create } from 'zustand';
import useAuthStore from './AuthStore';
import { toast } from "react-hot-toast";

interface CategoryState {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    createCategory: (name: string) => Promise<boolean>;
    updateCategory: (id: number, name: string) => Promise<boolean>;
    deleteCategory: (id: number) => Promise<boolean>;
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
            const token = useAuthStore.getState().accessToken;
            if (!token) {
                toast.error("Unauthorized");
                return false
            }        
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: name })
            })
            const responseData = await response.json();
            if(!response.ok){
                if (responseData.errors?.name) { 
                    toast.error("Validation Error: " + responseData.errors.name[0]);
                     
                } else {
                    toast.error("Failed to create category: " + responseData.message);
                }
                toast
                return false;
            }
            return true
        } catch (error){
            console.error("Error creating category:", error)
            return false
        }
    },
    updateCategory: async(id, name) => {
        try {
            const token = useAuthStore.getState().accessToken;
            if (!token) {
                toast.error("Unauthorized");
                return false
            }    
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: name })
            })
            const responseData = await response.json();
            if(!response.ok){
                if (responseData.errors?.name) { 
                    toast.error("Validation Error: " + responseData.errors.name[0]);
                     
                } else {
                    toast.error("Failed to create category: " + responseData.message);
                }
                toast
                return false;
            }
            return true;
        } catch (error){
            throw error;
        }

    },
    deleteCategory: async (id) => {
        try{
            const token = useAuthStore.getState().accessToken;
            if (!token) {
                toast.error("Unauthorized");
                return false
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(!response.ok){
                throw new Error("Error in fetch data")
            }
            return true
        } catch (error){
            throw error;
        }
    }
}))

export default useCategoryStore;