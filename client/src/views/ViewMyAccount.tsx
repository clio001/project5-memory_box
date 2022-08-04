import Appbar from "../components/Appbar";
import BottomNav from "../components/BottomNav";
import MyAccount from "../components/MyAccount";
import { Box } from "@mui/material";

function ViewMyAccount() {
  return (
    <Box className="ViewMyAccount">
      <Appbar />
      <MyAccount />
		<BottomNav />
    </Box>
  );
}

export default ViewMyAccount;
