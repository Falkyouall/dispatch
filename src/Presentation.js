import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid,
  Slide,
  Typography
} from "@mui/material";
import {forwardRef, useState} from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const slides = [
    {
        title: 'Noticing the difference',
        description: 'For some time we have observed dispatchers updating their processes.\n' +
            'We wanted to use artificial intelligence to find out which criteria dispatchers use to make changes.\n' +
            'For this purpose, we have imported the following properties from tours',
        icon: 'https://media.giphy.com/media/KeuFUkFtP05s0f3Egj/giphy.gif'
    },
    {
        title: 'Load Distribution',
        description: 'We took shipment loads to quantify the tour by average weight and see if the dispatcher could have been guided by this parameter when re-sorting.',
        icon: 'https://media.giphy.com/media/kfWSRqFmgxsg9hOAym/giphy.gif'
    },
    {
        title: 'Utilisation of the Vehicle',
        description: 'as another label we have decided to use the maximum utilization of the vehicle. Would the dispatcher re-sort according to this criterion?',
        icon: 'https://media.giphy.com/media/KyyJRhwZClyEM/giphy.gif'
    },
    {
        title: 'Position of the Heaviest',
        description: 'We also decided to add a label that describes the position of the heaviest shipments.',
        icon: 'https://media.giphy.com/media/EMRVGHZ5ZiV7a/giphy.gif'
    },
    {
      title: 'Load over Time',
      description: 'The last label refers to the charge over time, could it be that there is a relationship between charge weight and time within a tour?',
      icon: 'https://media.giphy.com/media/pPhyAv5t9V8djyRFJH/giphy.gif'
    }
  ]

function Presentation(props) {
  const [slideIndex, setSlide] = useState(0)
  const slide = slides[slideIndex]
  return(
      <Dialog
          open={props.open}
          TransitionComponent={Transition}
          keepMounted
          maxWidth={'xl'}
          onClose={props.onClose}
          aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color={'primary'} variant={'h3'}>{slide.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container justifyContent={'center'}>
              <Grid item xs={6}>
                <Typography variant={'h5'}>{slide.description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{display:'flex', justifyContent:'center'}}>
                  {slide.icon && <img width={400} src={slide.icon} alt={slide.title}/>}
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent={'space-between'}>
            <Button onClick={props.onClose}>Close</Button>
              <span>
                 <Button  variant={'outlined'} onClick={() => setSlide(slideIndex-1)}>Back</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                      variant={'outlined'}
                      onClick={() => slideIndex+1 < slides.length ? setSlide(slideIndex+1) : props.onClose()}>
                        next
                  </Button>
              </span>
          </Grid>

        </DialogActions>
      </Dialog>
  )
}

export default Presentation;