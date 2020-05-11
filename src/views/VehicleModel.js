import React,{useState,useEffect} from "react";
// @material-ui/core components
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Modal from "components/Modal/Modal.js"
// third party library
import MUIDataTable from "mui-datatables";
import ToastServive from 'react-material-toast';
import FileBase64 from 'react-file-base64';
// assets css
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
// serviec api calling
import Service from "services/service";
const useStyles = makeStyles(styles);

export default function VehicleModel() {

  const url = '/vehicle/models'
  const service  = new Service();
  const classes = useStyles();

  const years = Array.from(new Array(20),(val, index) => (new Date()).getFullYear() - index);

  let initialRecord = {id:'',category: '',brand:'',model:'',model_image:'',luggage:'',person_seat:'',year:''};
  const [record, setRecord] = useState(initialRecord);
  const [recordList, setRecordList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
  

  const handleCreateShow = () =>{
    setModal(true);
    setRecord(initialRecord);
  }
  const handleCreateClose = () =>{
    setModal(false);
    validateSetFalse();
  }
  const handleEditShow = () => seteditModal(true);
  const handleEditClose = () => 
  {
    seteditModal(false);
    validateSetFalse();
  }

  const handleDeleteShow = () => {
    setDeleteModal(true);
  }
  const handleDeleteClose = () => setDeleteModal(false);
  

  const handleInputChange = event => {
    const { name, value } = event.target
    setRecord({...record, [name]: value }) 
   
  }

  const handleImageChange = event => {
    let name = "model_image"
    setRecord({...record, [name]:event[0]['base64'].split(',')[1] });
  }
 
  const [errorBrand , setErrorBrand ] = useState();
  const [errorCategory , setErrorCategory ] = useState();
  const [errorYear , setErrorYear ] = useState();  
  const [errorLuggage ,setErrorLuggage] = useState();
  const [errorLuggageText ,setErrorLuggageText] = useState();
  const [errorModel ,setErrorModel] = useState();
  const [errorModelText ,setErrorModelText] = useState();
  const [errorPersonSeat ,setErrorPersonSeat] = useState();
  const [errorPersonSeatText ,setErrorPersonSeatText] = useState();
  const [errorImage ,setErrorImage] = useState();

 const addFiledValidate = ()=>{

  let check = false;

   if(record.brand === ""){ check = true; setErrorBrand(true); }
   
   if(record.category === ""){ check = true; setErrorCategory(true); }
   
   if(record.year === ""){ check = true; setErrorYear(true); }
   
   if(record.model.trim() === ""){ check = true; setErrorModelText("This filed is required");setErrorModel(true); }
    
   if(record.luggage === ""){check = true; setErrorLuggageText("This filed is required");setErrorLuggage(true);}

   if(record.luggage <= 0 || record.luggage >= 10 ){check = true; setErrorLuggageText("value shoud be greater than 1 and less than 10"); setErrorLuggage(true);}

   if(record.person_seat  === ""){ check = true; setErrorPersonSeat("This filed is required"); setErrorPersonSeat(true);}
    
   if(record.luggage <= 0 || record.luggage >= 10 ){ check = true; setErrorPersonSeatText("value shoud be greater than 1 and less than 10"); setErrorPersonSeat(true);}
 
   if(record.model_image.trim() === ""){ check = true; setErrorImage(true); alert('Model image is required'); }
 
   return check;
 }

 const editFiledValidate = ()=>{

  let check = false;

   if(record.brand === ""){ check = true; setErrorBrand(true); }
   
   if(record.category === ""){ check = true; setErrorCategory(true); }
   
   if(record.year === ""){ check = true; setErrorYear(true); }
   
   if(record.model.trim() === ""){ check = true; setErrorModel(true); }
    
   if(record.luggage === ""){check = true; setErrorLuggageText("This filed is required");setErrorLuggage(true);}

   if(record.luggage <= 0 || record.luggage >= 10 ){check = true; setErrorLuggageText("value shoud be greater than 1 and less than 10"); setErrorLuggage(true);}

   if(record.person_seat  === ""){ check = true; setErrorPersonSeat("This filed is required"); setErrorPersonSeat(true);}
    
   if(record.luggaperson_seatge <= 0 || record.person_seat >= 10 ){ check = true; setErrorPersonSeatText("value shoud be greater than 1 and less than 10"); setErrorPersonSeat(true);}
 
   return check;
 }
  const validateSetFalse = () =>{
    
    setErrorBrand(false);
    setErrorCategory(false);
    setErrorYear(false);
    setErrorLuggage(false);
    setErrorPersonSeat(false);
    setErrorModel(false);

  }

 
  const addRecord = () =>{
    
    if(addFiledValidate() === false ){


      service.postRecord(url,record)
        .then(res => {
            setModal(false);
            validateSetFalse();
            setRecord(initialRecord);
            setRecordList([...recordList,res.data])
            toast.success('New Record Added Successfully!');

        })
        .catch(error => {
          console.log(error.response.data.message.model[0]);
          setErrorModelText(error.response.data.message.model[0]);
          setErrorModel(true);
        
      });

    }
  }

 

  const editRecord = () =>{
    
    if(editFiledValidate() === false){
      
        let temp = {};
        temp['id'] = record.id;

        if(!isNaN(record.category)){temp['category'] = record.category;}
        
        if(!isNaN(record.brand) ){temp['brand'] = record.brand;}
        
        if(isNaN(record.model_image)){temp['model_image'] = record.model_image;}

        if(!isNaN(record.luggage)){temp['luggage'] = record.luggage; }

        if(!isNaN(record.person_seat)){temp['person_seat'] = record.person_seat;}

        if(!isNaN(record.year)){temp['year'] = record.year;}
        
        if(isNaN(record.model)){temp['model'] = record.model;}
        
        console.log(temp);
        validateSetFalse();
          seteditModal(false);       
          service.patchRecord(url+'/'+temp.id,temp)
          .then(res => {
            setRecordList(recordList.map(r => (r.id === temp.id ? res.data : r)))
            setRecord(initialRecord);
            toast.success('Record Updated Successfully!');
          })
          .catch(err => {
            console.log('error');
            console.log(err.response);
          })
        
      }
      
  }

  const deleteRecord = () =>{

    if(record.id !== 0){   
      setDeleteModal(false);
      service.deleteRecord(url+'/'+record.id)
      .then(res => {
        setRecordList(recordList.filter(r => r.id !== record.id));
        toast.success('Record Deleted Successfully!'); 
        setRecord(initialRecord);
      })
      .catch(err => {
        console.log('error');
        console.log(err.message);
      })  

      }

  }
  const getBrandList = () =>{
   
    service.getList('/brands')
    .then(res => {
      setBrandList(res.data);
    })
    .catch(err => {
      console.log(err.message);
    })
}
const getCategoryList = () =>{
   
  service.getList('/categories')
  .then(res => {
    setCategoryList(res.data);
  })
  .catch(err => {
    console.log(err.message);
  })
}
  const getRecordList = () =>{
   
        setLoad(true);
        service.getList(url)
        .then(res => {
          setRecordList(res.data);
          console.log(res.data);
          setLoad(false);
        })
        .catch(err => {
          console.log('error');
          console.log(err.message);
          setLoad(true);
        })
  }

  useEffect(() => {
    
    getRecordList();
    getBrandList();
    getCategoryList();
  },[]);

  // table colum names
  const columns = [    
    {
      label: "ID ",
      name: "id",
      options: {
        filter: true,
        sort: true,
       }
      
    },
    {
      label: "Category",
      name: "categories",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Brand",
      name: "brands",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Model",
      name: "model",
      options: {
        filter: true,
        sort:true,
      }
    },
    
    {
      label: "Luggage",
      name: "luggage",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Seats",
      name: "person_seat",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Model Year",
      name: "year",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
         
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button size="sm" color="transparent"  onClick={() =>handleEditShow()}>
               <Edit
                    // className={
                    //   classes.tableActionButtonIcon + " " + classes.edit
                    // }
                  />
            </Button>
              
          );
        }
      }
    },
    {
      name: "Delete",
      options: {
        filter: false,
        sort: false,
        
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <Button  color="transparent"
                size="sm"
                onClick={() => handleDeleteShow()}>
                  <Close
                    // className={
                    //   classes.tableActionButtonIcon + " " + classes.close
                    // }
                  />
                 
            </Button>
            
          );
        }
      }
    },
    
  ];

