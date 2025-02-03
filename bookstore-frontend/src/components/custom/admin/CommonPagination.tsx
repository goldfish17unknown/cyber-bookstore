import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination"

interface CommonPaginationProp {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const CommonPagination: React.FC<CommonPaginationProp> = ({  currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () =>{
        if (currentPage > 1){
            onPageChange(currentPage -1);
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages){
            onPageChange(currentPage + 1);
        }
    }

    const handlePageClick = (page: number) => {
        onPageChange(page);
    }

    if(totalPages <= 1){
        return;
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={currentPage > 1 ? handlePrevious : undefined} className="hover:cursor-pointer"/>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                        onClick={() => handlePageClick(index+1)}
                        isActive={currentPage === index + 1}
                        className="hover:cursor-pointer"
                        >
                            {index + 1}
                        </PaginationLink>

                    </PaginationItem>
                    
                ))}
                
                <PaginationItem>
                    <PaginationNext onClick={currentPage < totalPages ? handleNext : undefined } className="hover:cursor-pointer" />
                </PaginationItem>
                
                
            </PaginationContent>
        </Pagination>
    )
}

export default CommonPagination;