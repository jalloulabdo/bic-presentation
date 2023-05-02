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

const ProductPerfomance = ({ products ,categorys }) => {
  
  const [myCategory, setMyCategory] = useState(categorys);
  const [myProducts, setMyProducts] = useState(products)
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [category, setCategory] = React.useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleCloseAdd = () => setOpenAdd(false);

  const [saveProduct, setSaveProduct] = useState({
    name: '', 
    idCategory : ''
  })

  const [editProduct, setEditProduct] = useState({
    id : '',
    name :'',
    idCategory : ''
  })

  const handelSaveChange = ({ target: { name, value } }) => { 
    setSaveProduct({...saveProduct,[name]: value})
  }
  const handelEditChange = ({ target: { name, value } }) => { 
    setEditProduct({...editProduct,[name]: value})
    
  }

  const fetchProduct = async (idProduct) => {

    const reponse= await fetch('http://127.0.0.1:8000/api/products/'+idProduct+'/edit', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, 
      
    })
    const result = await reponse.json();
    editProduct.id = result.id
    editProduct.name=result.name
    editProduct.idCategory=result.category_id 
    setCategory(result.category_id)
    handleOpen()
  }

  const handelAddSubmit = async (e) => {
    e.preventDefault(); 
   const reponse= await fetch('http://127.0.0.1:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveProduct)
   })
    if (reponse) {
      const result = await reponse.json();

      if (result.success==true) {
        handleCloseAdd()
        products.push(result.data)
        setMyProducts(products)
        setSaveProduct({
          name : '',
          idCategory : '', 
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
   const reponse= await fetch('http://127.0.0.1:8000/api/products/'+editProduct.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editProduct)
   })
    if (reponse) {
      const result = await reponse.json();
      ;
      if (result.success==true) {
        handleClose()
          const newProducts= myProducts.filter(product => {
          return product.id != editProduct.id
          })
        newProducts.push(result.data)
        setMyProducts(newProducts)
        setEditProduct({
          id : '' ,
          name :'',
          idCategory : '', 
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
    
  const handelDelete = async (idProduct) => {
    const reponse= await fetch('http://127.0.0.1:8000/api/products/'+idProduct, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }, 
    })
    const result = await reponse.json(); 
     const newProducts= myProducts.filter(product => {
        return product.id != idProduct
     })
     
     setMyProducts(newProducts)
    
  }

  const selectChange = (event) =>{
    setSaveProduct({idCategory: event});
  }

  const selectEditChange = (event) =>{
    setCategory(event)
    editProduct.idCategory=event
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
    
    <BaseCard title="Product" setOpenAdd ={setOpenAdd}>
       
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
              Category
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
          {myProducts.map((product) => (
            
            <TableRow key={product.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.name}
                </Typography>
              </TableCell>
              <TableCell>
             
                  {myCategory.map((category)=>{

                    if(category.id===product.category_id){
                     return <Typography key={category.id} color="textSecondary" variant="h6"> 
                     {category.name}
                     </Typography>
                    }

                  })}
                
              </TableCell>
              <TableCell > 
                <Stack spacing={2} direction="row">
                  <Button onClick={() => fetchProduct(product.id)} variant="contained" color="warning">
                    Update
                  </Button>
                  <Button onClick={() => handelDelete(product.id)} variant="contained" color="secondary">
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
              value={editProduct.name}
              onChange={handelEditChange}  
            />
            <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                label="Category" 
                name="idCategory"
                value={category}
                onChange={(e) => selectEditChange(e.target.value)}
              > 
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  myCategory.map((category) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  ))

                } 
              </Select>
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
                value={saveProduct.name}
                onChange={handelSaveChange}
              /> 
              <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                label="Category" 
                name="idCategory"
                value={saveProduct.idCategory}
                onChange={(e) => selectChange(e.target.value)}
              > 
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  myCategory.map((category) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  ))

                } 
              </Select>
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
