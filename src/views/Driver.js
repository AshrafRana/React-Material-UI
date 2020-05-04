import React,{useState, useEffect} from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Modal from "components/Modal/Modal.js"
import CustomInput from "components/CustomInput/CustomInput.js";

import TextField from '@material-ui/core/TextField';

import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import MUIDataTable from "mui-datatables";

import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from '@material-ui/icons/People';
// core components

// import styles from "assets/jss/material-dashboard-react/cardImagesStyles.js";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import { makeStyles } from "@material-ui/core/styles";

// import getAll from "services/service";

const useStyles = makeStyles(styles);

export default function Driver() {

  const classes = useStyles();
   
  const [modal, setModal] = useState(false);
  const handleCreateShow = () => setModal(true);
  const handleCreateClose = () => setModal(false);

  const [editModal, seteditModal] = useState(false);
  const handleEditShow = () => seteditModal(true);
  const handleEditClose = () => seteditModal(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteShow = () => setDeleteModal(true);
  const handleDeleteClose = () => setDeleteModal(false);

  const initialState = {userId: '', id: '', title: '', completed: ''}
  const [record,setRecord] = useState(initialState)
  const [recordList,setRecordList] = useState([])
  

  const addRecord = () =>{
    alert("Record Add Successfully!");
    setModal(false);
  }

  const editRecord = () =>{
    alert("Record Update Successfully!");
    seteditModal(false);
  }

  const deleteRecord = () =>{
    alert("Record Delete Successfully!");
    setDeleteModal(false);
  }

  useEffect(() => {
    // setLoad(true);
    
    // setRecordList(getAll('/todos/'));
    // console.log(getAll('/todos/') +'h');

    // getAll('/todos/')
    // .then(res => {
    //   console.log(res.data);
    // })

    // axios.get('https://jsonplaceholder.typicode.com/todos/')
    //     .then(res => {
    //        setRecordList(res.data);
    //       console.log(res.data);
    //       // setLoad(false);

    //     })
    //     .catch(err => {
    //       console.log(err.message);
    //       console.log('error');
    //       // setLoad(true);
    //     })
  },[]);

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
        label: "User Id ",
        name: "userId",
        options: {
          filter: true,
          sort: true,
      }
        
      },
      {
        label: "Title ",
        name: "title",
        options: {
          filter: true,
          sort: true,
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
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
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
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
            </Button>
            
          );
        }
      }
    },
    
  ];

  return (
    <>hello</>
  // <GridContainer>
  //     <GridItem  xs={4} sm={4} md={2}>
  //     <Button color="info"  onClick={() => handleCreateShow()}>
  //       <span><Add className={classes.icon} /></span>Add Brand
  //     </Button>
  //     </GridItem>
  //     <GridItem  xs={12} sm={12} md={12}>
  //         <MUIDataTable 
  //           title={"Driver List"} 
  //           data={recordList} 
  //           columns={columns} 
  //           // options={options} 
  //         />
  //     </GridItem>
  //     {/* Create Brand Modal */}
  //     <Modal 
  //         show={modal} 
  //         closeModal={handleCreateClose}
  //         title = "Register New Driver"
  //         btnTitle = "Save"
  //         action = {addRecord}
  //         content = {
  //                       <>
  //                         <GridContainer>
  //                           <GridItem xs={12} sm={12} md={6}>
  //                             <CustomInput
  //                               labelText="First Name"
  //                               id="first-name"
  //                               formControlProps={{
  //                                 fullWidth: true
  //                               }}
  //                             />
  //               <TextField
  //                 autoFocus
  //                 margin="dense"
  //                 id="firstname"
  //                 label="First Name"
  //                 type="file"
  //                 fullWidth
  //               />
  //                           </GridItem>
  //                           <GridItem xs={12} sm={12} md={6}>
  //                             <CustomInput
  //                               labelText="Last Name"
  //                               id="last-name"
  //                               formControlProps={{
  //                                 fullWidth: true,
  //                                 endAdornment: (<InputAdornment position="start"><People/></InputAdornment>)
  //                               }}
  //                             />
  //                           </GridItem>
  //                         </GridContainer>
  //                         <GridContainer>
  //                           <GridItem xs={12} sm={12} md={6}>
  //                             <CustomInput
  //                               labelText="Email address"
  //                               id="email-address"
  //                               formControlProps={{
  //                                 fullWidth: true
  //                               }}
  //                             />
  //                           </GridItem>
  //                           <GridItem xs={12} sm={12} md={6}>
  //                             <CustomInput
  //                               labelText="Phone Number"
  //                               id="phone-number"
  //                               formControlProps={{
  //                                 fullWidth: true
  //                               }}
  //                             />
  //                           </GridItem>
  //                         </GridContainer>
  //                         <GridContainer>
  //                           <GridItem xs={12} sm={12} md={6}>
  //                             <CustomInput
  //                               labelText="Drive Image"
  //                               id="driver-image"
  //                               formControlProps={{
  //                                 fullWidth: true
                                  
  //                               }}
  //                             />
  //                           </GridItem>
  //                           <GridItem xs={12} sm={12} md={6}>
  //                             <CustomInput
  //                               labelText="Address"
  //                               id="Address"
  //                               formControlProps={{
  //                                 fullWidth: true
  //                               }}
  //                             />
  //                           </GridItem>
  //                         </GridContainer>
  //                         </>
  //         }
  //      />
  //      {/* Edit Brand Modal */}
  //      <Modal 
  //         show={editModal} 
  //         closeModal={handleEditClose}
  //         title = "Edit Vehicle Brand"
  //         btnTitle = "Update"
  //         action = {editRecord}
  //         content = {
  //               <TextField
  //               autoFocus
  //               margin="dense"
  //               id="name"
  //               label="Vehicle Brand"
  //               type="name"
  //               fullWidth
  //             />
          
  //         }
  //      />
  //       {/* Delete Brand Modal */}
  //       <Modal 
  //         show={deleteModal} 
  //         closeModal={handleDeleteClose}
  //         title = "Delte Vehicle Brand"
  //         btnTitle = "Delete"
  //         action = {deleteRecord}
  //         content = {
  //        <p>Delete Record!</p> 
  //         }
  //      />
  // </GridContainer>
  
  );
}
