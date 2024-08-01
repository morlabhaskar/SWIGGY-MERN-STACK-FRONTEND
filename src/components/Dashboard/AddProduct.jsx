import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Input, Checkbox, Radio } from 'antd';
import { CgAddR } from 'react-icons/cg';
import { API_URL } from '../../api/Url';


const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [bestSeller, setBestSeller] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item != value))
        }
        else {
            setCategory([...category, value])
        }
    }

    const handleBestSeller = async (e) => {
        const value = e.target.value === 'true';
        setBestSeller(value)
    }

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const loginToken = localStorage.getItem('token');
            const firmId = localStorage.getItem('firmId');
            if (!loginToken || !firmId) {
                console.log("user not Authenticated")
            }
            const formData = new FormData();
            formData.append('productName', productName)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('image', image)
            category.forEach((value) => {
                formData.append('category', value)
            })
            const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
                method: 'POST',
                body: formData
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
                <h1 className='text-blue-600 text-3xl flex items-center'>Add Product <span className='text-[17px] text-teal-500 mx-3 mt-2'><CgAddR /></span></h1>
                <hr className='w-[35px]' />
                
                <div className="form border-2 border-orange-600 rounded-2xl h-[90%] mt-4 p-4 flex justify-center items-start">
                    <form className='flex flex-col gap-3 mt-4 w-full p-8' onSubmit={handleAddProduct}>
                        <div className='flex gap-8 w-4/4'>
                            <Input type="text" placeholder='Product Name' className='border-black w-[500px] h-[40px]' value={productName} onChange={(e) => setProductName(e.target.value)} />
                            <Input type="text" placeholder='Price' className='border-black w-[500px] h-[40px]' value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className='flex mt-4 w-4/4'>
                            <span className=' w-2/4'>
                                <h1 className="text-fuchsia-900 text-lg py-2">Category :</h1>
                                <span className="flex gap-7 mt-2 items-center">
                                    <CustomCheckboxWrapper className='flex gap-12'>
                                        <span className='flex items-center gap-4 '>Veg <Checkbox className='' checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} /></span>
                                        <span className='flex items-center gap-4'>Non-Veg <Checkbox checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} /></span>
                                    </CustomCheckboxWrapper>
                                </span>
                            </span>
                            <span className='w-3/4'>
                                <h1 className="text-fuchsia-900 text-lg py-2">Best Seller :</h1>
                                <span className="flex gap-7">
                                    <CustomRadioWrapper className='flex gap-12'>
                                    <span className='flex items-center gap-4'>Yes <Radio className='radio' value="true" checked={bestSeller === true} onChange={handleBestSeller} /></span>
                                    <span className='flex items-center gap-4'>No <Radio value="false" checked={bestSeller === false} onChange={handleBestSeller} /></span>
                                    </CustomRadioWrapper>
                                </span>
                            </span>
                        </div>
                        <CustomTextArea placeholder='Description' className='border-black outline-none mt-6 w-[500px]' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <Input type="file" className='border-black h-[40px] w-[200px] flex justify-center items-center mt-4' onChange={handleImageUpload} />
                        <Button htmlType='submit' className='rounded-none bg-orange-500 text-white w-[300px] mt-4 '>Add</Button>
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


const CustomCheckboxWrapper = styled.div`
  .ant-checkbox {
    width: 30px; 
    height: 30px;
    border:1px solid black; 
  }

  .ant-checkbox-inner {
    width: 30px; 
    height: 30px;
  }

  .ant-checkbox-inner::after {
    width: 20px; 
    height: 20px; 
  }
  .ant-checkbox-checked .ant-checkbox-inner::after {
    left: 25%;
    top: 44%; 
    width: 8px; 
    height: 14px; 
    border-width: 2px; 
    
  }
`;
const CustomRadioWrapper = styled.div`
   .ant-radio {
    width: 30px;
    height: 30px; 
    border:1px solid black;
  }

  .ant-radio-inner {
    width: 30px;
    height: 30px; 
  }

  .ant-radio-inner::after {
    top: 17%;
    left: 16%; 
    width: 30px;
    height: 30px; 
    margin-top: -5px; 
    margin-left: -5px; 
    background-color: #f8fcfe; 
  }
`;

const { TextArea } = Input;
const CustomTextArea = styled(TextArea)`
  width: 80%; 
  height: 500px;

  `;
export default AddProduct