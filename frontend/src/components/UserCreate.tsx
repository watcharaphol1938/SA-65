import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import { PrefixesInterface } from "../models/IPrefixes";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { UsersInterface } from "../models/IUser";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Icon } from "@mui/material";
import { EmployeesInterface } from "../models/IEmployee";
import { GendersInterface } from "../models/IGender";
import { ProvincesInterface } from "../models/IProvince";
import Users from "./Users";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserCreate() {

  // ประกาศตัวแปร prefixes และ setPrefixes สำหรับเก็บค่าจาก PrefixesInterface
  // setPrefixes เป็นตัว set ค่าจาก PrefixesInterface เข้าไปที่ตัวแปร prefixes
  const [prefixes, setPrefixes] = React.useState<PrefixesInterface[]>([])
  const [employee, setEmployee] = React.useState<Partial<EmployeesInterface>>({
    First_Name: "", Last_Name: ""
  })
  const [genders, setGenders] = React.useState<GendersInterface[]>([])
  const [provinces, setProvinces] = React.useState<ProvincesInterface[]>([])

  // const [date, setDate] = React.useState<Date | null>(null);

  // setUser จะเป็นตัว check ข้อมูลให้ตัวแปร user ว่าได้รับข้อมูลที่ต้องการมาแล้วหรือยัง
  const [user, setUser] = React.useState<Partial<UsersInterface>>({
    ProvinceID: 0, NamePrefixID: 0, EmployeeID: 0, GenderID: 0, BirthDay: new Date(),
    FirstName: "", LastName: "", Email: "", Password: "", Identification: "", Mobile: "",
    Address: "",
  });
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    if (success === true) {
      window.location.href = "/user";
    }
    setSuccess(false);
    setError(false);
  };

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  // setUser ทำการเก็บข้อมูลจาก combobox ไปเก็บที่ตัวแปร user
  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof UserCreate;
    const { value } = event.target;
    setUser({ ...user, [name]: value });
  }

  // setUser ทำการเก็บข้อมูลจาก textfield ไปเก็บที่ตัวแปร user
  const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
    const id = event.target.id as keyof typeof UserCreate;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
  };

  // หน้า UserCreate
  // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
  // หน้าบ้านจะแนบ header(content-type) เพื่อติดต่อไปยังหลังงบ้านที่ method GET
  const getPrefix = async () => {
    const apiUrl = "http://localhost:8080/nameprefixes";
    const requestOptions = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      }
    };

    // หลังบ้านรับ request มา
    // หลังบ้าน check data
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPrefixes(res.data);  // ข้อมูลถูกต้อง setPrefixes จะ set ค่าไปที่ตัวแปร prefixes
        } else {
          console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
        }
      });
  }


  // หน้า UserCreate
  // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
  // หน้าบ้านจะแนบ header(content-type) เพื่อติดต่อไปยังหลังงบ้านที่ method GET
  const getEmployee = async () => {
    const apiUrl = `http://localhost:8080/employee/${localStorage.getItem("id")}`;
    const requestOptions = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      }
    };


    // หลังบ้านรับ request มา
    // หลังบ้าน check data
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setEmployee(res.data);   // ข้อมูลถูกต้อง setRoles จะ set ค่าไปที่ตัวแปร roles
        } else {
          console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
        }
      });
  }

  const getGender = async () => {
    const apiUrl = "http://localhost:8080/genders";
    const requestOptions = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      }
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGenders(res.data);
        } else {
          console.log(res.error);
        }
      });
  }

  const getProvince = async () => {
    const apiUrl = "http://localhost:8080/provinces";
    const requestOptions = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      }
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setProvinces(res.data);
        } else {
          console.log(res.error);
        }
      });
  }

  function submit() {

    // ตัวแปร data เป็นตัวรับข้อมูลจากตัวแปร user เพื่อส่งไปหลังบ้าน
    let data = {
      FirstName: user.FirstName ?? "",
      LastName: user.LastName ?? "",
      Email: user.Email ?? "",
      Password: user.Password ?? "",
      Identification: user.Identification ?? "",
      Mobile: user.Mobile ?? "",
      Address: user.Address ?? "",
      BirthDay: user.BirthDay ?? new Date(),
      NamePrefixID: user.NamePrefixID,
      ProvinceID: user.ProvinceID,
      GenderID: user.GenderID,
      EmployeeID: employee.ID,
    };

    // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
    // หน้าบ้านจะแนบ header(content-type) และ body(app-json) เพื่อติดต่อไปยังหลังงบ้านที่ method POST
    const apiUrl = "http://localhost:8080/users";
    const requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      },
      body: JSON.stringify(data),
    };


    // หลังบ้านรับ request มา
    // หลังบ้าน check data
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);    // ข้อมูลถูกต้อง บันทึกข้อมูลที่หลังบ้านและแสดงข้อมูลที่ console
          setSuccess(true);       // แสดง pop up การทำงานสำเร็จ
          // loginRegisted();      // เป็นการ login เข้าระบบแบบ auto
        } else {
          setError(true);       // ข้อมูลไม่ถูกต้อง แสดง pop up การทำงานไม่สำเร็จ
          console.log(res.error); // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console
        }
      });
  }

  // const loginRegisted = () => {

  //   // ตัวแปร payload จะรับข้อมูล email และ password จาก textfield ที่ลงทะเบียน
  //   let payload = {
  //     Email: user.Email ?? "",
  //     Password: user.Password ?? "",
  //   }

  // // ที่หน้า Login
  // // หน้าบ้าน จะใช้ JSON สื่อสารกันกับ หลังบ้าน
  // // หน้าบ้านจะแนบ header(content-type) และ body(app-json) เพื่อติดต่อไปยังหลังงบ้านที่ method POST
  //   const apiUrl = "http://localhost:8080/login";
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   };

  //   fetch(apiUrl, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         localStorage.setItem("token", res.data.token);   // setItem จะ set ค่า token ไปที่ Local storage
  //         localStorage.setItem("id", res.data.id);  // setItem จะ set ค่า id ไปที่ Local storage
  //       } else {
  //         console.log(res.error);
  //       }
  //     });
  // }

  // เรียกใช้ฟังก์ชันเหล่านี้ ขณะกำลังสร้าง user
  useEffect(() => {
    getPrefix();
    getEmployee();
    getGender();
    getProvince();
  }, []);

  console.log(user);

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box display="flex" sx={{ marginTop: 2, }}>
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Grid container spacing={2} sx={{ paddingX: 20 }}>
              <Grid item xs={3} >
                <AccountCircleSharpIcon fontSize="large" color="primary" />
              </Grid>
              <Grid item xs={9}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Create User
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>Prefix</p></Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Prefix</InputLabel>
              <Select
                inputProps={{
                  name: "NamePrefixID"
                }}
                value={user.NamePrefixID}
                onChange={handleSelectChange}
              >
                <MenuItem value={0}></MenuItem>
                {prefixes.map((item: PrefixesInterface) => (
                  <MenuItem key={item.ID} value={item.ID}>{item.PrefixName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>First Name</p></Grid>
          <Grid item xs={3}><TextField id="FirstName" value={user.FirstName} onChange={handleInputChange} label="First Name" variant="outlined" /></Grid>
          <Grid item xs={2} sx={{ textAlign: 'right' }}><p>Last Name</p></Grid>
          <Grid item xs={3}><TextField id="LastName" value={user.LastName} onChange={handleInputChange} label="Last Name" variant="outlined" /></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>Date of Birth</p></Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={user.BirthDay}
                  onChange={(newValue) => {
                    setUser({ ...user, BirthDay: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>Identification Number</p></Grid>
          <Grid item xs={3}><TextField id="Identification" value={user.Identification} onChange={handleInputChange} label="Identification Number" variant="outlined" /></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>Email</p></Grid>
          <Grid item xs={3}><TextField id="Email" value={user.Email} onChange={handleInputChange} label="Email" variant="outlined" /></Grid>
          <Grid item xs={2} sx={{ textAlign: 'right' }}><p>Password</p></Grid>
          <Grid item xs={3}><TextField id="Password" value={user.Password} type="password" onChange={handleInputChange} label="Password" variant="outlined" /></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>Gender</p></Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select inputProps={{ name: "GenderID" }} value={user.GenderID} onChange={handleSelectChange}>
                <MenuItem value={0}></MenuItem>
                {genders.map((item: GendersInterface) => (
                  <MenuItem key={item.ID} value={item.ID}>{item.GenderName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>Mobile</p></Grid>
          <Grid item xs={3}><TextField id="Mobile" value={user.Mobile} onChange={handleInputChange} label="Mobile" variant="outlined" /></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>Address</p></Grid>
          <Grid item xs={3}><TextField id="Address" value={user.Address} onChange={handleInputChange} label="Address" variant="outlined" /></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>Province</p></Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Province</InputLabel>
              <Select inputProps={{ name: "ProvinceID" }} value={user.ProvinceID} onChange={handleSelectChange}>
                <MenuItem value={0}></MenuItem>
                {provinces.map((item: ProvincesInterface) => (
                  <MenuItem key={item.ID} value={item.ID}>{item.ProvinceName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3} sx={{ textAlign: 'right' }}><p>Employee</p></Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              {/* <InputLabel>Employee</InputLabel> */}
              <TextField disabled label="Employee" value={`${employee?.First_Name}  ${employee?.Last_Name}`}></TextField>
            </FormControl>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={5} sx={{ textAlign: 'right', marginTop: 2, paddingX: 4, paddingY: 1, marginBottom: 2 }}>
            <Button
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
export default UserCreate;