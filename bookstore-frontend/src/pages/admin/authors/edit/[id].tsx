import { useRouter } from "next/router";

const editAuthorPage = () => {
    const router = useRouter();
    const { id } = router.query;
}

export default editAuthorPage;