// selected row data assign to textbox
const onRowClick = (rowData) => {

  let temp =  {id:'',category: '',brand:'',model:'',model_image:'',luggage:'',person_seat:'',year:''};
  temp.id = rowData[0];
  temp.category = rowData[1];
  temp.brand = rowData[2];
  temp.model = rowData[3];
  // temp.model_image = rowData[4];
  temp.luggage = rowData[4];
  temp.person_seat = rowData[5];
  temp.year = rowData[6];
  setRecord(temp);
}
const options = {
    onRowClick: onRowClick,
    selectableRows: false
}

const handleBrandChange = (event) => {

  const {name , value} =event.target
  setRecord({...record, [name]: value }) 

};
const handleCategoryChange = (event) => {

  const {name , value} =event.target
  setRecord({...record, [name]: value }) 

};

return (
  <GridContainer>
      <GridItem  xs={4} sm={4} md={2}>
      <Button color="info"  onClick={() => handleCreateShow()}>
        <span><Add className={classes.icon} /></span>Vehicle Model
      </Button>
      </GridItem>
      <GridItem  xs={12} sm={12} md={12}>         
          {load?
            <div className={classes.root}><CircularProgress /> Loading ....</div>          
          : <MUIDataTable 
            title={"Vehicle Category List"} 
            data={recordList} 
            columns={columns} 
            options={options} 
          />}
      </GridItem>
      {/* Create Brand Modal */}
      <Modal 
          show={modal} 
          closeModal={handleCreateClose}
          title = "Add Vehicle Model"
          btnTitle =  "Save"
          action = {addRecord}
          content =  {
            <>           
            <GridItem  xs={12} sm={12} md={12}>            
              <TextField
                  error = {errorBrand}
                  helperText = {errorBrand ? "please select vehicle brand ":null}
                  id="brand"
                  name="brand"
                  label="Vehicle Brand"
                  select
                  value={record.brand}
                  onChange={handleBrandChange}
                  fullWidth= {true}
                >
                      
                  {brandList? 
                      brandList.map(option => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}
   
                </TextField>
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}>         
              <TextField
                  error ={errorCategory}
                  helperText = {errorCategory?"This filed is required":null}
                  id="category"
                  name="category"
                  label="Vehicle Categroy"
                  select
                  value={record.category}
                  onChange={handleCategoryChange}
                  fullWidth= {true}
                >
                  {categoryList? 
                      categoryList.map((option) => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}
                    
                </TextField>
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                  error ={errorYear}
                  helperText = {errorYear?"This filed is required":null}
                  id="year"
                  label="Model year"
                  name = "year"
                  value = {record.year}
                  onChange = {handleInputChange}
                  fullWidth= {true}
                  select
                  >

                  {years? 
                      years.map((option) => (
                        <MenuItem key={option}  value={option}>
                          {option}
                        </MenuItem>
                      ))
                  
                  :null}
    
  
                </TextField>
                
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorModel}
                 helperText= {errorModel ? errorModelText  :null}
                  id="model"
                  label="Vehicle Model"
                  name = "model"
                  value = {record.model}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                />
                </GridItem>
                 <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 error = {errorLuggage}
                 helperText= {errorLuggage? errorLuggageText  :null}
                 id="luggage"
                  label="Vehicle Luggage"
                  name = "luggage"
                  value = {record.luggage}
                  onChange = {handleInputChange}
                  type="number"
                  fullWidth= {true}
                  InputProps={{
                    inputProps: { 
                        max: 10, min: 1 
                    }
                }}
                />
                </GridItem>
                 <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 error = {errorPersonSeat}
                 helperText= {errorPersonSeat? errorPersonSeatText  :null}
                  id="person_seat"
                  label="Person Seat"
                  name = "person_seat"
                  value = {record.person_seat}
                  onChange = {handleInputChange}
                  type="number"
                  fullWidth= {true}
                  InputProps={{
                    inputProps: { 
                        max: 10, min: 1 
                    }
                }}
                />
                </GridItem>
                 
                <GridItem  xs={12} sm={12} md={12}>    
                
                <FileBase64
                   
                   required= {true}
                   error ={true}
                   helperText = {errorImage ? "Model image is required":null}
                    multiple={ true }
                    onDone={ handleImageChange }
                  />
                </GridItem>
                </>
            }
          
       />
       {/* Edit Brand Modal */}
       <Modal 
          show={editModal} 
          closeModal={handleEditClose}
          title = "Edit Vehicle Modal"
          btnTitle = "Update"
          action = {editRecord}
          content =  {
            <>           
            <GridItem  xs={12} sm={12} md={12}>            
              <TextField
                  id="brand"
                  name="brand"
                  label="Vehicle Brand"
                  select
                  value={record.brand}
                  onChange={handleBrandChange}
                  fullWidth= {true}
                >
                      
                  {brandList? 
                      brandList.map(option => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}

                  {brandList.map(r => (r.name === record.brand  ? 
                  <MenuItem key={r.id} value= {r.name}>
                      {r.name}
                  </MenuItem>
                      : null))}
                      
                </TextField>
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}>         
              <TextField
                  id="category"
                  name="category"
                  label="Vehicle Categroy"
                  select
                  value={record.category}
                  onChange={handleCategoryChange}
                  fullWidth= {true}
                >
                  {categoryList? 
                      categoryList.map((option) => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}
                  
                  {categoryList.map(r => (r.name === record.category  ? 
                  <MenuItem key={r.id}  value= {r.name}>
                      {r.name}
                  </MenuItem>
                      : null))}
                    
                </TextField>
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                  id="year"
                  label="Model year"
                  name = "year"
                  value = {record.year}
                  onChange = {handleInputChange}
                  fullWidth= {true}
                  select
                  >

                  <MenuItem value={record.year}>
                      {record.year}
                  </MenuItem>
                    
                  {years? 
                      years.map((option) => (
                        <MenuItem key={option}  value={option}>
                          {option}
                        </MenuItem>
                      ))
                  
                  :null}
    
  
                </TextField>
                
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorModel}
                 helperText= {errorModel ? "this filed required"  :null}
                  id="model"
                  label="Vehicle Model"
                  name = "model"
                  value = {record.model}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                />
                </GridItem>
                 <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 error = {errorLuggage}
                 helperText= {errorLuggage? errorLuggageText  :null}
                 id="luggage"
                  label="Vehicle Luggage"
                  name = "luggage"
                  value = {record.luggage}
                  onChange = {handleInputChange}
                  type="number"
                  fullWidth= {true}
                  InputProps={{
                    inputProps: { 
                        max: 10, min: 1 
                    }
                }}
                />
                </GridItem>
                 <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 error = {errorPersonSeat}
                 helperText= {errorPersonSeat? errorPersonSeatText  :null}
                  id="person_seat"
                  label="Person Seat"
                  name = "person_seat"
                  value = {record.person_seat}
                  onChange = {handleInputChange}
                  type="number"
                  fullWidth= {true}
                  InputProps={{
                    inputProps: { 
                        max: 10, min: 1 
                    }
                }}
                />
                </GridItem>
                 
                <GridItem  xs={12} sm={12} md={12}>    
                
                <FileBase64
                    multiple={ true }
                    onDone={ handleImageChange }
                  />
                </GridItem>
                </>
            }
       />
        {/* Delete Brand Modal */}
        <Modal 
          show={deleteModal} 
          closeModal={handleDeleteClose}
          title = "Are you sure you want to delete this Model?"
          btnTitle = "Delete"
          action = {deleteRecord}
          content ={
          <p>
            <strong> Vehicle Category : </strong> {record.category} <br/>
            <strong>    Vehicle Brand : </strong> {record.brand} <br/>
            <strong>    Vehicle Modal : </strong> {record.model} <br/>
            <strong>     Vehicle Year :  </strong>{record.year} <br/>              
          </p>}
       />
  </GridContainer>
  );
}
