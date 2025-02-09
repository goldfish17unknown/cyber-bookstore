import ImageInput from "@/components/custom/admin/ImageInput";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { Author, Category } from "@/types/common";
import router from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import Select from "react-select";

interface FormData {
    title: string;
    description: string;
    isbn: string;
    author_id: number | null;
    category_id: number | null;
    image?: File | null;
}

const AdminBooksCreate: NextPageWithLayout = () => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        isbn: "",
        image: null,
        author_id: null,
        category_id: null,
    });
    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchCategories();
        fetchAuthors();
    }, []);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSelectChange = (selectedOption: any, field: "author_id" | "category_id") => {
        setFormData((prev) => ({
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
        }));
    };

    const handleCreateBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("author_id", formData.author_id?.toString() || "");
        formDataToSend.append("category_id", formData.category_id?.toString() || "");
        formDataToSend.append("isbn", formData.isbn);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
                method: 'POST',
                body: formDataToSend,
            });
            if(!response.ok){
                const data = await response.json();

                throw new Error("Failed to create data")
                

            }
            const data = await response.json();

            if(data){
                router.push({
                    pathname: '/admin/books',
                    query: { successCreate: "Book created successfully!" }
                })
            }
        } catch (error){
            console.log('Error creating book:', error);
            
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                image: e.target.files ? e.target.files[0] : null,
            }));
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`);
            const data = await response.json();
            setAuthors(data);
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    if (!isMounted) {
        return null; // or a loading spinner
    }

    return (
        <div className="w-full mt-10">
            <div className="flex my-10">
                <h1 className="text-3xl font-bold mx-auto mb-10">Create a book data</h1>
            </div>

            <div className="flex justify-center">
                <form onSubmit={handleCreateBook} className="w-1/2">
                    <div className="flex flex-col mb-4">
                        <div className="flex">
                            <label htmlFor="image" className="text-lg">Book Cover:</label>
                        </div>
                        <ImageInput handleImageChange={handleImageChange} />
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex">
                            <label htmlFor="title" className="text-lg">Book Title:</label>
                        </div>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="border border-gray-300 rounded-md p-2"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex">
                            <label htmlFor="isbn" className="text-lg">isbn:</label>
                        </div>
                        <input
                            type="text"
                            id="isbn"
                            name="isbn"
                            className="border border-gray-300 rounded-md p-2"
                            value={formData.isbn}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex">
                            <label htmlFor="author_id" className="text-lg">Author</label>
                        </div>
                        <Select
                            options={authors.map((author) => ({
                                value: author.id,
                                label: author.name,
                            }))}
                            placeholder="Select the author of this book"
                            onChange={(selected: any) => handleSelectChange(selected, "author_id")}
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex">
                            <label htmlFor="category_id" className="text-lg">Category</label>
                        </div>
                        <Select
                            options={categories.map((category) => ({
                                value: category.id,
                                label: category.name,
                            }))}
                            placeholder="Select a category"
                            onChange={(selected: any) => handleSelectChange(selected, "category_id")}
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex">
                            <label htmlFor="description" className="text-lg">Description:</label>
                        </div>
                        <textarea
                            name="description"
                            id="description"
                            className="border border-gray-300 rounded-md p-2"
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-primary text-primary-foreground p-2 rounded-md w-full">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AdminBooksCreate.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AdminBooksCreate;