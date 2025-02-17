import { BorrowedBook } from "@/types/common";
import { create } from "zustand";

interface BorroweState {
    Borrowed: BorrowedBook[],
    recentReturn: BorroweState[],

    getBorrowedRecord: () => Promise<void>,
    borrowBook: (book_id: number, user_id: number) => Promise<void>,
    returnBook: (book_id: number) => Promise<void>,
    deleteRecord: () => Promise<void>,
    getRecentReturn: () => Promise<void>,

}

const useBorrowedStore = create<BorroweState>((set, get) => ({
    Borrowed: [],
    recentReturn: [],
    getBorrowedRecord: async () => {

    },
    borrowBook: async() => {

    },
    returnBook: async() => {

    },
    deleteRecord: async() => {

    },
    getRecentReturn: async () => {

    }





}))

export default useBorrowedStore