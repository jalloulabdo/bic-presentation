import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
    Card,
    Box,
    Typography,
    CardContent,
  } from "@mui/material"; 
import { array } from "prop-types";
  import React, { useState, useRef } from "react";
  import * as XLSX from 'xlsx'


  const Forms = () => {
    const [File, setFile] = useState(null)
    const [FileName, setFileName] = useState(null)
    const [SheetNames, setSheetNames] = useState([])
    const [SheetData, setSheetData] = useState({})
    const FileRef = useRef()
    const acceptableFileName = ['xlsx', 'xls'];

    const checkFileName = (name) => {
        return acceptableFileName.includes(name.split(".").pop().toLowerCase());
      } 
    
    const  readDataFromExcel = (data) => {
        const wb = XLSX.read(data)
    
        setSheetNames(wb.SheetNames)
        
        const columnRange = "B2:B25";
        const importRange = "C2:F25"
        var mySheetDate =[]
        let sheetName =null;
        let sheetNameFilter =null;
        const JsonData = null;
        const dataHeadrs = null;
        const dataColumn = null;
        const user_id = [];
        //Loop throught The Sheets
        for (let i = 0; i < wb.SheetNames.length; i++) {

          sheetName = wb.SheetNames[i]
          
          const workSheet = wb.Sheets[sheetName] 
        
          
          dataHeadrs = XLSX.utils.sheet_to_json(workSheet, { header: 1 })[0];

          dataColumn = XLSX.utils.sheet_to_json(workSheet, {range: columnRange,header:1 })

          JsonData = XLSX.utils.sheet_to_json(workSheet, {range: importRange,header:1 })

          sheetNameFilter = sheetName.replace(/[^a-zA-Z]/g, '');

          mySheetDate[sheetNameFilter] =JsonData

          mySheetDate['headrs'] =dataHeadrs

          mySheetDate['column'] =dataColumn
          
        }
        
        
        setSheetData(mySheetDate)
        

        for (let index = 0; index < dataColumn.length; index) {
          index = index + 4;
          if (typeof  dataColumn[index]  != "undefined") {
            user_id.push(dataColumn[index][0].split("-")[0]);
          }
        }

        console.log(mySheetDate);
        user_id.forEach(async(item, index)=>{
           
          const res = await fetch('http://127.0.0.1:8000/api/getVendeur/'+item.trim())
          const vendeur = await res.json()
          const idVendeur = vendeur.data.id

        })
      }
    
    const handleFile = async(e) => {
        const myFile = e.target.files[0];
    
        if (!myFile) return;
    
        if (!checkFileName(myFile.name)) {
          alert("Invalid File Type")
          return;
        }
        //Read XLSX MetaData
        const data = await myFile.arrayBuffer()
        
    
        readDataFromExcel(data)
        
        
        setFileName(myFile.name)
        setFile(myFile)
      }
    
    const handleRemove = () => {
        setFile(null)
        setFileName(null)
        FileRef.current.value = "";
      }
      
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
            <Card>
                <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h4">Table Excel</Typography>
                </Box>
                <Stack spacing={3}>
                {FileName && <i className="bi bi-x-lg " style={{cursor: 'pointer'}} onClick={handleRemove}></i>}
                    <TextField
                        id="file" 
                        type="file"
                        variant="outlined"
                        accept='xlsx,xls'
                        multiple={false}
                        onChange={(e) => handleFile(e)} ref={FileRef}
                    />
                </Stack>
                <br />
                <Button variant="contained" mt={2}>
                    Submit
                </Button>
            </Card>
        </Grid>
      </Grid>
    );
  };
  
  export default Forms;
  