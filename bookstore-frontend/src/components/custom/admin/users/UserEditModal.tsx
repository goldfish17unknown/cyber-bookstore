import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types/common"
import { useEffect, useState } from "react"

interface UserEditModal{
    editFunction: (id: number, name: string, email: string) => void
    editUser: User
}

const UserEditModal: React.FC<UserEditModal> = ({editFunction, editUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState(editUser.name);
    const [email, setEmail] = useState(editUser.email);
    
    useEffect(() => {
        setUserName(editUser.name);
        setEmail(editUser.email);
    }, [editUser]);

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await editFunction(editUser.id, userName, email);
        setIsOpen(false);
        setUserName("")
        setEmail("")
    };

    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"yellow"} onClick={() => setIsOpen(true)}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                    <DialogTitle>
                        Edit User Info
                    </DialogTitle>
                    <DialogDescription>
                        Edit the user info and hit save to apply changes. 
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-5 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name:
                            </Label>
                            <Input id="name" className="col-span-3" value={userName} onChange={(e)=> setUserName(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-5 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email:
                            </Label>
                            <Input id="email" className="col-span-3" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save!</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UserEditModal;