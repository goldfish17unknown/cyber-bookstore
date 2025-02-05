interface UserEditModal{
    editFunction: (e: React.FormEvent<HTMLFormElement>) => void
    userName: string
    setUserName: (name: string) => void
    email: string
    setEmail: (email: string) => void
    dialogOpen: boolean
    setDialogOpen: (dialogOpen: boolean) => void

}

const UserEditModal: React.FC<UserEditModal> = () => {
    return(
        <div>

        </div>
    )
}