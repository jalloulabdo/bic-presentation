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
  Select,
  MenuItem,
  InputLabel,
  Modal,
  FormHelperText
} from "@mui/material";
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import BaseCard from "../baseCard/BaseCard";

const VendeurPerfomance = ({ vendeurs }) => {
  
  
  const [myVendeur, setMyVendeur] = useState(vendeurs)
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [errors, setErrors] = React.useState([]); 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleCloseAdd = () => setOpenAdd(false);

  const [saveVendeur, setSaveVendeur] = useState({
    name: '', 
    email : '',
    phone : '',
    city  : '',
    serial : '',
    serial : ''
  })

  const [editVendeur, setEditVendeur] = useState({
    id : '',
    name: '', 
    email : '',
    phone : '',
    city  : '',
    serial : ''
  })

  const handelSaveChange = ({ target: { name, value } }) => { 
    setSaveVendeur({...saveVendeur,[name]: value})
  }

  const handelEditChange = ({ target: { name, value } }) => { 
    setEditVendeur({...editVendeur,[name]: value})
    
  }

  const fetchVendeur = async (idVendeur) => {

    const reponse= await fetch('http://127.0.0.1:8000/api/vendeurs/'+idVendeur+'/edit', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, 
      
    })
    const result = await reponse.json();
    editVendeur.id = result.id
    editVendeur.name=result.name
    editVendeur.email=result.email
    editVendeur.phone=result.phone
    editVendeur.city=result.city
    editVendeur.serial=result.serial 
    
     
    handleOpen()
  }

  const handelAddSubmit = async (e) => {
    e.preventDefault(); 
   const reponse= await fetch('http://127.0.0.1:8000/api/vendeurs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveVendeur)
   })
    if (reponse) {
      const result = await reponse.json();

      if (result.success==true) {
        handleCloseAdd()
        myVendeur.push(result.data)
        setMyVendeur(myVendeur)
        setSaveVendeur({
            name: '', 
            email : '',
            phone : '',
            city  : '',
            serial : ''
          
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
   const reponse= await fetch('http://127.0.0.1:8000/api/vendeurs/'+editVendeur.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editVendeur)
   })
    if (reponse) {
      const result = await reponse.json();
      ;
      if (result.success==true) {
        handleClose()
          const newVendeur= myVendeur.filter(vendeur => {
          return vendeur.id != editVendeur.id
          })
        newVendeur.push(result.data)
        setMyVendeur(newVendeur)
        setEditVendeur({
          id : '' ,
          name: '', 
          email : '',
          phone : '',
          city  : '',
          serial : ''
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
    
  const handelDelete = async (idVendeur) => {
    const reponse= await fetch('http://127.0.0.1:8000/api/vendeurs/'+idVendeur, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }, 
    })
    const result = await reponse.json(); 
     const newVendeur= myVendeur.filter(vendeur => {
        return vendeur.id != idVendeur
     })
     
     setMyVendeur(newVendeur)
    
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
    
    <BaseCard title="Vendeur" setOpenAdd ={setOpenAdd}>
       
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
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Serial
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
              Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {typeof myVendeur != 'undefined' && Array.isArray(myVendeur) && myVendeur.map((vendeur) => (
            
            <TableRow key={vendeur.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {vendeur.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {vendeur.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {vendeur.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {vendeur.serial}
                </Typography>
              </TableCell> 
              <TableCell > 
                <Stack spacing={2} direction="row">
                  <Button onClick={() => fetchVendeur(vendeur.id)} variant="contained" color="warning">
                    Update
                  </Button>
                  <Button onClick={() => handelDelete(vendeur.id)} variant="contained" color="secondary">
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
                value={editVendeur.name}
                onChange={handelEditChange}  
                />
                <FormHelperText>{errors.email && errors.email[0]}</FormHelperText>
            <TextField id="email-basic" label="Email" variant="outlined" name="email" value={editVendeur.email}  onChange={handelEditChange} />
            <FormHelperText>{errors.serial && errors.serial[0]}</FormHelperText>
            <TextField id="serial-basic" label="Serial" variant="outlined" name="serial" value={editVendeur.serial}  onChange={handelEditChange} />
           
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
            <h2 id="modal-title">Add Vendeur</h2>
            <form onSubmit={handelAddSubmit}>
            <Stack spacing={3}>
            <FormHelperText>{errors.name && errors.name[0]}</FormHelperText>  
                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined" 
                    value={saveVendeur.name}
                    onChange={handelSaveChange}
                />
                <FormHelperText>{errors.email && errors.email[0]}</FormHelperText>
                <TextField id="email" name="email" label="Email" variant="outlined" value={saveVendeur.email} onChange={handelSaveChange} />
                <FormHelperText>{errors.serial && errors.serial[0]}</FormHelperText>
                <TextField 
                id="serial" 
                name="serial" 
                label="serial" 
                variant="outlined" 
                value={saveVendeur.serial} 
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

export default VendeurPerfomance;
