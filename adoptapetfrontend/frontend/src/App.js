import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import AdminAddListings from './pages/admin/AdminAddListings';
import AdminDashboard from './pages/admin/AdminDashboard';
import UpdateListing from './pages/admin/UpdateListing';
import PetDetails from './pages/pet_details/PetDetails';
import ApplicationPage from './pages/application/ApplicationPage';
import Navbar from './components/Navbar';
import AllPets from './pages/all_pets/AllPets';
import { ToastContainer } from 'react-toastify';
import AdminHomepage from './pages/admin/AdminHomepage';
import AdminApplication from './pages/admin/AdminApplication';
import ForgotPassword from './pages/login/ForgotPassword'
import ApplicationDetails from './pages/admin/ApplicantsDetail';
import ProfilePage from './pages/profile/Profile';
import SearchComponent from './pages/search/Search';
import CategoryPets from './pages/category_pets/CategoryPets';
import Mail from './pages/mail/mail'
import PickUpSchedule from './pages/admin/PickUpSchedule';
import MeetList from './pages/admin/PickUpSchedule';
import DonationForm from './pages/donation/donation_page';
import VerifyOtpAndResetPassword from './pages/login/verfifyotp';
import UpdateApplication from './pages/application/UpdateApplication';
import ChangePassword from './pages/changepassword/ChangePassword';

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/" element = {<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path ='/verify-otp' element = {<VerifyOtpAndResetPassword/>}/>

        {/* {User Routes} */}
        <Route path ="/dashboard" element = {<Dashboard/>} />
        <Route path = '/pet_details/:id' element ={<PetDetails/>}/>
        <Route path ='/listings' element = {<AllPets/>}/>
        <Route path = '/application/:id' element = {<ApplicationPage/>}/>
        <Route path ='/profile' element={<ProfilePage/>}/>
        <Route path='/search' element={<SearchComponent/>} />
        <Route path='/pets-category' element={<CategoryPets/>} />
        <Route path ='/mail' element ={<Mail/>}/>
        <Route path ='/donation' element={<DonationForm/>} />
        <Route path = '/update_application/:id' element={<UpdateApplication/>}/>
        <Route path = '/change-password' element = {<ChangePassword/>}/>
        {/* {Admin Routes} */}
        <Route path = "/admin/addlisting" element = {<AdminAddListings/>}/>
        <Route path = "/admin/dashboard" element = {<AdminDashboard/>}/>
        <Route path = "/admin/updatelisting/:id" element = {<UpdateListing/>}/>
        <Route path = '/admin/home' element = {<AdminHomepage/>}/>
        <Route path = '/admin/application' element={<AdminApplication/>}/>
        <Route path = '/admin/applicant-detail/:id' element ={<ApplicationDetails/>}/>
        <Route path ='/admin/schedules' element={<MeetList/>} />
      </Routes>
    </Router>
  );
}

export default App;
