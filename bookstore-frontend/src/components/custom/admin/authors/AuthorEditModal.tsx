import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Author } from "@/types/common";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";



interface AuthorEditModalProps {
    author: Author;
}


const AuthorEditModal: React.FC<AuthorEditModalProps> = ({ author }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"yellow"} className="ms-4">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Author Info</DialogTitle>
                    <DialogDescription>
                        Make Change to author info here. Click save to apply changes.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name:
                        </Label>
                        <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="bio" className="text-right col-span-1 self-start">
                            Bio:
                        </Label>
                        <Textarea id="bio" className="col-span-3">
                        </Textarea>
                    </div>
                </div>
                <DialogFooter>
                    <Button>Save</Button>
                </DialogFooter>
                
            </DialogContent>
            
        </Dialog>
    )
}

export default AuthorEditModal;