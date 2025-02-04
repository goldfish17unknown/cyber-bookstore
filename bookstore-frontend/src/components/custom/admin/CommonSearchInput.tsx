import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
    searchValue: string;
    setSearchValue: (search: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ searchValue, setSearchValue}) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
        <Search className="w-5 h-5" />
      </div>
      <Input
        type="text"
        placeholder="Search..."
        className="pl-10" 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;