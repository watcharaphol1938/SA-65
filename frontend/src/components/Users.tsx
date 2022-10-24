import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { UsersInterface } from "../models/IUser";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Users() {

  // ประกาศตัวแปร users และ setUsers สำหรับเก็บค่าจาก UsersInterface
  // setUsers เป็นตัว set ค่าจาก UsersInterface เข้าไปที่ตัวแปร users
 const [users, setUsers] = React.useState<UsersInterface[]>([]);

 const getUsers = async () => {
   const apiUrl = "http://localhost:8080/users";
   const requestOptions = {
     method: "GET", 
     headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`    // login เพื่อเอาข้อมูลให้หลังบ้าน check เป็นการระบุตัวตน
    },
   };

   // หลังบ้าน check token และ ข้อมูล
   fetch(apiUrl, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       console.log(res);
       if (res.data) {
         setUsers(res.data);  // ข้อมูลถูกต้อง หลังบ้านจะส่งข้อมูลมาตามที่ขอ
       }
       else{
        console.log(res.error);  // ข้อมูลไม่ถูกต้อง จะแสดงค่า error ที่ console เช่น token หรือ ข้อมูลไม่ถูกต้อง ก็จะแสดงค่าของข้อมูลตัวนั้น
       }
     });
 };
 
 const columns: GridColDef[] = [
   { field: "ID", headerName: "ID", width: 96, },
   { field: "Prefix ID", headerName: "Prefix", width: 96, valueGetter: (params) => { return params.row.NamePrefix.PrefixName } },
   { field: "FirstName", headerName: "First name", width: 96 },
   { field: "LastName", headerName: "Last name", width: 96 },
   { field: "Email", headerName: "Email", width: 96 },
   { field: "Password", headerName: "Password", width: 96 },
   { field: "Address", headerName: "Address", width: 96 },
   { field: "BirthDay", headerName: "BirthDay", width: 96 },
   { field: "Gender ID", headerName: "Gender", width: 96, valueGetter: (params) => { return params.row.Gender.GenderName } },
   { field: "Identification", headerName: "Identification", width: 96 },
   { field: "Mobile", headerName: "Mobile", width: 96 },
   { field: "Province ID", headerName: "Province", width: 96, valueGetter: (params) => { return params.row.Province.ProvinceName } },
   { field: "Employee", headerName: "Employee", width: 96, valueGetter: (params) => { return params.row.Employee.First_Name + " " + params.row.Employee.Last_Name} },
 ];
 
 // เมื่อมีการ log out ฟังก์ชันนี้จะทำการ clear token ใน local storage และเปลี่ยน path ไปที่หน้า log in
 const logOut = () => {
  localStorage.clear();
  window.location.href = "/login";
}

 useEffect(() => {
   getUsers();
 }, []);

 return (
   <div>
     <Container maxWidth="lg">
       <Box
         display="flex"
         sx={{
           marginTop: 2,
         }}
       >
         <Box flexGrow={1}>
           <Typography
             component="h2"
             variant="h6"
             color="primary"
             gutterBottom
           >
             Users
           </Typography>
         </Box>
         <Box>
           <Button
              variant="outlined"
              color="error"
              onClick={logOut}
              sx={{ marginX: 1 }}
          >
            Log out
          </Button>
         </Box>
       </Box>
       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>
         <DataGrid
           rows={users}
           getRowId={(row) => row.ID}
           columns={columns}
           pageSize={5}
           rowsPerPageOptions={[5]}
         />
       </div>
     </Container>
   </div>
 );
}
export default Users;