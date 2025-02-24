import { ReactNode, useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSideBar from "../custom/admin/AdminSideBar";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/router";

type LayoutProps = {
    children: ReactNode;
}

export const AdminLayout: React.FC<LayoutProps> = ({ children }) => {

  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [ authCheck, setAuthCheck ] = useState<boolean>(false);


  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 3

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
    setAuthCheck(true); 
  }, [isAuthenticated]);


  if(authCheck && isAuthenticated) {
    return (
      <SidebarProvider>
          <AdminSideBar />
          
          <main className="flex w-screen relative">
          <SidebarTrigger className="fixed top-4"/>
            
      
            <div className=" w-full flex justify-center p-5">
              <div className=" w-5/6">
              {children}
              <Toaster
                 position="top-center"
                 reverseOrder={false}
                 gutter={3}
  
                />
              </div>
              
            </div>
            
          </main>
      </SidebarProvider>
  
    )

  }

  return null;

  
}