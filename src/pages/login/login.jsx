import { Button, Grid } from "@mui/material";

import React, { useContext } from "react";

import AuthContext from "../../context/AuthContext";

import "./login.scss"

const Login = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="login-container">  
    <Grid 
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
    >
      <h2>Login</h2>
      <div className="loginForm">
        <form onSubmit={loginUser}>
          <Grid item>
            <input type="email" name="email" placeholder="Enter Email" />
          </Grid>
          <Grid item>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          </Grid>
          <Button
          variant="contained"
          fullWidth={true}
          type="submit"
          style={{paddingTop: '2px',paddingBottom: '2px', marginTop: '5px'}}
        >
          Sign In
        </Button>
        </form>
      </div>
    </Grid>
    </div>
  )
}

export default Login;