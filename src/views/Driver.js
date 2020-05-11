import React,{useState,useEffect} from "react";
// @material-ui/core components
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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

export default function Driver() {

  const url = '/drivers'
  const service  = new Service();
  const classes = useStyles();
  
  let initialRecord = {id:'',first_name: '',last_name: '',phone_number:'',email:'',address:'',
  company:'',driving_license_number:'',social_security_number:'',license_image:'',user_image:''};
  // for editing values
  let temp = {id:'',first_name: '',last_name: '',phone_number:'',email:'',address:'',
  company:'',driving_license_number:'',social_security_number:'',license_image:'',user_image:''};
  let editTemp ={};
  const [record, setRecord] = useState(initialRecord);
  const [recordList, setRecordList] = useState([]);
  const [companyList, setCompanyList] = useState([]);  
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
    editTemp[name] =value;
  } 
  const handleLicenseImageChange = event => {
    let name = "license_image"
    setRecord({...record, [name]:event[0]['base64'].split(',')[1] });
  }
  
  const handleUserImageChange = event => {
    let name = "user_image"
    setRecord({...record, [name]:event[0]['base64'].split(',')[1] });
    console.log(record.user_image);
  }
 
  const [errorFirstName , setErrorFirstName ] = useState();
  const [errorLastName , setErrorLastName ] = useState();
  const [errorPhone , setErrorPhone ] = useState();  
  const [errorEmail ,setErrorEmail] = useState();
  const [errorAddress ,setErrorAddress] = useState();
 
 const ValidateFiled = ()=>{

  let check = false;

   if(record.first_name === ""){ check = true; setErrorFirstName(true); }
   
   if(record.last_name === ""){ check = true; setErrorLastName(true); }
   
   if(record.phone_number === ""){ check = true; setErrorPhone(true); }
   
   if(record.email === ""){ check = true; setErrorEmail(true); }
  
   if(record.address === ""){check = true;setErrorAddress(true);}
  
   if(record.user_image === ""){check = true; alert('Driver Image is Required');}
  
   if(record.license_image === ""){check = true; alert('Driver License Image is Required');}
  
   return check;
 }
 const EditValidateFiled = ()=>{

  let check = false;

   if(record.first_name === ""){ check = true; setErrorFirstName(true); }
   
   if(record.last_name === ""){ check = true; setErrorLastName(true); }
   
   if(record.phone_number === ""){ check = true; setErrorPhone(true); }
   
   if(record.email === ""){ check = true; setErrorEmail(true); }
  
   if(record.address === ""){check = true;setErrorAddress(true);}
  
   return check;
 }
  const validateSetFalse = () =>{
    
    setErrorFirstName(false);
    setErrorLastName(false);
    setErrorPhone(false);
    setErrorEmail(false);
    setErrorAddress(false);
  }


// const getRecordList = () =>{
   
//         setLoad(true);
//         service.getList(url)
//         .then(res => {
//           console.log(res.data);
//           setRecordList(res.data);
//           setLoad(false);
//         })
//         .catch(err => {
//           console.log('error');
//           console.log(err.message);
//           setLoad(true);
//         })
//   }

const addRecord = () =>{


  console.log(record);
   
    if(ValidateFiled() === false){
      
        validateSetFalse();
        setModal(false);
        service.postRecord(url,record)
        .then(res => {
          setRecord(initialRecord);
          setRecordList([...recordList,res.data])
          console.log(res.data);
          toast.success('New Record Added Successfully!');
        })
        .catch(err => {
          console.log('error');
          console.log(err.message);
        })

      }
  }

const editRecord = () =>{
    
    if(EditValidateFiled() === false){
      
        // let tempEidit = {};
        // // tempEidit['id'] = record.id;
        // if("hello" != "hellok"){tempEidit['first_name'] = record.first_name; console.log('hello');}
        // // if(temp.first_name.trim() != record.first_name.trim()){tempEidit['first_name'] = record.first_name; console.log('hello');}
        // if(temp.last_name.trim() !== record.last_name.trim()){tempEidit['last_name'] = record.last_name;}
        // if(temp.phone_number.trim() !== record.phone_number.trim()){tempEidit['phone_number'] = record.phone_number;}
        // if(temp.company_name !== record.company_name){tempEidit['company_name'] = record.company_name;}
        // if(temp.driving_license_number.trim() !== record.driving_license_number.trim()){tempEidit['driving_license_number'] = record.driving_license_number;}
        // if(temp.social_security_number.trim() !== record.social_security_number.trim()){tempEidit['social_security_number'] = record.social_security_number;}
        // if(temp.email.trim() !== record.email.trim()){tempEidit['email'] = record.email;}
        // if(temp.address.trim() !== record.address.trim()){tempEidit['address'] = record.address;}
    
        if(!isNaN(record.company)){ delete record.company;}
        if(record.user_image === ""){ delete record.user_image;}
        if(record.license_image === ""){delete record.license_image;}
        console.log('sent record');     
        console.log(record);
        // // console.log(editTemp);
        
        validateSetFalse();
        seteditModal(false);       
        service.patchRecord(url+'/'+record.id,record)
        .then(res => {
          console.log('recieve record');
          console.log(res.data);
          setRecordList(recordList.map(r => (r.id === record.id ? res.data : r)))
          setRecord(initialRecord);
          toast.success('Record Updated Successfully!');
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
  
  const  getRecordList = () =>{
  
    setLoad(true);
    service.getList(url)
    .then(res => {
      console.log(res.data);
      setRecordList(res.data);
      setLoad(false);
    })
    .catch(err => {
      console.log('error');
      console.log(err.message);
      setLoad(true);
    })
  }
  
  const getCompanyList = () =>{
    
    service.getList('/companies')
    .then(res => {
      setCompanyList(res.data);
      console.log(res.data);

    })
    .catch(err => {
      console.log(err.message);
    })
  }
  useEffect(() => {
  
    getRecordList();
    getCompanyList();
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
      label: "First Name",
      name: "first_name",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Last Name",
      name: "last_name",
      options: {
        filter: true,
        sort:true,
      }
    },   
    {
      label: "phone Number",
      name: "phone_number",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Company",
      name: "company_name",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Driving License",
      name: "driving_license_number",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Social Security No ",
      name: "social_security_number",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Email",
      name: "email",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Address",
      name: "address",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Driver Image ",
      name: "driver_image",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "License Image ",
      name: "license_image",
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
  temp.id = rowData[0];
  temp.first_name = rowData[1];
  temp.last_name = rowData[2];
  temp.phone_number = rowData[3];
  temp.company = rowData[4];
  temp.driving_license_number = rowData[5];
  temp.social_security_number = rowData[6];
  temp.email = rowData[7];
  temp.address = rowData[8];
  // temp.user_image = rowData[9];
  // temp.license_image = rowData[10];
    
  setRecord(temp);
}
const options = {
    onRowClick: onRowClick,
    selectableRows: false
}

return (
  <GridContainer>
      <GridItem  xs={12} sm={12} md={12}>
      <Button color="info"  onClick={() => handleCreateShow()}>
        <span><Add className={classes.icon} /></span>Add Driver
      </Button>
      </GridItem>
      <GridItem  xs={12} sm={12} md={12}>         
          {load?
            <div className={classes.root}><CircularProgress /> Loading ....</div>          
          : <MUIDataTable 
            title={"Driver List"} 
            data={recordList} 
            columns={columns} 
            options={options} 
          />}
      </GridItem>
      {/* Create Modal */}
      <Modal 
          show={modal} 
          closeModal={handleCreateClose}
          title = "Add Driver "
          btnTitle =  "Save"
          action = {addRecord}
          content =  {
            <>
            <GridItem  xs={12} sm={12} md={12}>            
              <TextField
                  // error = {errorBrand}
                  // helperText = {errorBrand ? "please select vehicle brand ":null}
                  id="company"
                  name="company"
                  label="Company"
                  select
                  value={record.company}
                  onChange={handleInputChange}
                  fullWidth= {true}
                >                      
                  {companyList? 
                      companyList.map(option => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}
   
                </TextField>
                </GridItem>
  
              <GridItem  xs={12} sm={12} md={12}>           
              <TextField
                  error = {errorFirstName}
                  helperText = {errorFirstName ? "This filed is required ":null}
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  value={record.first_name}
                  onChange={handleInputChange}
                  fullWidth= {true}
                />
                </GridItem>

                <GridItem  xs={12} sm={12} md={12}>           
              <TextField
                  error = {errorLastName}
                  helperText = {errorLastName ? "This filed is required ":null}
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  value={record.last_name}
                  onChange={handleInputChange}
                  fullWidth= {true}
                />
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorPhone}
                 helperText= {errorPhone ? "this filed required"  :null}
                  id="phone"
                  label="Phone Number"
                  name = "phone_number"
                  value = {record.phone_number}
                  onChange = {handleInputChange}
                  type="tel"
                  fullWidth= {true}
                />
                </GridItem>
                <GridItem  xs={12} sm={12} md={12}>  
                <TextField
                 error = {errorEmail}
                 helperText= {errorEmail ? "this field is required"  :null}
                 id="email"
                  label="Email Address"
                  name = "email"
                  value = {record.email}
                  onChange = {handleInputChange}
                  type="email"
                  fullWidth= {true}
                  
                />
              </GridItem>
              <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorPhone}
                 helperText= {errorPhone ? "this filed required"  :null}
                  id="driving_license_number" 
                  label="Driving License Number" 
                  name = "driving_license_number"
                  value = {record.driving_license_number}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                />
                </GridItem>
                <GridItem>
                <FileBase64
                    multiple={ true }
                    onDone={ handleLicenseImageChange }
                  />
                </GridItem>
                <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorPhone}
                 helperText= {errorPhone ? "this filed required"  :null}
                  id="social_security_number"
                  label="Social Security Number" 
                  name = "social_security_number"
                  value = {record.social_security_number}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                />
                </GridItem>

                <GridItem  xs={12} sm={12} md={12}>    
                
                <FileBase64
                    multiple={ true }
                    onDone={ handleUserImageChange }
                  />
                </GridItem>


                <GridItem  xs={12} sm={12} md={12}>  
                <TextField
                 error = {errorAddress}
                 helperText= {errorAddress? "this field is requird"  :null}
                  id="address"
                  label="Office Address"
                  name = "address"
                  value = {record.address}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                 
                />
                </GridItem>
                
               
              </>
            }
          
       />
       {/* Edit Modal */}
       <Modal 
          show={editModal} 
          closeModal={handleEditClose}
          title = "Edit Client"
          btnTitle = "Update"
          action = {editRecord}
          content =  {
            <>
            <GridItem  xs={12} sm={12} md={12}>            
              <TextField
                  // error = {errorBrand}
                  // helperText = {errorBrand ? "please select vehicle brand ":null}
                  id="company"
                  name="company"
                  label="Company"
                  select
                  value={record.company}
                  onChange={handleInputChange}
                  fullWidth= {true}
                >                      
                  {companyList? 
                      companyList.map(option => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}

                  {companyList.map(r => (r.name === record.company  ? 
                      <MenuItem key={r.id} value= {r.name}>
                          {r.name}
                      </MenuItem>
                      : null))}
   
                </TextField>
                </GridItem>
  
              <GridItem  xs={12} sm={12} md={12}>           
              <TextField
                  error = {errorFirstName}
                  helperText = {errorFirstName ? "This filed is required ":null}
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  value={record.first_name}
                  onChange={handleInputChange}
                  fullWidth= {true}
                />
                </GridItem>

                <GridItem  xs={12} sm={12} md={12}>           
              <TextField
                  error = {errorLastName}
                  helperText = {errorLastName ? "This filed is required ":null}
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  value={record.last_name}
                  onChange={handleInputChange}
                  fullWidth= {true}
                />
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorPhone}
                 helperText= {errorPhone ? "this filed required"  :null}
                  id="phone"
                  label="Phone Number"
                  name = "phone_number"
                  value = {record.phone_number}
                  onChange = {handleInputChange}
                  type="tel"
                  fullWidth= {true}
                />
                </GridItem>
                <GridItem  xs={12} sm={12} md={12}>  
                <TextField
                 error = {errorEmail}
                 helperText= {errorEmail ? "this field is required"  :null}
                 id="email"
                  label="Email Address"
                  name = "email"
                  value = {record.email}
                  onChange = {handleInputChange}
                  type="email"
                  fullWidth= {true}
                  
                />
              </GridItem>
              <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorPhone}
                 helperText= {errorPhone ? "this filed required"  :null}
                  id="driving_license_number" 
                  label="Driving License Number" 
                  name = "driving_license_number"
                  value = {record.driving_license_number}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                />
                </GridItem>
                <GridItem>
                <FileBase64
                    multiple={ true }
                    onDone={ handleLicenseImageChange }
                  />
                </GridItem>
                <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorPhone}
                 helperText= {errorPhone ? "this filed required"  :null}
                  id="social_security_number"
                  label="Social Security Number" 
                  name = "social_security_number"
                  value = {record.social_security_number}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                />
                </GridItem>

                <GridItem  xs={12} sm={12} md={12}>    
                
                <FileBase64
                    multiple={ true }
                    onDone={ handleUserImageChange }
                  />
                </GridItem>


                <GridItem  xs={12} sm={12} md={12}>  
                <TextField
                 error = {errorAddress}
                 helperText= {errorAddress? "this field is requird"  :null}
                  id="address"
                  label="Office Address"
                  name = "address"
                  value = {record.address}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                 
                />
                </GridItem>
                
               
              </>
            }

       />
        {/* Delete Modal */}
        <Modal 
          show={deleteModal} 
          closeModal={handleDeleteClose}
          title = "Are you sure you want to delete Client?"
          btnTitle = "Delete"
          action = {deleteRecord}
          content ={
          <p>
            <strong>   First Name   : </strong> {record.first_name} <br/>
            <strong>     Last Name  : </strong> {record.last_name} <br/>
            <strong> Phone Number   : </strong> {record.phone_number} <br/>
            <strong> Company Name   :  </strong>{record.company} <br/>
            <strong> Driver License :  </strong>{record.driving_license_number} <br/>
            <strong> Social Security:  </strong>{record.social_security_number} <br/>
            <strong> Email Address  :  </strong>{record.email} <br/>
            <strong> Driver Address :  </strong>{record.address} <br/>
                          
          </p>}
       />
  </GridContainer>
  );
}
