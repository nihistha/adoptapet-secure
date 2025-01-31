
import {render, fireEvent, waitFor, screen} from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Login from './Login'
import {toast} from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'; 
// Mock the API.JS file
jest.mock('../../apis/Api')
 
// List of test cases
describe('Login Component', ()=>{
 
    // Clearing all mock
 
    afterEach(() =>{
        jest.clearAllMocks()
    })
    const renderLoginComponent = () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
    };
 
    // Test 1
    it('Should display error toast message on login fail with incorrect password', async ()=>{
        // Rendering the login component
        render(<MemoryRouter>
            <Login/>
          </MemoryRouter>);
 
        // Mocking the API response for loginUserAPI
        const mockResponse = {
            data: {
                success: false,
                message: 'Incorrect Password'
            }
        };
        // config mock reponse
        loginUserApi.mockResolvedValue(mockResponse)
 
        // config toast.error
        toast.error = jest.fn();
 
        // Finding emial, password, and login button from screen
        const email = await screen.findByPlaceholderText('Email')
        const password = await screen.findByPlaceholderText('Password')
        const rememberMe =await screen.findByLabelText('Remember me')
        const loginBtn = screen.getByText('Login')
 
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
         // Log the initial state of the checkbox
         console.log('Initial rememberMe checked:', rememberMe.checked);
        
         await userEvent.click(rememberMe);
         
         // Log the state after clicking
         console.log('After click rememberMe checked:', rememberMe.checked);
 
         await userEvent.click(loginBtn);
 
        // we have finished the process above
 
        // Next is, Ensuring all the above test are working fine!
        await waitFor(()=>{
            // Expect API call with data, we entered/ change
            expect(loginUserApi).toHaveBeenCalledWith({email: 'test@gmail.com', password:'test123',rememberMe :true})
 
            // check error.toast is called or not
            expect(toast.error).toHaveBeenCalledWith('Incorrect Password')
        })
    })

      // Test 3: Empty form submission
    //   it('Should show email validation error', async () => {
    //     const emailInput = screen.getByPlaceholderText('Email');
    //     const loginButton = screen.getByText('Login');
    
    //     fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        
    //     await userEvent.click(loginButton);
    
    //     expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    //   });
    it('Should have a forgot password link', async () => {
        renderLoginComponent();

        // Debug: Log the entire rendered component
        console.log(screen.debug());

        // Try to find the link by text content
        const forgotPasswordLink = await screen.findByText('Forgot password?', { exact: false });
        expect(forgotPasswordLink).toBeInTheDocument();

        // Check if it's an anchor tag
        expect(forgotPasswordLink.tagName.toLowerCase()).toBe('a');

        // Check the href attribute
        expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
    });
    
    it('Should show email validation error', async () => {
        renderLoginComponent();
    
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalidemail' } });
        fireEvent.click(screen.getByText('Login'));
    
        await waitFor(() => {
          expect(screen.getByText('Email is invalid')).toBeInTheDocument();
        });
      });

      it('Should show password validation error', async () => {
        renderLoginComponent();
    
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByText('Login'));
    
        await waitFor(() => {
          expect(screen.getByText('Password is empty')).toBeInTheDocument();
        });
      });

      it('Should have a link to register page', () => {
        renderLoginComponent();
        const registerLink = screen.getByText('Register');
        expect(registerLink).toBeInTheDocument();
        expect(registerLink.tagName.toLowerCase()).toBe('a');
        expect(registerLink).toHaveAttribute('href', '../register');
      });
})
 
 
 
 
 
 