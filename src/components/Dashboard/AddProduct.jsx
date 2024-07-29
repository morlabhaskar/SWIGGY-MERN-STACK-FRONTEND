import React,{useState} from 'react'
import styled from 'styled-components'
import { Button, Input ,Checkbox, Radio} from 'antd';
import { CgAddR } from 'react-icons/cg';
import { API_URL } from '../../api/Url';

const AddProduct = () => {
    const [productName,setProductName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState([]);
    const [bestSeller,setBestSeller] = useState(null);
    const [image,setImage] = useState(null);
    const [description,setDescription] = useState("");

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (category.includes(value)){
            setCategory(category.filter((item)=>item != value))
        }
        else {
            setCategory([...category,value])
        }
    }

    const handleBestSeller = async (e) => {
        const value = e.target.value === 'true';
        setBestSeller(value)
    }

    const handleAddProduct = async(e) => {
        e.preventDefault();
        try {
            const loginToken = localStorage.getItem('token');
            const firmId = localStorage.getItem('firmId');
            if (!loginToken || !firmId){
                console.log("user not Authenticated")
            }
            const formData = new FormData();
                formData.append('productName',productName)
                formData.append('price',price)
                formData.append('description',description)
                formData.append('image',image)
                category.forEach((value) => {
                    formData.append('category',value)
                })
            const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
                method:'POST',
                body:formData
            });
            const data = await response.json()

            if (response.ok) {
                console.log(data)
                alert('Poduct Added Successfully');
                setProductName("")
                setPrice("")
                setDescription("")
                setBestSeller(null)
                setCategory([])
                setImage("")
            }  
        } catch (error) {
            console.log(error);
            alert('Filed to add Product')            
        }

    }
    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage)
    }

  return (
    <Wrapper>
            <div className='add-firm p-5'>
                <h1 className='text-blue-600 text-3xl flex items-center'>Add Product <span className='text-[17px] text-teal-500 mx-3 mt-2'><CgAddR/></span></h1>
                <hr className='w-[35px]' />
                <div className="form border-2 border-orange-600 rounded-2xl h-[90%] mt-4 flex justify-center items-start">
                    <form className='flex flex-col gap-3 mt-4' onSubmit={handleAddProduct}>
                        <Input type="text" placeholder='Product Name' className='border-black' value={productName} onChange={(e)=>setProductName(e.target.value)} />
                        <Input type="text" placeholder='Price' className='border-black' value={price} onChange={(e)=>setPrice(e.target.value)}  />
                        {/* <Input type="text" placeholder='Category' className='border-black' /> */}
                        <span>
                            <h1 className="text-fuchsia-900 py-2">Category </h1>
                            <span className="flex gap-7">
                                <span>Veg <Checkbox checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} /></span>
                                <span>Non-Veg <Checkbox checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}  /></span>
                            </span>
                        </span>
                        <span>
                            <h1 className="text-fuchsia-900 py-2">Best Seller </h1>
                            <span className="flex gap-7">
                                <span>Yes <Radio className='radio' value="true" checked={bestSeller === true} onChange={handleBestSeller} /></span>
                                <span>No <Radio value="false" checked={bestSeller === false} onChange={handleBestSeller} /></span>
                            </span>
                        </span>
                        <Input.TextArea placeholder='Description' className='border-black outline-none' value={description} onChange={(e)=>setDescription(e.target.value)} />
                        <Input type="file" className='border-black' onChange={handleImageUpload}  />
                        <Button htmlType='submit' className='rounded-none bg-orange-500 text-white'>Add</Button>
                    </form>
                </div>
            </div>
        </Wrapper>
  )
}
const Wrapper = styled.div`
    width: 100%;
    .add-firm {
        height: 100%;
    }
    .add-firm hr {
        height: 5px;
        background-color: #f88b55;
        border-radius: 3px;
    }
`;

export default AddProduct