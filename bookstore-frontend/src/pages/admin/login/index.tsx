"use client";

import useAuthStore from "@/store/AuthStore";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import withoutAuth from "@/hoc/withoutAuth";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);

    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            await login(email, password);
            // toast
            router.push("/admin/books");
        } catch(error){
            setError("Invalid email or password. Please try again.");
        } finally{
            setLoading(false);
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-stone-500">
            <form onSubmit={handleLogin}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="my-2">
                    <Label>
                        Email
                    </Label>
                    <Input id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className="my-2">
                    <Label>
                        Password
                    </Label>
                    <div className="relative">
                    <Input id="password" value={password} onChange={(e)=> setPassword(e.target.value)}
                    type={showPassword ? "text": "password"} required/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/4 transform-translate-y-1/2"
                    >
                        {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                    </button>

                    </div>
                    
                </div>
                <div className="mt-10 mb-2">
                    <Button type="submit" className="w-full">Login {loading && (
                        <img src="/home/spinner-white.gif" className="h-4 w-4 inline ml-2" />
                    )}</Button>
                </div>

            </form>

        </div>
    )
}

export default withoutAuth(Login);