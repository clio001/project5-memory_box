import Appbar from "../components/Appbar";
import BottomNav from "../components/BottomNav";
import Group from "../components/Group";
import { Box } from "@mui/material";

function ViewGroup() {
  return (
    <Box className="ViewGroup">
      <Appbar />
      <Group />
    </Box>
  );
}

export default ViewGroup;
