import { User } from '@/types/common';
import { create } from 'zustand';


interface UserState {
    users: User[];
    currentUser: User | null;
    currentPage: number;
    lastPage: number;
    fetchUsers: (search?: string) => Promise<void>;
    getUser: (id: number) => Promise<void>;
    createUser: (name: string, email: string) => Promise<void>;
    updateUser: (id: number, name: string, email: string) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    loadUsers: (search?: string) => Promise<void>;

}

const useUserStore = create<UserState>((set, get) => ({
    users: [],
    currentUser: null,
    currentPage: 1,
    lastPage: 1,
    fetchUsers: async(search="") => {
        try{
            const currentPage = get().currentPage;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?search=${search}&page=${currentPage}`);
            const data = await response.json();
            set({
                users: data.data,
                currentPage: data.current_page,
                lastPage: data.last_page
            })
        } catch(error){
            throw error;
        }
    },
    getUser: async (id) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`)
            if(!response.ok){
                throw new Error("Failed to fetch user data.");
            }
            const data = await response.json();
            set({
                currentUser: data
            })
        } catch (error){
            throw error;
        }
    },
    createUser: async (name, email) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            })
            if(!response.ok){
                throw new Error("Failed to create user");
            }
        } catch (error){
            throw error;
        }
    },
    updateUser: async(id, name, email) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ({
                    name: name,
                    email: email
                })
            })
            if (!response.ok){
                throw new Error("Failed to edit user.")
            }
        } catch (error){
            throw error
        }
    },
    deleteUser: async(id) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error('Failed to delete data.');
            }
        } catch (error){
            throw error;
        }
    },
    loadUsers: async(search="") => {

    },
}))

export default useUserStore