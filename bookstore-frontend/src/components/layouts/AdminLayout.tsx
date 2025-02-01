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
        
        <main className="flex w-screen relative">
        <SidebarTrigger className="fixed top-4"/>
          
    
          <div className=" w-full flex justify-center p-5">
            <div className=" w-5/6">
            {children}
            </div>
            
          </div>
          
        </main>
    </SidebarProvider>

  )
}