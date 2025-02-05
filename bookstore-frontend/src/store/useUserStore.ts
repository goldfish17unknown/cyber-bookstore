import { User } from '@/types/common'
import { create } from 'zustand'

interface UserStore{
    users: User[],
    totalPages: number,
    loading: boolean,
    loadingFetch: boolean,
    loadingCreate: boolean,
    loadingDelete: boolean,

    setUsers: (users: User[]) => void,
    createUser: (name: string, email: string) => void,
    fetchAllUsers: (search: string, currentPage: number) => void,
    deleteUser: (id: number) => void,

}

export const useUserStore = create<UserStore>((set) => ({
    users: [],

    totalPages: 1,
    loading: false,
    loadingFetch: false,
    loadingCreate: false,
    loadingDelete: false,

    setUsers: (users: User[]) => set({ users }),
    setTotalPage: (totalPages: number) => set({ totalPages }),
    
    createUser: async (name: string, email: string) => {
        set({ loadingCreate: true })
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
            console.log(error instanceof Error ? error.message : "Unknown error")
        } finally {
            set({ loadingCreate: false })
        }
    },

    fetchAllUsers: async (search: string, currentPage: number) => {
        set({ loadingFetch: true })
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?search=${search}&page=${currentPage}`);
            if (!response.ok){
                throw new Error("Failed to fetch datas.")
            }
            const data = await response.json();
            const usersData = data.data;
            console.log()
            set({ users: usersData , totalPages: data.last_page });
        } catch (error){
            console.log(error instanceof Error ? error.message : "Unknown error")
        } finally {
            set({ loadingFetch: false })
        }
    },

    deleteUser: async (id: number) => {
        set({ loadingDelete: true })
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error('Failed to delete user.');
            }
        } catch(error){
            console.log(error instanceof Error ? error.message : "Unknown error")
        } finally {
            set({ loadingDelete: false })
        }
    }



}))






function fetchAllUsers(arg0: string, arg1: number) {
    throw new Error('Function not implemented.')
}
// const handleCreate = async(e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try{
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: userName,
//                 email: email
//             })
//         })
//         if(!response.ok){
//             throw new Error("Failed to create user");
//         }
//         const data = await response.json();
//         setCreateDialogOpen(false)
//         setUserName("")
//         setEmail("")
//         fetchUserData(search)

//     } catch (error){
//         console.log(error instanceof Error ? error.message : "Unknown error")
//     }

// }

// const handleEdit = async (e: React.FormEvent<HTMLFormElement>, id: number, newName: string, newEmail: string) => {
//     e.preventDefault();

//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: newName,
//                 email: newEmail
//             })
//         })
//         if(!response.ok){
//             throw new Error("Failed to edit user.");
//         }
//         fetchUserData(search)
//     } catch (error){
//         console.log(error instanceof Error ? error.message : "Unknown error")
//     }
// }

// const handleDelete = async (id: number) => {
//     try{
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
//             method: 'DELETE'
//         })
//         if(!response.ok){
//             throw new Error('Failed to delete user.');
//         }
//         fetchUserData(search)
//     } catch (error){
//         console.log(error instanceof Error ? error.message : "Unknown error")
//     }
// }

