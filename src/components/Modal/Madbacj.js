import React from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/cardImagesStyles.js";

import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Remove from "@material-ui/icons/Remove";
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal() {
  const [modal, setModal] = React.useState(false);
  const classes = useStyles();
  return (
    <div>
      <Button color="info"  onClick={() => setModal(true)}>
        <span><Add className={classes.icon} /></span>Add Brand
      </Button>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={modal}
        transition={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button justIcon onClick={() => setModal(false)}>
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Add Vehicle Brand</h4>
        </DialogTitle>
        
        
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Vehicle Brand"
            type="email"
            fullWidth
          />
        </DialogContent>
        
        <DialogActions className={classes.modalFooter + " " + classes.modalFooterCenter}>
          <Button onClick={() => setModal(false)}>Close</Button>
          <Button onClick={() => setModal(false)} color="success">Save</Button>
        </DialogActions>
      
      </Dialog>
    </div>
  );
}