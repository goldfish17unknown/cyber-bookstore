import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

interface DeleteModalProps {
    deleteHandler: (id: number) => void;
    deleteItemID: number | undefined;

}


const CommonDeleteModal: React.FC<DeleteModalProps> = ({ deleteHandler, deleteItemID }) => {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant={"red"} className="ms-4">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] bg-white">
                <DialogHeader>
                    <DialogTitle>Delete this item?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this item?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={() => deleteItemID !== undefined && deleteHandler(deleteItemID)}>Delete</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CommonDeleteModal;