import Appbar from "../components/Appbar";
import BottomNav from "../components/BottomNav";
import GroupAddItem from "../components/GroupAddItem";
import { Box } from "@mui/material";

function ViewGroup() {
  return (
    <Box className="ViewGroup">
      <Appbar />
      <GroupAddItem />
    </Box>
  );
}

export default ViewGroup;
