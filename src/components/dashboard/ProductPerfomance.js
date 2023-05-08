import React,{ useState, useEffect } from "react";
import {
  Typography,
  Box,
  Stack, 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Modal,
  FormHelperText
} from "@mui/material"; 
import Button from '@mui/material/Button';
import BaseCard from "../baseCard/BaseCard";
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2';

const ProductPerfomance = ({ users }) => {
  
  const [myUsers, setMyUsers] = useState(users)
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [errors, setErrors] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleCloseAdd = () => setOpenAdd(false);

  const [saveUser, setSaveUser] = useState({
    name : '',
    email: '',
    phone: '',
    serial: '',
    password: '',
  })

  const [editUser, setEditUser] = useState({
    id : '',
    name : '',
    email: '',
    phone: '',
    password: '',
  })

  const handelSaveChange = ({ target: { name, value } }) => { 
    setSaveUser({...saveUser,[name]: value})
  }
  const handelEditChange = ({ target: { name, value } }) => { 
    setEditUser({...editUser,[name]: value})
  }

  const fetchUser = async (idUser) => {
    const reponse= await fetch('http://127.0.0.1:8000/api/users/'+idUser+'/edit', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, 
      
    })
    const result = await reponse.json();
    editUser.id = result.id
    editUser.name=result.name
    editUser.email=result.email
    editUser.phone=result.phone 
    handleOpen()
  }

  const handelAddSubmit = async (e) => {
    e.preventDefault(); 
   const reponse= await fetch('http://127.0.0.1:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveUser)
   })
    if (reponse) {
      const result = await reponse.json();
     
      if (result.success==true) {
        setErrors([])
        handleCloseAdd()
        users.push(result.data)
        setMyUsers(users)
        setSaveUser({
          name : '',
          email: '',
          phone: '',
          serial: '',
          password: '',
        })
        toast.success('User Add Succefully !', {
          position: toast.POSITION.TOP_CENTER
        });
      } 
      if(result.success==false){
        
        setErrors(result.data)
        
      }
       
    }
  }

  const handelEditSubmit = async (e) => {
    e.preventDefault(); 
   const reponse= await fetch('http://127.0.0.1:8000/api/users/'+editUser.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editUser)
   })
    if (reponse) {
      const result = await reponse.json();
      
      if (result.success==true) {
        setErrors([])
        handleClose()
          const newUsers= myUsers.filter(user => {
          return user.id != editUser.id
          })
        newUsers.push(result.data)
        setMyUsers(newUsers)
        setEditUser({
          id : '' ,
          name : '',
          email: '',
          phone: '',
          serial: '',
          password: '',
        })
        toast.success('User Update Succefully !', {
          position: toast.POSITION.TOP_CENTER
        });
      }
      if(result.success==false){
        
        setErrors(result.data)
        
      } 
    }
  }

  const handelDelete = async (idUser) => {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async  (result) => {
      if (result.isConfirmed) {
        const reponse= await fetch('http://127.0.0.1:8000/api/users/'+idUser, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }, 
        })
        const result = await reponse.json(); 
         const newUsers= myUsers.filter(user => {
            return user.id != idUser
         })
        setMyUsers(newUsers)
        swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        )
      }
    })
    
  }

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
   
    <BaseCard title="User" setOpenAdd ={setOpenAdd}>
       <ToastContainer />
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
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Serial
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
          {myUsers.map((user) => (
            
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

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {user.serial}
                </Typography>
              </TableCell>

              <TableCell >
                <Typography color="textSecondary" variant="h6">
                  {user.city}
                </Typography>
              </TableCell>
              <TableCell > 
                <Stack spacing={2} direction="row">
                  <Button onClick={() => fetchUser(user.id)} variant="contained" color="warning">
                    Update
                  </Button>
                  <Button onClick={() => handelDelete(user.id)} variant="contained" color="secondary">
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
          <h2 id="modal-title">Update User</h2>
          <form onSubmit={handelEditSubmit}>
            <Stack spacing={3}>
            <FormHelperText>{errors.name && errors.name[0]}</FormHelperText>
            <TextField
              id="name-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={editUser.name}
              onChange={handelEditChange}  
            />
            <FormHelperText>{errors.email && errors.email[0]}</FormHelperText>
            <TextField id="email-basic" label="Email" variant="outlined" name="email" value={editUser.email}  onChange={handelEditChange} />
            <FormHelperText>{errors.password && errors.password[0]}</FormHelperText>           
            <TextField
              id="pass-basic"
              label="Password"
              type="password"
              variant="outlined"
              name='password'
              value={editUser.password} 
              onChange={handelEditChange}
            />
           
            <TextField
              id="er-basic"
              label="phone"
              variant="outlined"
              name="phone"
              value={editUser.phone}
              onChange={handelEditChange}  
            />
            <TextField
              id="serial-basic"
              label="serial"
              variant="outlined"
              name="serial"
              value={editUser.serial}
              onChange={handelEditChange}  
            />
          </Stack>
          <br />
          <Button type="submit" variant="contained" mt={2}>
            Submit
          </Button>
          </form>
          </Box>
      </Modal>
      <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
         
        <Box sx={style}>
          <h2 id="modal-title">Add User</h2>
          <form onSubmit={handelAddSubmit}>
          <Stack spacing={3}>
              <FormHelperText>{errors.name && errors.name[0]}</FormHelperText>       
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined" 
                value={saveUser.name}
                onChange={handelSaveChange}
              />
              <FormHelperText>{errors.email && errors.email[0]}</FormHelperText>
              <TextField id="email" name="email" label="Email" variant="outlined" value={saveUser.email} onChange={handelSaveChange} />
              <FormHelperText>{errors.password && errors.password[0]}</FormHelperText>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={saveUser.password}
                onChange={handelSaveChange}
              /> 
              <TextField
                id="phone"
                name="phone"
                label="phone" 
                variant="outlined"
                value={saveUser.phone}
                onChange={handelSaveChange}
              />
              <TextField
                id="serial"
                name="serial"
                label="serial" 
                variant="outlined"
                value={saveUser.serial}
                onChange={handelSaveChange}
              />
            </Stack>
          <br /> 
          <Button type="submit" variant="contained" mt={2}>
            Submit
          </Button>
          </form>
          </Box>
      </Modal>
    </BaseCard>
  );
};

export default ProductPerfomance;
