"use client"
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BookType,  UserPen, User, HousePlus, ChartColumnStacked } from 'lucide-react';

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
        url: "#",
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
        <Sidebar className="bg-stone-800">
            <SidebarContent>

            <SidebarGroup>
                <SidebarGroupLabel >Admin Dashboard</SidebarGroupLabel>

                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
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
                    <span>Logout</span>
                </a>
            </SidebarMenuButton>

            </SidebarFooter>
        </Sidebar>
    )
}

export default AdminSideBar;