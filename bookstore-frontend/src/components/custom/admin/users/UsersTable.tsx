import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import dayMonthYear from "@/lib/dayTime";
import { User } from "@/types/common";
import React from "react";
import CommonDeleteModal from "../CommonDeleteModal";
import Link from "next/link";

interface UsersTableProps {
    users: User[]
    deleteFunction: (id: number) => void;
    editFunction: (e: React.FormEvent<HTMLFormElement>, id: number, newName: string, newEmail: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, deleteFunction }) => {
    return (
        <Table className="mx-auto md:w-2/3 sm:w-full">
            <TableCaption>A list of users</TableCaption>
            <TableHeader>
                
                    <TableRow>
                        <TableHead className="w-3/12">name</TableHead>
                        <TableHead className="w-3/12">email</TableHead>
                        <TableHead className="w-3/12">first join date</TableHead>
                        <TableHead className="w-3/12">Action</TableHead>
                    </TableRow>
                
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <Link href={`/admin/users-management/${user.id}`}>
                            <Button variant={"link"}>{user.name}</Button>
                            
                            </Link>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{dayMonthYear(user.created_at)}</TableCell>
                        <TableCell>
                            <Button variant={"yellow"}>Edit</Button>
                            <CommonDeleteModal deleteHandler={deleteFunction} deleteItemID={user.id}  />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default UsersTable;