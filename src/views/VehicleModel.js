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
import AddAlert from "@material-ui/icons/AddAlert";
// serviec api calling
import Service from "services/service";
import { findDOMNode } from "react-dom";

const useStyles = makeStyles(styles);

export default function Category() {

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
  const [errorText ,setErrorText]= useState(false)
  const [modal, setModal] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toast = ToastServive.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
  

  const handleCreateShow = () => setModal(true);
  const handleCreateClose = () =>{
    setModal(false);
    setErrorText(false)
  }
  const handleEditShow = () => seteditModal(true);
  const handleEditClose = () => 
  {
    seteditModal(false);
    setErrorText(false)
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
    setRecord({...record, ['model_image']:event[0]['base64'].split(',')[1] }) 
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
          setLoad(false);
        })
        .catch(err => {
          console.log('error');
          console.log(err.message);
          setLoad(true);
        })
  }

  const addRecord = () =>{
    if(record.model.trim() === ""){
      setErrorText(true)     
    }
    else{
        console.log(record);
       setModal(false);
        service.postRecord(url,record)
        .then(res => {
          setRecord(initialRecord);
          setRecordList([...recordList,res.data])
          toast.success('New Record Added Successfully!');
          setErrorText(false)
        })
        .catch(err => {
          console.log('error');
          console.log(err.message);
        })

      }
  }

  let errorFiled = {category: false,brand:false,model:false,model_image:false,luggage:false,person_seat:false,year:false};

  const editRecord = () =>{

    if(record.category.trim() == ""){errorFiled['category'] = true;}
    
    else if(record.brand.trim() == "") {errorFiled['brand'] = true;}
    
    else if(record.model_image.trim() == ""){errorFiled['model_image'] = true;}

    else if(record.luggage.trim() == ""){errorFiled['luggage'] = true; }

    else if(record.person_seat.trim() == ""){errorFiled['person_seat'] = true;}

    else if(record.year.trim() == ""){errorFiled['year'] = true;}
    
    else if(record.model.trim() == ""){errorFiled['model'] = true;}
    
    else{
      
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

          seteditModal(false);
          service.patchRecord(url+'/'+temp.id,temp)
          .then(res => {
            setRecordList(recordList.map(r => (r.id === temp.id ? res.data : r)))
            setRecord(initialRecord);
            toast.success('Record Updated Successfully!');
            setErrorText(false)
          })
          .catch(err => {
            console.log('error');
            console.log(err.message);
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
    // {
    //   label: "Image",
    //   name: "image",
    //   options: {
    //     filter: true,
    //     sort:true,
    //   }
    // },
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
  // let initialRecord = {id:'',category: '',brand:'',model:'',model_image:'',luggage:'',person_seat:'',year:''};

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
  // const {key} = event.currentTarget.dataset;
  setRecord({...record, [name]: value }) 

};
const handleCategoryChange = (event) => {

  const {name , value} =event.target
  // const {key} = event.currentTarget.dataset;
  setRecord({...record, [name]: value }) 

};

// const handleInputChange = event => {
//   const { name, value } = event.target
//   setRecord({...record, [name]: value }) 
// }
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
          content = {
          <>           
          <GridItem  xs={12} sm={12} md={12}>            
            <TextField
                id="brand"
                name="brand"
                label="Vehicle Brand"
                select
                value={record.brand}
                onChange={handleBrandChange}
                helperText= {errorText ? "Please select your Brand"  :null}
                fullWidth= {true}
              >
                {brandList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
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
                helperText= {errorText ? "Please select your Category"  :null}
                fullWidth= {true}
              >
                {categoryList.map((option) => (
                  <MenuItem key={option.id}  value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              </GridItem>

              <GridItem  xs={12} sm={12} md={12}>    
              <TextField
               error = {errorText ?  true :false}
               helperText= {errorText ? "this filed required"  :null}
                id="year"
                label="Model year"
                name = "year"
                value = {record.year}
                onChange = {handleInputChange}
                fullWidth= {true}
                select
                >
                {years.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}

              </TextField>
              
              </GridItem>

              <GridItem  xs={12} sm={12} md={12}>         
              <TextField
               error = {errorText ?  true :false}
               helperText= {errorText ? "this filed required"  :null}
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
               error = {errorText ?  true :false}
               helperText= {errorText ? "this filed required"  :null}
                id="luggage"
                label="Vehicle Luggage"
                name = "luggage"
                value = {record.luggage}
                onChange = {handleInputChange}
                type="number"
                fullWidth= {true}
              />
              </GridItem>
               <GridItem  xs={12} sm={12} md={12}>    
              <TextField
               error = {errorText ?  true :false}
               helperText= {errorText ? "this filed required"  :null}
                id="person_seat"
                label="Person Seat"
                name = "person_seat"
                value = {record.person_seat}
                onChange = {handleInputChange}
                type="number"
                fullWidth= {true}
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
       {/* Edit Brand Modal */}
       <Modal 
          show={editModal} 
          closeModal={handleEditClose}
          title = "Edit Vehicle Category"
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
                  helperText= {errorFiled['brand'] ? "Please select your Brand"  :null}
                  fullWidth= {true}
                >
                      
                  {brandList? 
                      brandList.map((option) => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}

                  {/* <MenuItem key={record.brand} value={record.brand}>
                      {record.brand}
                  </MenuItem> */}

                  {/* if(isNaN(record.brand)){
                        
                    } */}
                      
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
                  helperText= {errorText ? "Please select your Category"  :null}
                  fullWidth= {true}
                >
                  {categoryList? 
                      categoryList.map((option) => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}
                  
                  if(isNaN(type(record.category)) ){
                    
                  <MenuItem  value={'-1'}>
                      {record.category}
                  </MenuItem>
                
                }
                
                </TextField>
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 error = {errorText ?  true :false}
                 helperText= {errorText ? "this filed required"  :null}
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
                 error = {errorText ?  true :false}
                 helperText= {errorText ? "this filed required"  :null}
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
                 helperText= {errorFiled['luggage'] ? "this filed required"  :null}
                  id="luggage"
                  label="Vehicle Luggage"
                  name = "luggage"
                  value = {record.luggage}
                  onChange = {handleInputChange}
                  type="number"
                  fullWidth= {true}
                />
                </GridItem>
                 <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 helperText= {errorFiled['person_seat'] ? "this filed required"  :null}
                  id="person_seat"
                  label="Person Seat"
                  name = "person_seat"
                  value = {record.person_seat}
                  onChange = {handleInputChange}
                  type="number"
                  fullWidth= {true}
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
            <strong>  Vehicle Modal : </strong> {record.model} <br/>
            <strong> Vehicle Year :  </strong>{record.year} <br/>              
          </p>}
       />
  </GridContainer>
  );
}
