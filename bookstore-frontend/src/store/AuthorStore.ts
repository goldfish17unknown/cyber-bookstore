import { Author } from '@/types/common';
import { create } from 'zustand';
import useAuthStore from './AuthStore';
import toast from 'react-hot-toast';

interface AuthorState {
    authors: Author[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    nextPage: () => void;
    backPage: () => void;
    lastPage: number;
    hasMorePages: boolean;
    fetchAuthors: (search?: string) => Promise<void>;
    fetchSingleAuthor: (id: string) => Promise<Author>;
    addAuthor: (name: string, bio: string, image?: File | null) => Promise<boolean>;
    updateAuthor: (id: number, name: string, bio: string, image?: File | null) => Promise<void>;
    deleteAuthor: (id: number) => Promise<void>;
    PickAuthor: (search?: string) => Promise<void>;
    limitFetchAuthors: (itemsPerPage: number, search: string) => Promise<Author[]>
}

const useAuthorStore = create<AuthorState>((set, get) => ({
    authors: [], 
    currentPage: 1,
    setCurrentPage: (page: number) => set(state => ({ currentPage: page })),
    nextPage: () => {
        const { currentPage, lastPage } = get();
        if (currentPage < lastPage) {
          set({ currentPage: currentPage + 1 });
        }
      },
    backPage: () => {
        const {currentPage} = get();
        if( currentPage > 1){
            set({ currentPage: currentPage - 1});
        }
    },
    lastPage: 1,
    hasMorePages: false,
    fetchAuthors: async (search="") => {
        try {
            const token = useAuthStore.getState().accessToken;
            const currentPage = get().currentPage;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors?search=${search}&page=${currentPage}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok) throw new Error("failed to fetch Authors");

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`, {
                method: "GET"
            });
            if (!response.ok) throw new Error("Failed to fetch author");
            const data = await response.json();
            return data;
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
            const responseData = await response.json()
            if(!response.ok){
                if(responseData.errors?.name){
                    toast.error("Validation Error: " + responseData.errors.name[0]);
                    return false
                }
                if(responseData.errors?.bio){
                    toast.error("Validation Error: " + responseData.errors.bio[0]);
                    return false
                }     
                if(responseData.errors?.image){
                    toast.error("Validation Error: " + responseData.errors.image[0]);
                    return false
                }               
                else {
                    toast.error("Failed to create author: " + responseData.message);
                    return false
                }    
            }
            toast.success("Author created successfully");
            return true
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,{
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if(!response.ok) throw new Error("Failed to delete book");

            toast.success("Author deleted successfully.")
        } catch(error){
            throw error;
        }
    },
    PickAuthor: async(search="") => {

    },
    limitFetchAuthors: async(itemsPerPage=8, search="") => {
        try{
            const { currentPage } = get()
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/front/limit?&search=${search}&page=${currentPage}&itemsPerPage=${itemsPerPage}`);
            if (!response.ok){
                throw new Error("Error in fetching datas");
            }
            const data = await response.json();

            set({ 
                currentPage: data.current_page,
                lastPage: data.last_page,
                hasMorePages: data.has_more_pages
            })
            return data.data

        } catch(error){
            throw error;
        }
        

    }
}));

export default useAuthorStore;//?itemsPerPage=${itemsPerPage}&search=${search}&page=${page}