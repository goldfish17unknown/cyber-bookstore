import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSideBar from "../custom/admin/AdminSideBar";

type LayoutProps = {
    children: ReactNode;
}

export const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
        <AdminSideBar />
        <main>
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>

  )
}