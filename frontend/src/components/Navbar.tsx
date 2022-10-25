import * as React from "react";
import { Link as RouterLink} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
function Navbar() {
  return (
   <Box sx={{ flexGrow: 1 }}>
     <AppBar position="static">
       <Toolbar>
         <Button 
            variant="text"
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ marginRight: "auto" }}>
          <Typography variant="h6" component="div">
            ระบบสมัครสมาชิก
          </Typography>
         </Button>
       </Toolbar>
     </AppBar>
   </Box>
 );
}
export default Navbar;