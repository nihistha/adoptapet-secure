// import React,{useState,useEffect} from 'react'
// import officiallogo from "../../assets/officiallogo.png"
// import { useParams } from 'react-router-dom'
// import "./updatelisting.css"
// import { getListing, updateListing } from '../../apis/Api'
// import {toast} from 'react-toastify'

// const UpdateListing = () => {

//   const {id} = useParams()

//   const [petName, setPetName] = useState('')
//   const [petType, setPetType] = useState('')
//   const [breed, setBreed] = useState('')
//   const [aboutPet, setAboutPet] = useState('')
//   const [size, setSize] = useState('')
//   const [gender, setGender] = useState('')
//   const [pettNewImage, setPetNewImage] = useState(null)
//   const [previewNewImage, setPreviewNewImage] = useState(null)
//   const [oldImage, setOldImage] = useState('')

//   useEffect (()=>{
//     getListing(id).then((res)=>{
//           console.log(res.data)
//           setPetName(res.data.listing.petName)
//           setPetType(res.data.listing.petType)
//           setBreed(res.data.listing.breed)
//           setAboutPet(res.data.listing.aboutPet)
//           setSize(res.data.listing.size)
//           setGender(res.data.listing.gender)
//           setOldImage(res.data.listing.petImage)
//       }).catch((error) =>{
//           console.log(error)
//       })
//   },[])
//       // image upload handler
//       const handleImage = (event) => {
//         const file = event.target.files[0]
//         setPetNewImage(file) // for backend
//         setPreviewNewImage(URL.createObjectURL(file))
//     }
//     const handleUpdate = (e) => {
//       e.preventDefault()

//       const formData  = new FormData();
//       formData.append('petName',petName)
//       formData.append('petType',petType)
//       formData.append('breed',breed)
//       formData.append('gender',gender)
//       formData.append('aboutPet',aboutPet)
      
//       if(pettNewImage){
//           formData.append('petImage',pettNewImage)
//       }

//       updateListing(id, formData).then((res) =>{
//           if(res.status === 201){
//               toast.success(res.data.message)
//           }
//       }).catch((error) => {
//           if(error.response.status === 500){
//               toast.error(error.response.data.message)
//           }else if(error.message.status === 400){
//               toast.warning(error.response.data.message)
//           }
//       })


//   }

//   return (
//     <div className="form-container">
      
//         <nav className="navbar" >
//           <div className="container-fluid">
//             <a className="navbar-brand" href="#">
//               <img src={officiallogo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
//               AdoptAPet
//             </a>
//           </div>
//         </nav>
      
//       <main className="container-fluid p-4">
//         <h1 className="text-center mb-4">Pet Information</h1>
//         <div className="form-card">
//           <form>
//             <div className="form-group row">
//               <label className="col-sm-2 col-form-label">Name:</label>
//               <div className="col-sm-10">
//                 <input value = {petName} onChange={(e) => setPetName(e.target.value)} type="text" className="form-control"  />
//               </div>
//             </div>
//             <div className="form-group row">
//               <label className="col-sm-2 col-form-label">Type:</label>
//               <div className="col-sm-10">
//                 <input value = {petType} onChange={(e) => setPetType(e.target.value)} type="text" className="form-control"  />
//               </div>
//             </div>
//             <div className="form-group row">
//               <label className="col-sm-2 col-form-label">Gender:</label>
//               <div className="col-sm-10">
//                 <input value = {gender} onChange={(e) => setGender(e.target.value)} type="text" className="form-control"  />
//               </div>
//             </div>
//             <div className="form-group row">
//               <label className="col-sm-2 col-form-label">Breed:</label>
//               <div className="col-sm-10">
//                 <input value = {breed} onChange={(e) => setBreed(e.target.value)} type="text" className="form-control" placeholder="Breed" />
//               </div>
//             </div>
//             <div className="form-group row">
//               <label className="col-sm-2 col-form-label">Size:</label>
//               <div className="col-sm-10">
//                 <input value = {size} onChange={(e) => setSize(e.target.value)} type="text" className="form-control" placeholder="Size" />
//               </div>
//             </div>
//             <div className="form-group row">
//               <label className="col-sm-2 col-form-label">Description:</label>
//               <div className="col-sm-10">
//                 <textarea value = {aboutPet} onChange={(e) => setAboutPet(e.target.value)} className="form-control" rows="3" placeholder="Description"></textarea>
//               </div>
//             </div>
//             <div className="form-group row">
            
//                         <h6>Image</h6>
//                         <img className = 'img-fluid object-fit-cover rounded-4' height={'200px'} width={'200px'} src={`http://localhost:5500/listings/${oldImage}`}/>
//                         {
//                             previewNewImage && <div>
//                                 <h6>New Image</h6>
//                                 <img src={previewNewImage} alt=""/>
//                             </div>
//                         }
                    
//             </div>
//             <div className="form-group row">
//               <div className="col-sm-10 offset-sm-2">
//                 <button type="submit" className="btn btn-primary">Submit</button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default UpdateListing
import React, { useState, useEffect } from 'react'
import officiallogo from "../../assets/officiallogo.png"
import { useParams } from 'react-router-dom'
import { getListing, getoneListing, updateListing } from '../../apis/Api'
import { toast } from 'react-toastify'
import { FaUpload } from 'react-icons/fa'

const UpdateListing = () => {
  const { id } = useParams()

  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [aboutPet, setAboutPet] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  console.log(petName)
  useEffect(() => {
    getoneListing(id).then((res) => {
      const listing = res.data
      setPetName(listing.petName)
      setPetType(listing.petType)
      setBreed(listing.breed)
      setGender(listing.gender)
      setSize(listing.size)
      setAboutPet(listing.aboutPet)
      setPreviewImage(`http://localhost:5500/listings/${listing.petImage}`)
    }).catch((error) => {
      console.log(error)
    })
  }, [id])

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
    if (petImage) {
      formData.append('petImage', petImage);
    }

    updateListing(id, formData)
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
            <h2 className="text-3xl font-bold mb-6 text-brown-800">Update Pet Listing</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="petName" className="block text-sm font-medium text-brown-700 mb-2">
                  Pet Name
                </label>
                <input
                  type="text"
                  id="petName"
                  value={petName}
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
                  value={petType}
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
                  value={breed}
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
                  value={size}
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
                      checked={gender === 'male'}
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
                      checked={gender === 'female'}
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
                  value={aboutPet}
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
                  Update Pet Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateListing;