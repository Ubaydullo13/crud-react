import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();

function validate() {
if(!username.current.value){
  alert("Please enter a username");
  username.current.focus();
  setIsLoading(false);
  return false;
}
if(!password.current.value){
  alert("Please enter a password");
  password.current.focus();
  setIsLoading(false);
  return false;
}

  return true;
}
  

  function handleClick(e) {
    e.preventDefault();
    setIsLoading(true);
    const isValid = validate();

    if (isValid) {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      fetch(`${import.meta.env.VITE_API}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
          .then(res => res.json())
          .then(data => {
            setIsLoading(false);

            if(data.message == "Invalid Password!"){
              alert(data.message)
            }
            if(data.message == "User Not found."){
              alert(data.message)
            }
            if(data.id) {
              localStorage.setItem("token", data.accessToken);
               navigate("/");
            }
            
 
          })
          .catch(err => {
            console.error(err);
            setIsLoading(false);
          })
          
    }
  }

  return (
    <Container>
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign={"center"}
          mt={15}
          gutterBottom
        >
          Login
        </Typography>
        <Box sx={{ mx: "auto", width: 600 }}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ mb: "1rem" }}
            inputRef={username}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            sx={{ mb: "1rem" }}
            inputRef={password}
          />
          
          <Button
            disabled={isLoading ? true : false}
            onClick={handleClick}
            variant="contained"
            fullWidth
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>

          <Typography
            variant="subtitle1"
            textAlign={"center"}
            mt={2}
            gutterBottom
          >
            Don`t have an account?{" "}
            <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;