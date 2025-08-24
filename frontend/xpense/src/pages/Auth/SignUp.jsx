import React, { use, useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePictureSelector from '../../components/inputs/ProfilePictureSelector';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/userContext'

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const[fullName, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const[error, setError] = useState(null);

  const updateUser = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async(e) => {
     e.preventDefault();

     let profileImageUrl = ""

     if(!fullName) {
      setError("Please enter your full name");
      return;
     }

     if(!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
     }

     if(!password) {
      setError("Please enter your password");
      return;
     }

     setError("")

     //SignUp api call

     try{

      //upload profile image if available
      if(profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const respose =await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = respose.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
     } catch(error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
     }

  }
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Get started today</p>

        <form onSubmit={handleSignUp}>

          <ProfilePictureSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder= "John" 
            type="text"
            />

            <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder= "john@example.com" 
            type="email"
            />

            <div className='col-span-2'>
              <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder= "Min 8 characters" 
              type="password"
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>

          <p  className='text-[13px] text-black mt-3'>
            Already have an account?{" "}
            <Link className='text-[15px] text-purple-500' to="/login">
            Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp