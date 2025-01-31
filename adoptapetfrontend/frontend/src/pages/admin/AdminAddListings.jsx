// import React,{useState} from 'react'
// import {toast} from 'react-toastify'
// import { useNavigate } from 'react-router-dom';
// import { addListingApi } from '../../apis/Api';
// import "./addlisting.css"
// const AdminAddListings = () => {

//   const[petName,setpetName] = useState('')
//   const[petType,setPetType] =useState("")
//   const[breed,setBreed] = useState("")
//   const[gender,setGender] = useState("")
//   const[size,setSize] = useState("")
//   const[aboutPet,setAboutPet] = useState("")
//   const[petImage,setPetImage] = useState(null)
//   const[previewImage,setPreviewImage] = useState(null)

//   const handleImageUpload = (event) =>{
//     const file = event.target.files[0]
//     setPetImage(file)
//     setPreviewImage(URL.createObjectURL(file))
//   }

//   const handleSubmit =(e) => {
//     e.preventDefault()
//     console.log(petName,petType,breed,gender,size,aboutPet,petImage)
    
//     // make a logical form data 
//     const formData = new FormData();
//     formData.append('petName',petName)
//     formData.append('petType',petType)
//     formData.append('breed',breed)
//     formData.append('gender',gender)
//     formData.append('size',size)
//     formData.append('aboutPet',aboutPet)
//     formData.append("petImage", petImage)

    
//     //make a api request
//     addListingApi(formData).then((res)=>{
//         if(res.status === 201){
//             toast.success(res.data.message)
//         }else{
//             toast.error("Something went wrong in front end")
//         }
//     }
//     ).catch((error)=>{
//         if(error.response){
//             if(error.response.status === 400){
//                 toast.error(error.response.data.message)
//             }
            
//         }else if(error.response.status === 500){
//             toast.error("Internal server error")
//         }else{
//             toast.error("No response!")
//         }
//     })
// }
//   return (
    
//     <div class="container-listing">
//         <h1>Add New Listing</h1>
//         <form action="#" method="POST">
//             <div class="form-group">
//                 <label for="name">Name:</label>
//                 <input onChange={(e)=> setpetName(e.target.value)} type="text" id="name" name="name" required/>
//             </div>
//             <div className="form-group">
//             <label htmlFor="type">Type:</label>
//             <select onChange={(e)=> setPetType(e.target.value)} id="type" name="type" required>
//               <option value="">Select Type</option>
//               <option value="cat">Cat</option>
//               <option value="dog">Dog</option>
//             </select>
//           </div>
//             <div class="form-group">
//                 <label for="breed">Breed:</label>
//                 <input onChange={(e)=> setBreed(e.target.value)} type="text" id="breed" name="breed" required/>
//             </div>
//             <div class="form-group">
//                 <label for="size">Size:</label>
//                 <input onChange={(e)=> setSize(e.target.value)} type="text" id="size" name="size" required/>
//             </div>
//             <div class="form-group">
//                 <label for="description">Description:</label>
//                 <textarea onChange={(e)=> setAboutPet(e.target.value)} id="description" name="description" rows="4" required></textarea>
//             </div>
//             <div class="form-group">
//                 <label>Gender:</label>
//                 <div class="radio-group">
//                     <input  onChange={(e)=> setGender(e.target.value)}  type="radio" id="male" name="gender" value="male" required/>
//                     <label for="male">Male</label>
//                 </div>
//                 <div class="radio-group">
//                     <input  onChange={(e)=> setAboutPet(e.target.value)}  type="radio" id="female" name="gender" value="female" required/>
//                     <label for="female">Female</label>
//                 </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="image">Add Image:</label>
//               <input  onChange={handleImageUpload}  type="file" id="image" name="image" accept="image/*" />
//               {
//                         previewImage &&(
//                             <div className=''>
//                                 <img src ={previewImage} alt = "preview image" className='img-fluid rounded object-fit-cover mt-3'/>
//                             </div>
//                         )
//                     }
//             </div>
//             <button onClick={handleSubmit} type="submit">Submit</button>
//         </form>
//     </div>
    
//   );
// }

// export default AdminAddListings

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addListingApi } from '../../apis/Api';
import { FaUpload, FaPaw } from 'react-icons/fa';
import officiallogo from '../../assets/officiallogo.png';

const AdminAddListings = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [aboutPet, setAboutPet] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPetImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('petName', petName);
    formData.append('petType', petType);
    formData.append('breed', breed);
    formData.append('gender', gender);
    formData.append('size', size);
    formData.append('aboutPet', aboutPet);
    formData.append('petImage', petImage);

    addListingApi(formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        } else {
          toast.error('Something went wrong in front end');
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 500) {
            toast.error('Internal server error');
          }
        } else {
          toast.error('No response!');
        }
      });
  };

  return (
    <div className="min-h-screen bg-brown-50 font-sans">
      <nav className="bg-brown-800 shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={officiallogo} alt="Logo" className="h-8 w-auto mr-3" />
              <span className="text-xl font-bold text-brown-100">AdoptAPet</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-brown-200">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-brown-800">Add New Pet Listing</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="petName" className="block text-sm font-medium text-brown-700 mb-2">
                  Pet Name
                </label>
                <input
                  type="text"
                  id="petName"
                  onChange={(e) => setPetName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
              </div>
              <div>
                <label htmlFor="petType" className="block text-sm font-medium text-brown-700 mb-2">
                  Pet Type
                </label>
                <select
                  id="petType"
                  onChange={(e) => setPetType(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                >
                  <option value="">Select Type</option>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <div>
                <label htmlFor="breed" className="block text-sm font-medium text-brown-700 mb-2">
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  onChange={(e) => setBreed(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
              </div>
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-brown-700 mb-2">
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  onChange={(e) => setSize(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-2">
                  Gender
                </label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio text-brown-600"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio text-brown-600"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="aboutPet" className="block text-sm font-medium text-brown-700 mb-2">
                  About Pet
                </label>
                <textarea
                  id="aboutPet"
                  onChange={(e) => setAboutPet(e.target.value)}
                  required
                  rows="4"
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brown-700 mb-2">
                  Pet Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-brown-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-brown-400" />
                    <div className="flex text-sm text-brown-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-brown-600 hover:text-brown-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brown-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-brown-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {previewImage && (
                  <div className="mt-3">
                    <img src={previewImage} alt="Preview" className="max-w-full h-auto rounded-lg" />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-brown-600 text-white font-semibold rounded-lg shadow-md hover:bg-brown-700 transition duration-300 ease-in-out"
                >
                  Add Pet Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddListings;