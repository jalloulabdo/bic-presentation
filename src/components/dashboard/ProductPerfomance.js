import React,{ useState, useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Modal
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const ProductPerfomance = ({ users }) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  };
  return (
   
    <BaseCard title="Users">
       
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Phone
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                City
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users[0].map((user) => (
            
            <TableRow key={user.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {user.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {user.email}
                    </Typography> 
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {user.name}
                </Typography>
              </TableCell>
              <TableCell>
             <Typography color="textSecondary" variant="h6">
                  {user.phone}
                </Typography>
              </TableCell>
              <TableCell >
                <Typography color="textSecondary" variant="h6">
                  {user.city}
                </Typography>
              </TableCell>
              <TableCell > 
                <Stack spacing={2} direction="row">
                  <Button onClick={handleOpen} variant="contained" color="warning">
                    Update
                  </Button>
                  <Button variant="contained" color="secondary">
                    delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
         <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <Stack spacing={3}>
            <TextField
              id="name-basic"
              label="Name"
              variant="outlined"
              defaultValue="Nirav Joshi"
            />
            <TextField id="email-basic" label="Email" variant="outlined" />
            <TextField
              id="pass-basic"
              label="Password"
              type="password"
              variant="outlined"
            />
            <TextField
              id="outlined-multiline-static"
              label="Text Area"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
            <TextField
              id="er-basic"
              label="phone"
              defaultValue="ad1avi"
              variant="outlined"
            />
          </Stack>
          <br />
          <Button variant="contained" mt={2}>
            Submit
          </Button>
          </Box>
        </Modal>
    </BaseCard>
  );
};

export default ProductPerfomance;
