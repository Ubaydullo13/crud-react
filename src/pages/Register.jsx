import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  function isValidEmail(email) {
    // Basic email validation using a regular expression
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  function validate() {
    if (!username.current.value) {
      alert("Please enter your username");
      setIsLoading(false)
    }
    if (!email.current.value) {
      alert("Please enter your email");
      email.current.focus();
      setIsLoading(false)
      return false;
    } else if (!isValidEmail(email.current.value)) {
      alert("Please enter a valid email");
      setIsLoading(false)
      email.current.focus();
      return false;
    }
    if (!password.current.value) {
      alert("Please enter your password");
      password.current.focus();
      setIsLoading(false)
      return false;
    } else if (password.current.value < 4) {
      alert("Password must be at least 4 characters long");
      password.current.focus();
      setIsLoading(false)
      return false;
    }
    if (!confirmPassword.current.value) {
      alert("Please confirm your password");
      confirmPassword.current.focus();
      setIsLoading(false)
      return false;
    } else if (password.current.value !== confirmPassword.current.value) {
      alert("Passwords do not match");
      confirmPassword.current.focus();
      confirmPassword.current.value = "";
      setIsLoading(false)
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
        email: email.current.value,
        password: password.current.value,
      };
      fetch(`${import.meta.env.VITE_API}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          if (data.message === "Failed! Username is already in use!") {
            alert("Username is already in use!");
            username.current.focus();
          }
          if (data.message === "Failed! Email is already in use!") {
            alert("Email is already in use!");
            email.current.focus();
          }
          if (data.message === "User registered successfully!") {
            alert("User registered successfully!");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }

  return (
    <Container>
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign={"center"}
          mt={10}
          gutterBottom
        >
          Registration
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
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: "1rem" }}
            inputRef={email}
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
          <TextField
            id="outlined-basic"
            type="password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            sx={{ mb: "1.5rem" }}
            inputRef={confirmPassword}
          />
          <Button
            disabled={isLoading ? true : false}
            onClick={handleClick}
            variant="contained"
            fullWidth
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
          <Typography
            variant="subtitle1"
            textAlign={"center"}
            mt={2}
            gutterBottom
          >
            Have an account? {" "}
            <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
