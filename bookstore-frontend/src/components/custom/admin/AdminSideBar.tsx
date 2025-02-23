"use client"
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import useAuthStore from "@/store/AuthStore";
import { BookType,  UserPen, User, HousePlus, ChartColumnStacked, LogOut } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/router";


const items = [
    {
        // to manage the books
        title: "Books",
        url: "/admin/books",
        icon: BookType
    },
    {
        // to manage borrows and returns of the books
        title: "Borrows and Returns",
        url: "/admin/borrows-returns",
        icon:  HousePlus
    },
    {
        // to manage the users
        title: "User Management",
        url: "/admin/users-management",
        icon: User
    },
    {
        // to manage the authors
        title: "Authors",
        url: "/admin/authors",
        icon: UserPen,
    },
    {
        // to manage the categories
        title: "Categories",
        url: "/admin/categories",
        icon: ChartColumnStacked
    }
]

const AdminSideBar: React.FC = () => {
    const router = useRouter();
    const logout = useAuthStore().logout;

    const handleLogout = () => {
        logout()
        router.push('/admin/login');
    }
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarContent>

            <SidebarGroup>
                <SidebarGroupLabel >Admin Dashboard</SidebarGroupLabel>

                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>           
                </SidebarGroupContent>

            </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
            <SidebarMenuButton >
                <div className="ml-auto flex items-center text-2xl cursor-pointer" onClick={handleLogout}>
                    <LogOut />
                    <span>Logout</span>
                </div>
            </SidebarMenuButton>

            </SidebarFooter>
        </Sidebar>
    )
}

export default AdminSideBar;