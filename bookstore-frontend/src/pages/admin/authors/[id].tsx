import { AdminLayout } from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";

const AuthorsDetailPage: NextPageWithLayout = () => {

    const router = useRouter();
    const { id } = router.query;

    
    return (
        <div>
            <h1>{ id }</h1>

        </div>
    )
}


AuthorsDetailPage.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </ AdminLayout>
    )
}

export default AuthorsDetailPage;