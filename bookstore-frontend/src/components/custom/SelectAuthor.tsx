import Select from 'react-select'
import debounce from "lodash.debounce";
import { useEffect, useState } from 'react';
import { Author } from '@/types/common';


interface SelectAuthorProps {
    authorValue: string
    setAuthorValue: (authorValue: string) => void
}

const SelectAuthor: React.FC<SelectAuthorProps> = ({authorValue, setAuthorValue}) => {
    const [options, setOptions] = useState<{ value: string; label: string}[]>([]);
    const [ loading, setLoading] =useState<boolean>(false);
    const [ isClient, setIsClient] = useState<boolean>(false);

    const fetchAuthorDropDown = async (inputValue = "") => {
        setLoading(true);
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/dropdown/limit?search=${inputValue}&limit=8`)
            const data = await response.json();

            const authorOptions = data.map((author: Author) => ({
                value: author.id?.toString(),
                label: author.name
            }))

            setOptions([{ value: "", label: "All"}, ...authorOptions]);

        } catch (error){
            throw error
        }
        setLoading(false);
    }

    const debouncedFetchAuthors = debounce(fetchAuthorDropDown, 500);

    useEffect(() => {
        fetchAuthorDropDown();
        setIsClient(true);
    }, [])

    if (!isClient) return null;

    return (
        <Select 
        options={options}
        isLoading={loading}
        onInputChange={(inputValue) => debouncedFetchAuthors(inputValue)}
        onChange={(selectedOption) => setAuthorValue(selectedOption?.value || "")}
        value={options.find(option => option.value === authorValue) || { value: "", label: "All" }}
        className="w-full"
        />
    )
}

export default SelectAuthor;