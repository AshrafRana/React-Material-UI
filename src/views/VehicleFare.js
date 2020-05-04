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
// assets css
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
// serviec api calling
import Service from "services/service";

const useStyles = makeStyles(styles);

export default function VehicleFare() {

  const url = '/packages'
  const service  = new Service();
  const classes = useStyles();

  let initialRecord = {id:'',order: '',model:'',km:'',hours:'',waiting_time:'',service:'',cancellation:'',fare_per_km:''};
  const [record, setRecord] = useState(initialRecord);
  const [recordList, setRecordList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [modelList, setModelList] = useState([]);
  
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
 
  const [errorOrder , setErrorOrder ] = useState();
  const [errorModel , setErrorModel ] = useState();
  const [errorKM , setErrorKM ] = useState();  
  const [errorHours ,setErrorHours] = useState();
  const [errorWating ,setErrorWating] = useState();
  const [errorService ,setErrorService] = useState();
  const [errorCancellation ,setErrorCancellation] = useState();
  const [errorFare ,setErrorFare] = useState();

 const addFiledValidate = ()=>{

  let check = false;

   if(record.order === ""){ check = true; setErrorOrder(true); }
   
   if(record.model === ""){ check = true; setErrorModel(true); }
   
   if(record.km === ""){ check = true; setErrorKM(true); }
   
   if(record.hours === ""){ check = true; setErrorHours(true); }
  
   if(record.waiting_time === ""){check = true;setErrorWating(true);}
  
   if(record.service  === ""){ check = true;  setErrorService(true);}
  
   if(record.cancellation  === ""){ check = true;  setErrorCancellation(true);}
  
   if(record.fare_per_km === ""){ check = true; setErrorFare(true); }
 
   return check;
 }
  const validateSetFalse = () =>{
    
    setErrorModel(false);
    setErrorOrder(false);
    setErrorKM(false);
    setErrorHours(false);
    setErrorWating(false);
    setErrorService(false);
    setErrorCancellation(false);
    setErrorFare(false);
  }

const getOrderList = () =>{
   
    service.getList('/orders')
    .then(res => {
      setOrderList(res.data);
      // console.log(res.data);
    })
    .catch(err => {
      console.log(err.message);
    })
}
const getModelList = () =>{
   
  service.getList('/vehicle/models')
  .then(res => {
    setModelList(res.data);
    // console.log(res.data);
  })
  .catch(err => {
    console.log(err.message);
  })
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
          console.log('error j');
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

        if(!isNaN(record.order)){temp['order'] = record.order;}
        
        if(!isNaN(record.model) ){temp['model'] = record.model;}
        
        if(!isNaN(record.km)){temp['km'] = record.km;}

        if(!isNaN(record.hours)){temp['hours'] = record.hours; }

        if(record.waiting_time !== ""){temp['waiting_time'] = record.waiting_time;}

        if(record.service !== ""){temp['service'] = record.service;}

        if(record.cancellation !== ""){temp['cancellation'] = record.cancellation;}
        
        if(!isNaN(record.fare_per_km)){temp['fare_per_km'] = record.fare_per_km;}
        
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
    getOrderList();
    getModelList();
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
      label: "Order Type",
      name: "order_name",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Vehicle Model",
      name: "model_name",
      options: {
        filter: true,
        sort:true,
      }
    },   
    {
      label: "Kilo-meter",
      name: "km",
      options: {
        filter: true,
        sort:true,
      }
    },
    
    {
      label: "Hours",
      name: "hours",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "Waiting Time",
      name: "waiting_time",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "service",
      name: "service",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "cancellation",
      name: "cancellation",
      options: {
        filter: true,
        sort:true,
      }
    },
    {
      label: "fare per kilometer",
      name: "fare_per_km",
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
  let temp = {id:'',order: '',model:'',km:'',hours:'',waiting_time:'',service:'',cancellation:'',fare_per_km:''};
  temp.id = rowData[0];
  temp.order = rowData[1];
  temp.model = rowData[2];
  temp.km = rowData[3];
  temp.hours = rowData[4];
  temp.waiting_time = rowData[5];
  temp.service = rowData[6];
  temp.cancellation = rowData[7];
  temp.fare_per_km = rowData[8];
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
        <span><Add className={classes.icon} /></span>Vehicle Fare
      </Button>
      </GridItem>
      <GridItem  xs={12} sm={12} md={12}>         
          {load?
            <div className={classes.root}><CircularProgress /> Loading ....</div>          
          : <MUIDataTable 
            title={"Vehicle Fare List"} 
            data={recordList} 
            columns={columns} 
            options={options} 
          />}
      </GridItem>
      {/* Create Modal */}
      <Modal 
          show={modal} 
          closeModal={handleCreateClose}
          title = "Add Vehicle Fare "
          btnTitle =  "Save"
          action = {addRecord}
          content =  {
            <>
              <GridItem  xs={12} sm={12} md={12}>           
              <TextField
                  error = {errorOrder}
                  helperText = {errorOrder ? "please select vehicle brand ":null}
                  id="order"
                  name="order"
                  label="Order Type"
                  select
                  value={record.order}
                  onChange={handleInputChange}
                  fullWidth= {true}
                >
                      
                  {orderList? 
                      orderList.map(option => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}
   
                </TextField>
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}> 
              <TextField
                  error ={errorModel}
                  helperText = {errorModel?"This filed is required":null}
                  id="model"
                  name="model"
                  label="Vehicle Model"
                  select
                  value={record.model}
                  onChange={handleInputChange}
                  fullWidth= {true}
                >
                  {modelList? 
                      modelList.map((option) => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.model}
                        </MenuItem>
                      ))
                  
                  :null}
                    
                </TextField>
                </GridItem>
  
  
                <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorKM}
                 helperText= {errorKM ? "this filed required"  :null}
                  id="km"
                  label="Kilometer"
                  name = "km"
                  value = {record.km}
                  onChange = {handleInputChange}
                  type="number"
                  fullWidth= {true}
                />
                </GridItem>
                <GridItem  xs={12} sm={12} md={12}>  
                <TextField
                 error = {errorHours}
                 helperText= {errorHours ? "this field is required"  :null}
                 id="hours"
                  label="Driving hours"
                  name = "hours"
                  value = {record.hours}
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
                 error = {errorWating}
                 helperText= {errorWating? "this field is requird"  :null}
                  id="waiting_time"
                  label="Wating Time"
                  name = "waiting_time"
                  value = {record.waiting_time}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                 
                />
                </GridItem>

            <GridItem  xs={12} sm={12} md={12}>  
                <TextField
                 error = {errorService}
                 helperText= {errorService? "this field is required"  :null}
                  id="service"
                  label="Services"
                  name = "service"
                  value = {record.service}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                 
                />
                </GridItem>

                <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 error = {errorCancellation}
                 helperText= { errorCancellation ? "this field is required"  :null}
                  id="cancellation"
                  label="Booking Cancellation"
                  name = "cancellation"
                  value = {record.cancellation}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                 
                />
                </GridItem>
                <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 error = {errorFare}
                 helperText= {errorFare? "this field is required"  :null}
                 id="fare_per_km"
                  label="Fare per kilo-meter"
                  name = "fare_per_km"
                  value = {record.fare_per_km}
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
              </>
            }
          
       />
       {/* Edit Modal */}
       <Modal 
          show={editModal} 
          closeModal={handleEditClose}
          title = "Edit Vehicle Fare"
          btnTitle = "Update"
          action = {editRecord}
          content =  {
            <>
              <GridItem  xs={12} sm={12} md={12}>           
              <TextField
                  error = {errorOrder}
                  helperText = {errorOrder ? "please select vehicle brand ":null}
                  id="order"
                  name="order"
                  label="Order Type"
                  select
                  value={record.order}
                  onChange={handleInputChange}
                  fullWidth= {true}
                >
                      
                  {orderList? 
                      orderList.map(option => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))
                  
                  :null}
                  
                {orderList.map(r => (r.name === record.order  ? 
                  <MenuItem key={r.id} value= {r.name}>
                      {r.name}
                  </MenuItem>
                      : null))}

   
                </TextField>
                </GridItem>
  
                <GridItem  xs={12} sm={12} md={12}> 
              <TextField
                  error ={errorModel}
                  helperText = {errorModel?"This filed is required":null}
                  id="model"
                  name="model"
                  label="Vehicle Model"
                  select
                  value={record.model}
                  onChange={handleInputChange}
                  fullWidth= {true}
                >
                  {modelList? 
                      modelList.map((option) => (
                        <MenuItem key={option.id}  value={option.id}>
                          {option.model}
                        </MenuItem>
                      ))
                  
                  :null}
                    
                 {modelList.map(r => (r.model === record.model  ? 
                  <MenuItem key={r.id} value= {r.model}>
                      {r.model}
                  </MenuItem>
                      : null))}

                </TextField>
                </GridItem>
  
  
                <GridItem  xs={12} sm={12} md={12}>         
                <TextField
                 error = {errorKM}
                 helperText= {errorKM ? "this filed required"  :null}
                  id="km"
                  label="Kilometer"
                  name = "km"
                  value = {record.km}
                  onChange = {handleInputChange}
                  type="number"
                  fullWidth= {true}
                />
                </GridItem>
                <GridItem  xs={12} sm={12} md={12}>  
                <TextField
                 error = {errorHours}
                 helperText= {errorHours ? "this field is required"  :null}
                 id="hours"
                  label="Driving hours"
                  name = "hours"
                  value = {record.hours}
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
                 error = {errorWating}
                 helperText= {errorWating? "this field is requird"  :null}
                  id="waiting_time"
                  label="Wating Time"
                  name = "waiting_time"
                  value = {record.waiting_time}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                 
                />
                </GridItem>

            <GridItem  xs={12} sm={12} md={12}>  
                <TextField
                 error = {errorService}
                 helperText= {errorService? "this field is required"  :null}
                  id="service"
                  label="Services"
                  name = "service"
                  value = {record.service}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                 
                />
                </GridItem>

                <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 error = {errorCancellation}
                 helperText= { errorCancellation ? "this field is required"  :null}
                  id="cancellation"
                  label="Booking Cancellation"
                  name = "cancellation"
                  value = {record.cancellation}
                  onChange = {handleInputChange}
                  type="text"
                  fullWidth= {true}
                 
                />
                </GridItem>
                <GridItem  xs={12} sm={12} md={12}>    
                <TextField
                 error = {errorFare}
                 helperText= {errorFare? "this field is required"  :null}
                 id="fare_per_km"
                  label="Fare per kilo-meter"
                  name = "fare_per_km"
                  value = {record.fare_per_km}
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
              </>
            }
       />
        {/* Delete Modal */}
        <Modal 
          show={deleteModal} 
          closeModal={handleDeleteClose}
          title = "Are you sure you want to delete Vehicle Fare?"
          btnTitle = "Delete"
          action = {deleteRecord}
          content ={
          <p>
            <strong> Vehicle Order    : </strong> {record.order} <br/>
            <strong>    Vehicle Model : </strong> {record.model} <br/>
            <strong>Vehicle Kilometer : </strong> {record.km} <br/>
            <strong>    driving hours :  </strong>{record.hours} <br/>
            <strong>      Fare Per KM :  </strong>{record.fare_per_km} <br/>
                          
          </p>}
       />
  </GridContainer>
  );
}
