import dayjs from "dayjs";

// return day / month / year
export default function dayMonthYear(dateString: string | undefined){
    if (typeof dateString === "string") {
        return dayjs(dateString).format("DD/MM/YYYY");
    }
    return null;

}