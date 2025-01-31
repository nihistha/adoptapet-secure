import axios from "axios";

const Api = axios.create({
    baseURL : "https://localhost:5500",
    withCredentials : true,
    headers: {
        "Content-Type":"multipart/form-data"
    }
})
const config = {headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`,}}


export const testApi = ()=> Api.get('/test')
export const registerUserApi = (data)=> Api.post('/api/user/create',data)
export const loginUserApi = (data)=> Api.post('/api/user/login',data)
export const forgotPasswordApi = (data)=>Api.post('/api/user/forgot_password',data)
export const verifyOtpApi = (data) =>Api.post('/api/user/verify_otp',data)
export const changePasswordApi = (data) =>Api.patch('/api/user/change-password',data)
//Listing
export const addListingApi = (data) => Api.post('/api/pets/create',data)
export const getAllListings = () => Api.get('/api/pets/get_all_listings')
export const pagination = (page) => Api.get(`/api/pets/pagination?page=${page}`)
export const getoneListing = (id) => Api.get(`/api/pets/get_single_listing/${id}`)
export const deleteListing = (id) => Api.delete(`/api/pets/delete_listing/${id}`)
export const updateListing = (id,data) => Api.put(`/api/pets/updatelisting/${id}`,data)
export const searchListingsApi = (params) => Api.get('/api/pets/search', { params });


//Application
export const applicationApi = (data)=> Api.post(`/api/user/application`,data,{headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`,
}})
export const getApplicationsApi = ()=>Api.get('/api/user/get_all_applications')
export const getSingleApplicationApi = (id) => Api.get(`/api/user/get_single_application/${id}`)
export const updateApplicationApi = (id,data)=>Api.put(`/api/user/update-application/${id}`,data)
export const getUserApplicationApi = ()=>Api.get(`/api/user/profile`,{headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`,}})
export const deleteApplicationApi = (id)=>Api.delete(`api/user/delete_application/${id}`)


//Meet
export const scheduleMeetApi = (data)=> Api.post('/api/user/meet',data,{headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`,}});
export const getAllMeetApi = ()=>Api.get('/api/user/getAllMeet')


//Esewa
export const checkoutApi = (data)=>Api.post('/api/payment/checkout',data,{headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`,}})
export const getDonationApi = ()=>Api.get('/api/payment/donations')    

// export const getListing = (id) => Api.get( `/api/pets/getlisting/${id}`)