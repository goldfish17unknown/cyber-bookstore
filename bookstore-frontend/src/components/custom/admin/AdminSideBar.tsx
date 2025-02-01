"use client"
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BookType,  UserPen, User, HousePlus, ChartColumnStacked, LogOut } from 'lucide-react';
import Link from "next/link";

const items = [
    {
        title: "Books",
        url: "#",
        icon: BookType
    },
    {
        title: "Borrows and Returns",
        url: "#",
        icon:  HousePlus
    },
    {
        title: "User Management",
        url: "#",
        icon: User
    },
    {
        title: "Authors",
        url: "/admin/authors",
        icon: UserPen,
    },
    {
        title: "Categories",
        url: "#",
        icon: ChartColumnStacked
    }
]

const AdminSideBar: React.FC = () => {
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
                <a href="" className="ml-auto flex items-center text-2xl">
                    <LogOut />
                    <span>Logout</span>
                </a>
            </SidebarMenuButton>

            </SidebarFooter>
        </Sidebar>
    )
}

export default AdminSideBar;