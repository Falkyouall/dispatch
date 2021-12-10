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
} from "@mui/material";
import {forwardRef, useState} from "react";
import Divider from "@mui/material/Divider";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const slides = [
    {
        title: 'Noticing the difference',
        description: 'For some time we have observed dispatchers updating their processes.\n' +
            'We wanted to use artificial intelligence to determine which criteria dispatchers use to make changes.\n' +
            'For this purpose, we have imported the following features from tours.',
        icon: 'https://media.giphy.com/media/KeuFUkFtP05s0f3Egj/giphy.gif'
    },
    {
        title: 'Load distribution',
        description: 'We took shipment loads to quantify the tour by average weight and see if the dispatcher could have been guided by this parameter when re-sorting.',
        icon: 'https://media.giphy.com/media/kfWSRqFmgxsg9hOAym/giphy.gif'
    },
    {
        title: 'Utilisation of the vehicle',
        description: 'As another feature we have decided to use the maximum utilization of the vehicle. Would the dispatcher re-sort according to this criterion?',
        icon: 'https://media.giphy.com/media/KyyJRhwZClyEM/giphy.gif'
    },
    {
        title: 'Position of the heaviest',
        description: 'We also decided to add a feature that describes the position of the heaviest shipments.',
        icon: 'https://media.giphy.com/media/EMRVGHZ5ZiV7a/giphy.gif'
    },
    {
      title: 'Shipments over time',
      description: 'The last feature refers to the charge over time, could it be that there is a relationship between charge weight and time within a tour? \n' +
          '\n Lets have a look at Historical data in the Weightwatcher.',
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
              <Grid container justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={6}>
                  <DialogContentText variant={'h4'} id="alert-dialog-slide-description">
                    {`${slide.description}`}
                  </DialogContentText>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{display:'flex', justifyContent:'center'}}>
                    {slide.icon && <img width={400} src={slide.icon} alt={slide.title}/>}
                  </Box>
                </Grid>
              </Grid>
          </DialogContent>
        <Divider />
        <DialogActions>
          <Grid container justifyContent={'space-between'}>
            <Button onClick={props.onClose}>Close</Button>
              <span>
                 <Button disabled={slideIndex-1 < 0} variant={'outlined'} onClick={() => setSlide(slideIndex-1)}>
                   Back
                 </Button>
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