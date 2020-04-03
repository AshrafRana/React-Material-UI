import React,{useState} from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Modal from "components/Modal/Modal.js"

import TextField from '@material-ui/core/TextField';


import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import MUIDataTable from "mui-datatables";

import styles from "assets/jss/material-dashboard-react/cardImagesStyles.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function Brand() {

  const classes = useStyles();
  const columns = [
    
    {
      label: "ID ",
      name: "Age",
      options: {
        filter: true,
        sort: true,
       }
      
    },
    {
      label: "Vehicle Brands",
      name: "Title",
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
            // <Button color="warning" onClick={() =>handleEditShow()}>
            //     <span><Edit className={classes.icon} /></span>
            // </Button>
            <span onClick={() =>handleEditShow()}><Edit className={classes.icon} /></span>
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
            <>
            {/* <Button color="danger" onClick={() => handleDeleteShow()}>
              
            </Button> */}
           
           <span onClick={() => handleDeleteShow()}><Close className={classes.icon} /></span>
            </>
          );
        }
      }
    },
    
  ];

  const data = [
    {Name: "Gabby George", Title: "Business Analyst", Location: "Minneapolis", Age: 30, Salary: "$100,000"},
    {Name: "Aiden Lloyd", Title: "Business Consultant", Location: "Dallas", Age: 55, Salary: "$200,000"},
    {Name: "Jaden Collins", Title: "Attorney", Location: "Santa Ana", Age: 27, Salary: "$500,000"},
    {Name: "Franky Rees", Title: "Business Analyst", Location: "St. Petersburg", Age: 22, Salary: "$50,000"},
    {Name: "Aaren Rose", Title: "Business Consultant", Location: "Toledo", Age: 28, Salary: "$75,000"},
    {Name: "Blake Duncan", Title: "Business Management Analyst", Location: "San Diego", Age: 65, Salary: "$94,000"},
    {Name: "Frankie Parry", Title: "Agency Legal Counsel", Location: "Jacksonville", Age: 71, Salary: "$210,000"},
    {Name: "Lane Wilson", Title: "Commercial Specialist", Location: "Omaha", Age: 19, Salary: "$65,000"},
    {Name: "Robin Duncan", Title: "Business Analyst", Location: "Los Angeles", Age: 20, Salary: "$77,000"},
    {Name: "Mel Brooks", Title: "Business Consultant", Location: "Oklahoma City", Age: 37, Salary: "$135,000"},
    {Name: "Harper White", Title: "Attorney", Location: "Pittsburgh", Age: 52, Salary: "$420,000"},
    {Name: "Kris Humphrey", Title: "Agency Legal Counsel", Location: "Laredo", Age: 30, Salary: "$150,000"},
    {Name: "Frankie Long", Title: "Industrial Analyst", Location: "Austin", Age: 31, Salary: "$170,000"},
    {Name: "Brynn Robbins", Title: "Business Analyst", Location: "Norfolk", Age: 22, Salary: "$90,000"},
    {Name: "Justice Mann", Title: "Business Consultant", Location: "Chicago", Age: 24, Salary: "$133,000"},
    {Name: "Addison Navarro", Title: "Business Management Analyst", Location: "New York", Age: 50, Salary: "$295,000"},
    {Name: "Jesse Welch", Title: "Agency Legal Counsel", Location: "Seattle", Age: 28, Salary: "$200,000"},
    {Name: "Eli Mejia", Title: "Commercial Specialist", Location: "Long Beach", Age: 65, Salary: "$400,000"},
    {Name: "Gene Leblanc", Title: "Industrial Analyst", Location: "Hartford", Age: 34, Salary: "$110,000"},
    {Name: "Danny Leon", Title: "Computer Scientist", Location: "Newark", Age: 60, Salary: "$220,000"},
    {Name: "Lane Lee", Title: "Corporate Counselor", Location: "Cincinnati", Age: 52, Salary: "$180,000"},
    {Name: "Jesse Hall", Title: "Business Analyst", Location: "Baltimore", Age: 44, Salary: "$99,000"},
    {Name: "Danni Hudson", Title: "Agency Legal Counsel", Location: "Tampa", Age: 37, Salary: "$90,000"},
    {Name: "Terry Macdonald", Title: "Commercial Specialist", Location: "Miami", Age: 39, Salary: "$140,000"},
    {Name: "Justice Mccarthy", Title: "Attorney", Location: "Tucson", Age: 26, Salary: "$330,000"},
    {Name: "Silver Carey", Title: "Computer Scientist", Location: "Memphis", Age: 47, Salary: "$250,000" },
    {Name: "Franky Miles", Title: "Industrial Analyst", Location: "Buffalo", Age: 49, Salary: "$190,000"},
    {Name: "Glen Nixon", Title: "Corporate Counselor", Location: "Arlington", Age: 44, Salary: "$80,000"},
    {Name: "Gabby Strickland", Title: "Business Process Consultant", Location: "Scottsdale", Age: 26, Salary: "$45,000"},
    {Name: "Mason Ray", Title: "Computer Scientist", Location: "San Francisco", Age: 39, Salary: "$142,000"}
  ];

  
  const [modal, setModal] = useState(false);
  const handleCreateShow = () => setModal(true);
  const handleCreateClose = () => setModal(false);


  const [editModal, seteditModal] = useState(false);
  const handleEditShow = () => seteditModal(true);
  const handleEditClose = () => seteditModal(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteShow = () => setDeleteModal(true);
  const handleDeleteClose = () => setDeleteModal(false);

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

  return (
  <GridContainer>
      <GridItem  xs={4} sm={4} md={2}>
      <Button color="info"  onClick={() => handleCreateShow()}>
        <span><Add className={classes.icon} /></span>Add Brand
      </Button>
      </GridItem>
      <GridItem  xs={12} sm={12} md={12}>
          <MUIDataTable 
            title={"Brand List"} 
            data={data} 
            columns={columns} 
            // options={options} 
          />
      </GridItem>
      {/* Create Brand Modal */}
      <Modal 
          show={modal} 
          closeModal={handleCreateClose}
          title = "Add Vehicle Brand"
          btnTitle = "Save"
          action = {addRecord}
          content = {
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Vehicle Brand"
                type="name"
                fullWidth
              />
          
          }
       />
       {/* Edit Brand Modal */}
       <Modal 
          show={editModal} 
          closeModal={handleEditClose}
          title = "Edit Vehicle Brand"
          btnTitle = "Update"
          action = {editRecord}
          content = {
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Vehicle Brand"
                type="name"
                fullWidth
              />
          
          }
       />
        {/* Delete Brand Modal */}
        <Modal 
          show={deleteModal} 
          closeModal={handleDeleteClose}
          title = "Delte Vehicle Brand"
          btnTitle = "Delete"
          action = {deleteRecord}
          content = {
         <p>Delete Record!</p> 
          }
       />
  </GridContainer>
  
  );
}
