
interface ImageInputProps {
    handleImageChange: React.ChangeEventHandler<HTMLInputElement>;
} 

const ImageInput: React.FC<ImageInputProps> = ({handleImageChange}) => {

    return (
        <>
            <input type="file" name="image" id="image" accept="image/*" 
            onChange={handleImageChange}
            className="border border-gray-300 rounded-md p-2" />
        </>
    )
}

//TODO:: to add image crop

export default ImageInput