import React from "react";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import Button from '@mui/material/Button';
import FeatherIcon from "feather-icons-react";
const BaseCard = (props) => {
  const handleOpenAdd = () => props.setOpenAdd(true);
  return (
    <Card>
      <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{props.title}s</Typography>
        <Button variant="contained" onClick={handleOpenAdd} >
          Add {props.title} 
          <FeatherIcon icon='plus-circle' />
        </Button>
        
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
