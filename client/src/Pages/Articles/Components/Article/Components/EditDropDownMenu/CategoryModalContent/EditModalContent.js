import { Input } from "Components";
import useSidebarContent from "Hooks/useSidebarContent";
import { updateCategory } from "_Constants/fetchUrl";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditModalContent({setShow}){
    const { id } = useParams()
    const [category, setCategory] = useState('')
    const [subCategory,setSubcategory] = useState('')

    const { setSidebarContent } = useSidebarContent()

    const handleCategoryUpdate = () => {
        const categoryData = {
            category: category ? category : null,
            subCategory: subCategory ? subCategory : null
        }

        fetch(`${updateCategory}${id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(categoryData)
        })
        .then(res=>res.json())
        .then(res=>{
            setSidebarContent(res)
            setShow(false)
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className='modal' onClick={e=>e.stopPropagation()}>
            <h2>Edit category</h2>
            <Input label='Category' inputValue={category} setInputValue={setCategory}/>
            <Input label='Subcategory' inputValue={subCategory} setInputValue={setSubcategory}/>
            <button className="primary-button mt-1" onClick={handleCategoryUpdate}>Update</button>
            <button className="secondary-button mt-1" onClick={()=>setShow(false)}>Close</button>
        </div>
    )

}