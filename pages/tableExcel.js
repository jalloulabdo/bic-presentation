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
    
    const  readDataFromExcel = async(data) => {
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
        const category_name = [];
        const obj = [];
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

        for (let index = 1; index < 4; index++) {
          
          if (typeof  dataColumn[index]  != "undefined") {
            category_name.push(dataColumn[index][0].split("-")[0]);
          }
        }
        
        for (let index = 0; index < dataColumn.length; index) {
          if (typeof  dataColumn[index]  != "undefined") {
            user_id.push(dataColumn[index][0].split("-")[0]);
          }
          index = index + 4;
        }
        
        var x = 1;

        for (let index = 0; index < user_id.length; index++) {
        
          const res = await fetch('http://127.0.0.1:8000/api/getVendeur/'+user_id[index].trim())
          const vendeur = await res.json()
          const idVendeur = vendeur.data.id
         
          for (let value = 0; value < category_name.length; value++) {
            const res = await fetch('http://127.0.0.1:8000/api/getCategory/'+category_name[value].trim())
            const category = await res.json()
            const idCategory = category.data.id

            var tutorial = {
              'id_vendeur'  : idVendeur,
              "id_category" : idCategory,
              "target" :  mySheetDate['SUIVI'][x][0] ? mySheetDate['SUIVI'][x][0]: '',
              "reale" :  mySheetDate['SUIVI'][x][1] ? mySheetDate['SUIVI'][x][1]: '',
              "nb_activation" :  mySheetDate['SUIVI'][x][2] ? mySheetDate['SUIVI'][x][2]: '',
              "build_up" : mySheetDate['SUIVI'][x][3] ? mySheetDate['SUIVI'][x][3]: 2,
              "date" : ''
            };
            obj.push(tutorial);
            x = x + 1;
          }
          x = x + 1
        }

        const reponse= await fetch('http://127.0.0.1:8000/api/data_actives', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
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
  