import { TextField, Box, Typography, Button } from "@mui/material";
import '@fontsource/roboto/300.css';
import { useState } from 'react'; 
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import ButtonAppBar from "./Navbar";

const USER_REGEX = /^(?=.{8,20}$)/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function Register() {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    userName: '',
    password: '',
    passwordMatch: '',
    validUser: false,
    validPass: false,
    isMatching: false
  })

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'userName') {
      setUserInput({
        ...userInput,
        userName: value,
        validUser: USER_REGEX.test(value)
      });
    } else if (name === 'password') {
      setUserInput({
        ...userInput,
        password: value,
        validPass: PWD_REGEX.test(value)
      })
    } else {
      setUserInput({
        ...userInput,
        passwordMatch: value,
        isMatching: userInput.password === value
      })
    }
  }

  function handleSuccess(msg) {
    toast.success(msg, {
      position: "bottom-right"
    });
  };

  function handleError(msg) {
    toast.error(msg, {
      position: "top-left"
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(userInput)
   
    try {
      const { data } = await axios.post(
        "http://localhost:5000/register",
        {
          userName: userInput.userName,
          password: userInput.password
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 2000);  
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: 1/2,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 5,
          marginBottom: 10,
          padding: 3,
          border: 2,
          borderColor: "primary.main",
          borderRadius: 5
        }}
      >
      <form onSubmit={handleSubmit}>
        <Typography 
          variant="h2"
          margin={5}
        >
          Register:
        </Typography>
        <Typography sx={{marginBottom: 4}}>
          *Username is 8-20 characters long<br/>*Password is at least 8 characters long and has at least 1 letter and number
        </Typography>
        <TextField 
          label='Username:'
          name='userName'
          autoComplete='false'
          onChange={e => handleChange(e)}
          required
          variant="outlined"
          fullWidth
          sx={{mb : 3}}
          value={userInput.userName}
        />
        <TextField 
          label='Password:'
          name='password'
          onChange={e => handleChange(e)}
          required
          type="password"
          variant="outlined"
          fullWidth
          sx={{mb : 3}}
          value={userInput.password}
        />
        <TextField 
          label='Confirm Password:'
          name='passwordMatch'
          onChange={e => handleChange(e)}
          required
          type="password"
          variant="outlined"
          fullWidth
          sx={{mb : 3}}
          value={userInput.passwordMatch}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!userInput.validUser || !userInput.validPass || !userInput.isMatching}
        >
          Register
        </Button>
      </form>
      <Typography>
        Have an Account? <Link to='/login'>Login</Link>
      </Typography>

      </Box>
      <ToastContainer />
    </>
  )
}