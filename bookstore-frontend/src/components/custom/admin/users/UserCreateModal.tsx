import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SmilePlus } from "lucide-react"

interface UserCreateModal{
    createFunction: (e: React.FormEvent<HTMLFormElement>) => void
    userName: string
    setUserName: (name: string) => void
    email: string
    setEmail: (email: string) => void
    dialogOpen: boolean
    setDialogOpen: (dialogOpen: boolean) => void

}

const UserCreateModal: React.FC<UserCreateModal> = ({ createFunction, userName, setUserName, email, setEmail, dialogOpen, setDialogOpen}) => {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>Create <SmilePlus /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                    <DialogTitle>
                        Create New User
                    </DialogTitle>
                    <DialogDescription>
                        Enter the user name and email and click save to apply.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={createFunction}>
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

export default UserCreateModal;