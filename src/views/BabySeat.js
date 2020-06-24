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

export default function BabySeat() {

  const url = '/babyseats'
  const service  = new Service();
  const classes = useStyles();
  let initialRecord = {id:'',weight: '',age: ''};
  const [record, setRecord] = useState(initialRecord);
  const [recordList, setRecordList] = useState([]);
  const [load, setLoad] = useState(false);
  const [errorWeightText ,setErrorWeightText]= useState(false)
  const [errorAgeText ,setErrorAgeText]= useState(false)
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

  const validate = () =>{

    let check = false;
    
    if(record.weight.trim() === ""){
      setErrorWeightText(true);
      check = true;     
    }

    if(record.age.trim() === ""){
      setErrorAgeText(true);     
      check = true; 
    }

    return check;
    
  }

  const validateSetFalse = () =>{
     setErrorWeightText(false);
     setErrorAgeText(false);     
  }
  

  const addRecord = () =>{
    
    if(validate()  === false){

        setModal(false);
        service.postRecord(url,record)
        .then(res => {
          setRecord(initialRecord);
          setRecordList([...recordList,res.data])
          toast.success('New Record Added Successfully!');
          validateSetFalse();
        })
        .catch(err => {
          console.log('error');
          console.log(err.message);
        })

      }
  }

  const editRecord = () =>{

    if(validate() === false){      
        seteditModal(false);
        service.putRecord(url+'/'+record.id,record)
        .then(res => {
          setRecordList(recordList.map(r => (r.id === record.id ? record : r)))
          setRecord(initialRecord);
          toast.success('Record Updated Successfully!');
          validateSetFalse();
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
      label: "Baby Weight",
      name: "weight",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Age Limit",
      name: "age",
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

  let temp = {id:'',weight: '',age: ''}
  temp.id = rowData[0];
  temp.weight = rowData[1];
  temp.age = rowData[2];
  
  setRecord(temp);
}
const options = {
    onRowClick: onRowClick,
    selectableRows: false
}
return (
  <GridContainer>
      <GridItem  xs={4} sm={4} md={2}>
      <Button color="info"  onClick={() => handleCreateShow()}>
        <span><Add className={classes.icon} /></span>Add Baby Seat 
      </Button>
      </GridItem>
      <GridItem  xs={12} sm={12} md={12}>         
          {load?
            <div className={classes.root}><CircularProgress /> Loading ....</div>          
          : <MUIDataTable 
            title={"Baby Seat List"} 
            data={recordList} 
            columns={columns} 
            options={options} 
          />}
      </GridItem>
      {/* Create Brand Modal */}
      <Modal 
          show={modal} 
          closeModal={handleCreateClose}
          title = "Add Baby Seat"
          btnTitle = "Save"
          action = {addRecord}
          content = {
            <>
            <TextField
               error = {errorWeightText ?  true :false}
               helperText= {errorWeightText ? "this filed required"  :null}
                id="weight"
                label="Baby Weight"
                name = "weight"
                value = {record.weight}
                onChange = {handleInputChange}
                type="text"
                fullWidth={true}
              />
              <TextField
              error = {errorAgeText ?  true :false}
              helperText= {errorAgeText ? "this filed required"  :null}
               id="age"
               label="Age Limit"
               name = "age"
               value = {record.age}
               onChange = {handleInputChange}
               type="text"
               fullWidth={true}
             />
             </>
          }
       />
       {/* Edit Modal */}
       <Modal 
          show={editModal} 
          closeModal={handleEditClose}
          title = "Edit Vehicle Baby Seat"
          btnTitle = "Update"
          action = {editRecord}
          content = {
            <>
            <TextField
               error = {errorWeightText ?  true :false}
               helperText= {errorWeightText ? "this filed required"  :null}
                id="weight"
                label="Baby Weight"
                name = "weight"
                value = {record.weight}
                onChange = {handleInputChange}
                type="text"
                fullWidth={true}
              />
              <TextField
              error = {errorAgeText ?  true :false}
              helperText= {errorAgeText ? "this filed required"  :null}
               id="age"
               label="Age Limit"
               name = "age"
               value = {record.age}
               onChange = {handleInputChange}
               type="text"
               fullWidth={true}
             />
             </>
          }
       />
        {/* Delete Baby Modal */}
        <Modal 
          show={deleteModal} 
          closeModal={handleDeleteClose}
          title = "Are you sure you want to delete Vehicle Baby Seat?"
          btnTitle = "Delete"
          action = {deleteRecord}
          content ={
          <>
          <p> Baby Weight    :  {record.weight} </p>
          <p> Baby Age Limit :  {record.age} </p>
          </>
        }
       />
  </GridContainer>
  );
}
