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
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2';
import Button from '@mui/material/Button';
import BaseCard from "../baseCard/BaseCard";

const CategoryPerfomance = ({ categorys }) => {
  
  const [myCategory, setMyCategory] = useState(categorys)
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [category, setCategory] = React.useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleCloseAdd = () => setOpenAdd(false);

  const [saveCategory, setSaveCategory] = useState({
    name: '',
  })

  const [editCategory, setEditCategory] = useState({
    id : '',
    name :'',
  })

  const handelSaveChange = ({ target: { name, value } }) => { 
    setSaveCategory({...saveCategory,[name]: value})
  }
  const handelEditChange = ({ target: { name, value } }) => { 
    setEditCategory({...editCategory,[name]: value})
    
  }

  const fetchCategory = async (idCategory) => {

    const reponse= await fetch('http://127.0.0.1:8000/api/categories/'+idCategory+'/edit', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, 
      
    })
    const result = await reponse.json();
    editCategory.id = result.id
    editCategory.name=result.name 
    setCategory(result.category_id)
    handleOpen()
  }

  const handelAddSubmit = async (e) => {
    e.preventDefault(); 
   const reponse= await fetch('http://127.0.0.1:8000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveCategory)
   })
    if (reponse) {
      const result = await reponse.json();

      if (result.success==true) {
        handleCloseAdd()
        myCategory.push(result.data)
        setMyCategory(myCategory)
        setSaveCategory({
          name : '', 
        })
        toast.success('Category Add Succefully !', {
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
   const reponse= await fetch('http://127.0.0.1:8000/api/categories/'+editCategory.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editCategory)
   })
    if (reponse) {
      const result = await reponse.json();
      ;
      if (result.success==true) {
        handleClose()
          const newCategory= myCategory.filter(category => {
          return category.id != editCategory.id
          })
        newCategory.push(result.data)
        setMyCategory(newCategory)
        setEditCategory({
          id : '' ,
          name :'',
        })
        toast.success('Category Update Succefully !', {
          position: toast.POSITION.TOP_CENTER
        });
      }
      if(result.success==false){
        
        setErrors(result.data)
        
      } 
    }
   }
    
  const handelDelete = async (idCategory) => {
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
        const reponse= await fetch('http://127.0.0.1:8000/api/categories/'+idCategory, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }, 
        })
        const result = await reponse.json(); 
        const newCategory= myCategory.filter(category => {
            return category.id != idCategory
        })
        
        setMyCategory(newCategory)
        swal.fire(
          'Deleted!',
          'Category has been deleted.',
          'success'
        )
      }
    })
    
  }

  const selectChange = (event) =>{
    setSaveCategory({idCategory: event});
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
    
    <BaseCard title="Category" setOpenAdd ={setOpenAdd}>
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
                Name
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
          {myCategory.map((category) => (
            
            <TableRow key={category.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {category.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {category.name}
                </Typography>
              </TableCell>
              <TableCell > 
                <Stack spacing={2} direction="row">
                  <Button onClick={() => fetchCategory(category.id)} variant="contained" color="warning">
                    Update
                  </Button>
                  <Button onClick={() => handelDelete(category.id)} variant="contained" color="secondary">
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
          <h2 id="modal-title">Update Category</h2>
          <form onSubmit={handelEditSubmit}>
            <Stack spacing={3}>
            <FormHelperText>{errors.name && errors.name[0]}</FormHelperText> 
            <TextField
              id="name-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={editCategory.name}
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
          <h2 id="modal-title">Add Category</h2>
          <form onSubmit={handelAddSubmit}>
          <Stack spacing={3}>
          <FormHelperText>{errors.name && errors.name[0]}</FormHelperText>  
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined" 
                value={saveCategory.name}
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

export default CategoryPerfomance;
