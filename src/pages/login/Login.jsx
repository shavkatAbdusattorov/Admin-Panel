import React, { useState } from 'react'
import axios from 'axios'
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../utilities/Token';

const Login = () => {

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  async function Login() {
    const newObj = {
      email: email,
      password: password,
    };
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", newObj);
      saveToken(data.accessToken);

      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <div className='m-auto flex flex-col gap-[40px] w-[371px]'>
      <div className='flex flex-col gap-[24px]'>
        <h1 className='text-black dark:text-white text-[36px] font-medium leading-[30px] tracking-[1.44px]'>Log in to Exclusive</h1>
        <p className='text-black dark:text-white text-[16px] leading-[24px]'>Enter your details below</p>
      </div>
      <div className='flex flex-col gap-[20px]'>
        <TextField value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email or phone number" id="outlined-basic" label="Email or phone number" variant="outlined" size='medium' sx={{width: "371px", height: "56px"}} />
        <FormControl size='medium' sx={{ width: "371px", height: "56px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            value={password} onChange={(event) => setPassword(event.target.value)}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
      <div className='flex justify-between items-center'>
        <button onClick={() => Login()} className='w-[143px] h-[56px] rounded-[4px] bg-[#DB4444] text-[#FAFAFA] text-[16px] font-medium leading-[24px]'>Log In</button>
        <span className='text-[#DB4444] text-[16px] leading-[24px]'>Forget Password?</span>
      </div>
    </div>
    </>
  )
}

export default Login