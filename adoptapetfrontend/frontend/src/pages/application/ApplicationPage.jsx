import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { applicationApi } from '../../apis/Api.js'
import { toast } from 'react-toastify'
import officiallogo from "../../assets/officiallogo.png"
import Navbar from '../../components/Navbar.jsx'

const ApplicationPage = () => {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    email: '',
    phonenumber: '',
    occupation: '',
    haveDog: '',
    reasonsForAdopting: '',
    livingSituation: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
    // Clear the error when user starts typing
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
  }

  const validate = () => {
    let tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = 'Name is required'
    if (!formData.age.trim()) tempErrors.age = 'Age is required'
    if (!formData.address.trim()) tempErrors.address = 'Address is required'
    if (!formData.email.trim()) tempErrors.email = 'Email is required'
    if (!formData.phonenumber.trim()) tempErrors.phonenumber = 'Phone number is required'
    if (!formData.occupation.trim()) tempErrors.occupation = 'Occupation is required'
    if (!formData.haveDog) tempErrors.haveDog = 'This field is required'
    if (!formData.reasonsForAdopting.trim()) tempErrors.reasonsForAdopting = 'Reason for adopting is required'
    if (!formData.livingSituation) tempErrors.livingSituation = 'Living situation is required'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const data = {
        ...formData,
        petId: id
      }
      applicationApi(data).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message)
        } else {
          toast.success(res.data.message)
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-brown-50 font-sans">
      <Navbar/>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-brown-200">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-brown-800 text-center">Adoption Application Form</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brown-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-brown-700 mb-2">Age</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-brown-700 mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brown-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phonenumber" className="block text-sm font-medium text-brown-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phonenumber"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                {errors.phonenumber && <p className="text-red-500 text-xs mt-1">{errors.phonenumber}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="occupation" className="block text-sm font-medium text-brown-700 mb-2">Occupation</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-brown-700 mb-2">Do you have another pet at present?</label>
                <div className="mt-2 space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="haveDog"
                      value="true"
                      checked={formData.haveDog === 'true'}
                      onChange={handleChange}
                      className="form-radio text-brown-600"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="haveDog"
                      value="false"
                      checked={formData.haveDog === 'false'}
                      onChange={handleChange}
                      className="form-radio text-brown-600"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {errors.haveDog && <p className="text-red-500 text-xs mt-1">{errors.haveDog}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="livingSituation" className="block text-sm font-medium text-brown-700 mb-2">Living Situation</label>
                <select
                  id="livingSituation"
                  name="livingSituation"
                  value={formData.livingSituation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                >
                  <option value="">Select...</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Room">Room</option>
                </select>
                {errors.livingSituation && <p className="text-red-500 text-xs mt-1">{errors.livingSituation}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="reasonsForAdopting" className="block text-sm font-medium text-brown-700 mb-2">Reasons for Adopting</label>
                <textarea
                  id="reasonsForAdopting"
                  name="reasonsForAdopting"
                  value={formData.reasonsForAdopting}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 text-brown-700 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                ></textarea>
                {errors.reasonsForAdopting && <p className="text-red-500 text-xs mt-1">{errors.reasonsForAdopting}</p>}
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-brown-600 text-white font-semibold rounded-lg shadow-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 focus:ring-offset-brown-200"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationPage
