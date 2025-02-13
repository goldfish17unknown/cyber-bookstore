import { User } from '@/types/common';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: () => boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}


const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: () => !!localStorage.getItem('access_token'),
    login: async (email, password) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if(!response.ok){
                throw new Error('Invalid credentials');
            }
            const data = await response.json()
            set({ user: data.user, accessToken: data.access_token });

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },
    logout: async () => {
        try{
            const token = localStorage.getItem('access_token');
            if(token){
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/logout`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            }
            set({ user: null, accessToken: null});

            localStorage.removeItem('access_token');
            localStorage.removeItem('user');

        } catch(error){
            console.error('Logout failed: ', error);
        }

    }
}))

export default useAuthStore;