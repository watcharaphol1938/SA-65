import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { Container } from "@mui/system";

export default function Home() {
    const token: string | null = localStorage.getItem("token"); // ตัวแปร token จะดึงค่า token ที่อยู่ใน local storage
    
    // เมื่อมีการ log out ฟังก์ชันนี้จะทำการ clear token ใน local storage และเปลี่ยน path ไปที่หน้า log in
    const logOut = () => {
        localStorage.clear();
        window.location.href = "/login";
    }
    return (
        <Container maxWidth={"md"}>
            <Paper>
                <Box display="flex" sx={{ marginTop: 10, }}>
                    <Typography component="h2" variant="h4" color="primary" sx={{ marginTop: 2, marginBottom: 2, marginLeft: 39 }}>
                        ระบบสมัครสมาชิก
                    </Typography>
                </Box>
                <Divider />
                <Box>
                    <Box sx={{ paddingX: 2, paddingY: 1, }}>
                        <Typography component="h2" variant="h5" color="primary" sx={{ marginTop: 2 }}>
                            Requirement(ระบบสมัครสมาชิก)
                        </Typography>
                        <Typography component="h2" variant="h6" color="action" sx={{ paddingX: 5 }}>
                        ระบบสมัครสมาชิกการจองใช้ห้องของบริษัท Room Booking เป็นระบบที่ผู้ใช้บริการ
                        </Typography>
                        <Typography component="h2" variant="h6" color="action">
                        สามารถสมัครเป็นสมาชิกของระบบสำหรับการจองใช้ห้องเรียนทฤษฎี ห้องเรียนปฏิบัติการและห้องสมุด โดยการสมัครสมาชิกจะมีพนักงานระบบเป็นผู้ทำการบักทึกข้อมูลของผู้ใช้บริการเช่น คำนำหน้าชื่อ ชื่อ-สกุล วันเดือนปีเกิด เลขประจำตัวประชาชน อีเมล รหัสผ่าน เพศ หมายเลขโทรศัพท์ ที่อยู่ (เลขที่บ้าน, หมู่บ้าน, ตำบล, อำเภอ, จังหวัด) และพนักงานบันทึกข้อมูล เป็นต้น 
                        </Typography>
                        <Typography component="h2" variant="h6" color="action" sx={{ paddingX: 5 }}>
                        นอกจากนี้ ผู้ใช้บริการซึ่งเป็นสมาชิกสามารถเลือกใช้บริการระบบการจองใช้ห้องได้ตามที่
                        </Typography>
                        <Typography component="h2" variant="h6" color="action">
                        ต้องการ รวมทั้งการบริการต่างๆที่มีอยู่ในระบบ
                        </Typography>
                        <Typography component="h2" variant="h5" color="primary" sx={{ marginTop: 4 }}>
                            User Story(ระบบสมัครสมาชิก)
                        </Typography>
                        <Typography component="h2" variant="h6" color="action">
                            ในบทบาทของ พนักงานระบบ
                        </Typography>
                        <Typography component="h2" variant="h6" color="action">
                            ฉันต้องการ บันทึกข้อมูลของผู้ใช้บริการ
                        </Typography>
                        <Typography component="h2" variant="h6" color="action">
                            เพื่อ ให้ได้ข้อมูลของผู้ใช้บริการ
                        </Typography>
                    </Box>
                </Box>
                <Divider />


                {/* เมื่อมีการตรวจสอบ token ใน local storage ขณะที่ผู้ใช้อยู่หน้า Home  */}
                {token ? (
                    <div>
                        {/* หากพบว่ามี token อยู่ใน local storage ที่หน้า Home จะทำการแสดงปุ่ม log out และ show user */}
                        <Box display="flex" sx={{ marginTop: 2, padding: 2 }}>
                            <Box flexGrow={1}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={logOut}
                                >
                                    Log out
                                </Button>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={RouterLink}
                                    to="/user"
                                >
                                    Show User
                                </Button>
                            </Box>
                        </Box>
                    </div>
                ) : (
                    <div>
                        {/* หากพบว่าไม่มี token อยู่ใน local storage ที่หน้า Home จะทำการแสดงปุ่ม log in และ register แทน */}
                        <Box display="flex" sx={{ marginTop: 2, padding: 2 }}>
                            <Box flexGrow={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={RouterLink}
                                    to="/login"
                                >
                                    Log in
                                </Button>
                            </Box>
                            {/* <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={RouterLink}
                                    to="/create"
                                >
                                    Register
                                </Button>
                            </Box> */}
                        </Box>
                    </div>
                )}
            </Paper>
        </Container>
    )
}
