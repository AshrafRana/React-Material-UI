import React,{useState,useEffect} from "react";
// @material-ui/core components
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
// assets css
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
// serviec api calling
import Service from "services/service";

const useStyles = makeStyles(styles);

export default function Client() {

  const url = '/clients'
  const service  = new Service();
  const classes = useStyles();

  let initialRecord = {id:'',first_name: '',last_name: '',phone_number:'',email:'',address:''};
  const [record, setRecord] = useState(initialRecord);
  const [recordList, setRecordList] = useState([]);
  
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
 
  const [errorFirstName , setErrorFirstName ] = useState();
  const [errorLastName , setErrorLastName ] = useState();
  const [errorPhone , setErrorPhone ] = useState();  
  const [errorEmail ,setErrorEmail] = useState();
  const [errorAddress ,setErrorAddress] = useState();
 
 const addFiledValidate = ()=>{

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


const getRecordList = () =>{
   
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

const addRecord = () =>{
   
    if(addFiledValidate() === false){
      
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
    
    if(addFiledValidate() === false){
      
        let temp = {};
        temp['id'] = record.id;

        if(!isNaN(record.first_name)){temp['name'] = record.name;}
        
        if(!isNaN(record.last_name) ){temp['owner'] = record.owner;}
        
        if(!isNaN(record.phone_number)){temp['phone_number'] = record.phone_number;}

        if(!isNaN(record.email)){temp['email'] = record.email; }

        if(record.address !== ""){temp['address'] = record.address;}

        console.log(record);
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
  let temp = {id:'',first_name: '',last_name:'',phone_number:'',email:'',address:''};
  temp.id = rowData[0];
  temp.first_name = rowData[1];
  temp.last_name = rowData[2];
  temp.phone_number = rowData[3];
  temp.email = rowData[4];
  temp.address = rowData[5];
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
        <span><Add className={classes.icon} /></span>Add Client
      </Button>
      </GridItem>
      <GridItem  xs={12} sm={12} md={12}>         
          {load?
            <div className={classes.root}><CircularProgress /> Loading ....</div>          
          : <MUIDataTable 
            title={"Clients List"} 
            data={recordList} 
            columns={columns} 
            options={options} 
          />}
      </GridItem>
      {/* Create Modal */}
      <Modal 
          show={modal} 
          closeModal={handleCreateClose}
          title = "Add Client "
          btnTitle =  "Save"
          action = {addRecord}
          content =  {
            <>
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
            <strong> Email Address  :  </strong>{record.email} <br/>
            <strong> Client Address :  </strong>{record.address} <br/>
                          
          </p>}
       />
  </GridContainer>
  );
}
