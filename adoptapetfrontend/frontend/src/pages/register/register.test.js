
import {render, fireEvent, waitFor, screen} from "@testing-library/react";
import {toast} from "react-toastify";
import {registerUserApi} from '../../apis/Api'
import Register from "./Register";
import '@testing-library/jest-dom';

// Mock the API.JS file
jest.mock('../../apis/Api')
jest.mock('react-toastify', () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn()
    }
  }));

describe('Register Component',()=>{
     // Clearing all mock
 
     const renderregisterComponent = () => {
        render(
            <Register/>
        );
    };
     afterEach(() =>{
        jest.clearAllMocks()
    })

    it('Should display success toast message on register', async ()=>{
        // Rendering the login component
        render(<Register/>);
 
        // Mocking the API response for loginUserAPI
        const mockResponse = {
            data: {
                success: true,
                message: 'User Created Successfully'
            }
        };
        // config mock reponse
        registerUserApi.mockResolvedValue(mockResponse)
 
        // config toast.error
        toast.error = jest.fn();
 
        // Finding emial, password, and login button from screen
        const fullname = await screen.findByPlaceholderText('Full Name')
        const phonenumber = await screen.findByPlaceholderText('Phone Number')
        const confirmPassword = await screen.findByPlaceholderText('Confirm Passwprd')
        const email = await screen.findByPlaceholderText('Email')
        const password = await screen.findByPlaceholderText('Password')
       
const submitBtn = screen.getByRole('button', { name: /sign up/i })
        // Simulating Filling input logically
        fireEvent.change(email,{
            target: {
                value: 'test@gmail.com'
            }
        })
 
        fireEvent.change(password,{
            target: {
                value: 'test123'
            }
        })
        fireEvent.change(fullname,{
            target: {
                value: 'Nihira'
            }
        })
        fireEvent.change(phonenumber,{
            target: {
                value: "983748374"
            }
        })
        fireEvent.change(confirmPassword,{
            target: {
                value: 'test123'
            }
        })

        fireEvent.click(submitBtn)
 
        // we have finished the process above
 
        // Next is, Ensuring all the above test are working fine!
        await waitFor(() => {
            expect(registerUserApi).toHaveBeenCalledWith({
                email: 'test@gmail.com',
                password: 'test123',
                fullname: 'Nihira',
                phonenumber: "983748374"
            });
        
            // Also, it seems you're expecting a success message, so let's change this to toast.success
            expect(toast.success).toHaveBeenCalledWith('User Created Successfully');
        });
    });

    it('Should display error toast message on failed registration', async () => {
        renderregisterComponent();
        const mockResponse = {
          data: {
            success: false,
            message: 'Registration failed'
          }
        };
        registerUserApi.mockResolvedValue(mockResponse);
    
        fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Nihira' } });
        fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '983748374' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Passwprd'), { target: { value: 'test123' } });
    
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
        await waitFor(() => {
          expect(registerUserApi).toHaveBeenCalledWith({
            fullname: 'Nihira',
            phonenumber: '983748374',
            email: 'test@gmail.com',
            password: 'test123'
          });
          expect(toast.error).toHaveBeenCalledWith('Registration failed');
        });
      });
      
    it('Should show validation errors for empty fields', async () => {
        renderregisterComponent();
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
        await waitFor(() => {
          expect(screen.getByText('Please exter firstname')).toBeInTheDocument();
          expect(screen.getByText('Please exter lastname')).toBeInTheDocument();
          expect(screen.getByText('Please exter email')).toBeInTheDocument();
          expect(screen.getByText('Please exter password')).toBeInTheDocument();
          expect(screen.getByText('Please Confirm password')).toBeInTheDocument();
        });
      });
      it('Should have a link to login page', () => {
        renderregisterComponent();
        const loginLink = screen.getByText('Login');
        expect(loginLink).toBeInTheDocument();
        expect(loginLink.tagName.toLowerCase()).toBe('a');
        expect(loginLink).toHaveAttribute('href', '../login');
      });

      it('Should show password mismatch error', async () => {
        renderregisterComponent();
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Passwprd'), { target: { value: 'password321' } });
    
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
        await waitFor(() => {
          expect(screen.getByText('Password does not match')).toBeInTheDocument();
        });
      });
})