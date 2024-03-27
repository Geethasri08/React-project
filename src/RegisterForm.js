import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import "./Register.css";
import { useAuth } from './AuthContext'; 

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const isPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/i.test(password);

function Register() {
  const navigate = useNavigate();
  const authContext = useAuth(); 

  const [showPassword, setShowPassword] = React.useState(false);
  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const handleUsername = () => {
    if (!usernameInput || usernameInput.length < 5 || usernameInput.length > 20) {
      setUsernameError(true);
      return;
    }
    setUsernameError(false);
  };
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };
  const handlePassword = () => {
    if (!isPassword(passwordInput)) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(null);

    if (usernameError || !usernameInput) {
      setFormValid('Username is between 5-15 characters long.');
      return;
    }

    if (emailError || !emailInput) {
      setFormValid('Email is invalid.');
      return;
    }
    if (passwordError || !passwordInput) {
      setFormValid(
        'Password must be a combination of lowercase, uppercase, numbers, and special characters to a maximum of 8.'
      );
      return;
    }
    setFormValid(null);
    setSuccess('Registered Successfully');

    console.log('Name : ' + usernameInput);
    console.log('Email : ' + emailInput);
    console.log('Password : ' + passwordInput);
    authContext.register({ username: usernameInput, email: emailInput });
    navigate(`/`);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='register'>
      <p>
        <TextField
          id='standard-basic'
          error={usernameError}
          label='Username'
          value={usernameInput}
          onChange={(event) => setUsernameInput(event.target.value)}
          onBlur={handleUsername}
          variant='standard'
          fullWidth
          size='small'
        />
      </p>
      <p>
        <TextField
          id='standard-basic'
          error={emailError}
          label='Email'
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
          onBlur={handleEmail}
          variant='standard'
          fullWidth
          size='small'
        />
      </p>
      <p>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
          <InputLabel error={passwordError} htmlFor='standard-adornment-password'>
            Password
          </InputLabel>
          <Input
            fullWidth
            error={passwordError}
            id='standard-adornment-password'
            type={showPassword ? 'text' : 'password'}
            value={passwordInput}
            onBlur={handlePassword}
            onChange={(event) => setPasswordInput(event.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </p>
      <p>
        <Button onClick={handleSubmit} variant='contained' startIcon={<LoginIcon />}>
          Register
        </Button>
      </p>
      <p>
        Don't have an account? <Link to='/Login'>Login</Link>
      </p>
      <p>{formValid && <Alert severity='error'>{formValid}</Alert>}</p>
      <p>{success && <Alert severity='success'>{success}</Alert>}</p>
    </div>
  );
}

export default Register;