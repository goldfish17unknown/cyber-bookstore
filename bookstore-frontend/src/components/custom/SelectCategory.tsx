import useCategoryStore from '@/store/CategoryStore';
import { useEffect } from 'react';
import Select from 'react-select'

interface SelectCategoryProps {
    categoryValue: string
    setCategoryValue: (categoryValue: string) => void; 

}

const SelectCategory: React.FC<SelectCategoryProps> = ({categoryValue, setCategoryValue }) => {
    const { categories, fetchCategories } = useCategoryStore()
    const options = [
        { value: '', label: 'All' },
        ...categories.map((cat) => ({ value: cat.id.toString(), label: cat.name })),
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (selectedOption: { value: string, label: string } | null) => {
        if (selectedOption) {
            setCategoryValue(selectedOption.value);
        } else {
            setCategoryValue('');
        }
    };

    return (
        <Select
          options={options}
          onChange={handleChange}
          value={options.find((option) => option.value === categoryValue) || null}
          className="w-full"
        />
      )
}


export default SelectCategory;

