import React from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal = props => {
 
  // const [modal, setModal] = React.useState(false);
  const classes = useStyles();

  return (
    <div>
      
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={props.show}
        transition={Transition}
        keepMounted
        onClose={props.closeModal}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader} >

          <h4 className={classes.modalTitle}>{props.title}</h4>
        </DialogTitle>
               
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          {props.content}
       
        </DialogContent>
        
        <DialogActions className={classes.modalFooter + " " + classes.modalFooterCenter}>
          <Button onClick={() => props.closeModal()}>Close</Button>
          <Button onClick={() => props.action()} color="success">{props.btnTitle}</Button>
        </DialogActions>
      
      </Dialog>
    </div>
  );
}

export default Modal;