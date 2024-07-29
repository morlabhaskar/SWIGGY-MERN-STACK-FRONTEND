
import { Button, Input, Checkbox } from 'antd';
import React, { useState } from 'react';
import { CgAddR } from 'react-icons/cg';
import styled from 'styled-components';
import { API_URL } from '../../api/Url';

const AddFirm = () => {
    const [firmName,setFirmName] = useState("");
    const [area,setArea] = useState("");
    const [category,setCategory] = useState([]);
    const [region,setRegion] = useState([]);
    const [offer,setOffer] = useState("");
    const [file,setFile] = useState(null);

    const handleFirmSubmit = async(e) => {
        e.preventDefault()
        try {
            const loginToken = localStorage.getItem('token');
            if (!loginToken) {
                console.log("User not Authorised")
            }
            const formData = new FormData();
                formData.append('firmName',firmName)
                formData.append('area',area)
                formData.append('offer',offer)
                formData.append('image',file)
                category.forEach((value) => {
                    formData.append('category',value)
                })
                region.forEach((value) => { 
                    formData.append('region',value)
                })
                const response = await fetch(`${API_URL}/firm/add-firm`,{
                    method:'POST',
                    headers:{
                        'token':`${loginToken}`
                    },
                    body: formData
                });
                const data = await response.json()
                if (response.ok) {
                    console.log(data);
                    alert("Firm Added Successfully");
                    setFirmName("")
                    setArea("")
                    setOffer("")
                    setCategory([])
                    setRegion([])
                    setFile("")
                    console.log("this is firmId :",data.firmId);
                    const mango = data.firmId;
                    localStorage.setItem('firmId',mango)
                }
                else if(data.message === 'vendor can have only one firm') {
                    alert('Firm Exist ,only 1 Firm you can Added')
                    setFirmName("")
                    setArea("")
                    setOffer("")
                    setCategory([])
                    setRegion([])
                    setFile("")
                }
        } catch (error) {
            alert("Firm Add Failed")
        }
    }
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (category.includes(value)){
            setCategory(category.filter((item)=>item != value))
        }
        else {
            setCategory([...category,value])
        }
    }
    const handleRegionChange = (e) => {
        const value = e.target.value;
        if (region.includes(value)){
            setRegion(region.filter((item)=>item != value))
        }
        else {
            setRegion([...region,value])
        }
    }
    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage)
    }

    return (
        <Wrapper>
            <div className='add-firm p-5'>
                <h1 className='text-blue-600 text-3xl flex items-center'>Add Firm <span className='text-[17px] text-teal-500 mx-3 mt-2'><CgAddR/></span></h1>
                <hr className='w-[35px]' />
                <div className="form border-2 border-orange-600 rounded-2xl h-[90%] mt-4 flex justify-center items-start">
                    <form className='flex flex-col gap-3 mt-4' onSubmit={handleFirmSubmit}>
                        <Input type="text" placeholder='Firm Name' className='border-black' name="firmName" value={firmName} onChange={(e)=>setFirmName(e.target.value)} />
                        <Input type="text" placeholder='Area' className='border-black' name="area" value={area} onChange={(e)=>setArea(e.target.value)}  />
                        <span>
                            <h1 className="text-fuchsia-900 py-2">Category : </h1>
                            <span className="flex gap-7">
                                <span>Veg <Checkbox checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} /></span>
                                <span>Non-Veg <Checkbox checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} /></span>
                            </span>
                        </span>
                        <span>
                            <h1 className="text-fuchsia-900 py-2">Region :</h1>
                            <span className="flex gap-7">
                                <span>South-Indian <Checkbox checked={region.includes('south-indian')} value="south-indian" onChange={handleRegionChange} /></span>
                                <span>North-Indian <Checkbox checked={region.includes('north-indian')} value="north-indian" onChange={handleRegionChange}/></span>
                            </span>
                            <span className="flex gap-7 my-2">
                                <span>Chineese <Checkbox checked={region.includes('chinese')} value="chinese" onChange={handleRegionChange} /></span>
                                <span>Bakery <Checkbox checked={region.includes('bakery')} value="bakery" onChange={handleRegionChange} /></span>
                            </span>
                        </span>
                        <Input type="text" placeholder='Offer' className='border-black' name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}  />
                        <Input type="file" className='border-black' onChange={handleImageUpload} />
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

export default AddFirm