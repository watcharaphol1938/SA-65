
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { error } from "console";
import React from "react";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { useState } from "react";
import { LoginInterface } from "../models/ILogin";



export default function LogIn() {

  // ประกาศตัวแปร login และ setlogin สำหรับเก็บค่า email และ password
  // setlogin เป็นตัว set ค่า email และ password เข้าไปที่ตัวแปร login
  const [login, setLogin] = useState<Partial<LoginInterface>>({
    Email: "", Password: ""
  });


  // ควบคุม pop up snackbar
  // success เป็น true จะแสดง pop up กรณีทำงานสำเร็จ
  // error เป็น true จะแสดง pop up กรณีทำงานไม่สำเร็จ
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  
  // handleclose จะเป็นตัวจัดการ pop up ให้หยุดการทำงานหลังจากที่แสดง pop up ในแต่ละกรณี 
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    if (success === true) {
      window.location.href = "/create"; // เมื่อ success เป็น true จะทำการเปลี่ยน path ไปที่หน้า create
    }
    setSuccess(false);
    setError(false);
  };


  // setlogin ทำการเก็บ email และ password จาก textfield ไปเก็บที่ตัวแปร login
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof login;
    const { value } = event.target;
    setLogin({ ...login, [id]: value });
  };


  // ที่หน้า Login
  // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
  // หน้าบ้านจะแนบ header(content-type) และ body(app-json) เพื่อติดต่อไปยังหลังงบ้านที่ method POST
  function Submit() {
    const apiUrl = "http://localhost:8080/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    };
    
    // หลังบ้านรับ request มา
    // หลังบ้าน check data
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true); // ข้อมูลถูกต้อง แสดง pop up การทำงานสำเร็จ
          localStorage.setItem("token", res.data.token);  // setItem จะ set ค่า token ไปที่ Local storage
          localStorage.setItem("id", res.data.id);    // setItem จะ set ค่า id ไปที่ Local storage
          window.location.href = "/create";   // เปลี่ยน path ไปที่หน้า create
        } else {
          setError(true); // ถ้า login ไม่สำเร็จ จะแสดง pop up กรณีทำงานไม่สำเร็จ
        }
      });
  }

  console.log(login);   // แสดงข้อมูลการ Login

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          เข้าสู่ระบบสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          เข้าสู่ระบบไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Grid container spacing={2} sx={{ marginTop: 4, paddingX: 7 }}>
        <Grid item xs={2}>
          <AccountCircleSharpIcon fontSize="large" color="primary" />
        </Grid>
        <Grid item xs={10}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Sign in
          </Typography>
        </Grid>
      </Grid>
      <form>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3}><p>Username</p></Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email Address"
              name="Email"
              autoComplete="email"
              autoFocus
              value={login.Email || ""}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3}><p>Password</p></Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="Password"
              autoComplete="current-password"
              value={login.Password || ""}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </form>
      <Box display="flex" sx={{ marginTop: 2, paddingX: 14 }}>
        <Box>
          <Button
            onClick={Submit}
            variant="contained"
            color="primary"
          >
            Log in
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={6}><p>email1 : KokAC19@gmail.com</p></Grid>
          <Grid item xs={6}><p>password1 : ACBluewave19</p></Grid>
          <Grid item xs={6}><p>email2 : ArmST9@gmail.com</p></Grid>
          <Grid item xs={6}><p>password2 : STBluewave9</p></Grid>
        </Grid>
    </Container>
  );
}