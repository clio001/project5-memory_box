import Appbar from "../components/Appbar";
import Group from "../components/Group";
import { Box } from "@mui/material";

function ViewGroup() {
  return (
    <Box className="ViewMyAccount">
      <Appbar />
      <Group />
    </Box>
  );
}

export default ViewGroup;
