import Appbar from "../components/Appbar";
import BottomNav from "../components/BottomNav";
import MyAccountEdit from "../components/MyAccountEdit";
import { Box } from "@mui/material";

function ViewMyAccountEdit() {
  return (
    <Box className="ViewMyAccountEdit">
      <Appbar />
      <MyAccountEdit />
    </Box>
  );
}

export default ViewMyAccountEdit;
