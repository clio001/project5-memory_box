import Appbar from "../components/Appbar";
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
