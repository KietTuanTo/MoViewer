import { TextField, Box, Typography, Button } from "@mui/material";
import '@fontsource/roboto/300.css';
import { useState } from 'react'; 
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: '',
    password: ''
  });
  
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({
      ...userInput,
      [name]: value 
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/login",
        {
          ...userInput
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
          Login:
        </Typography>
        <TextField 
          label='Username:'
          name='userName'
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
          sx={{mb : 3}}
          value={userInput.userName}
        />
        <TextField 
          label='Password:'
          name='password'
          onChange={handleChange}
          required
          type="password"
          variant="outlined"
          fullWidth
          sx={{mb : 3}}
          value={userInput.password}
        />
        <Button
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </form>
      <Typography>
        Need an Account? <Link to='/register'>Register</Link>
      </Typography>
      </Box>
      <ToastContainer />
    </>
  )
}