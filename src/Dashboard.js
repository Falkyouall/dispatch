import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Input, ListItem, ListItemIcon, ListItemText, Tab} from "@mui/material";
import logo from './logo.svg';
import history from './history';
import {useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import UnstyledButtonCustom from "./CoolButton";
import Watcher from "./Watcher";


function Copyright(props) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Smartlane
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState('1');
  const [plannings, setPlanningData] = useState([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  const onReaderLoad = (event) => {
    const data = JSON.parse(event.target.result);
    console.log("done ", data)
    const url = 'localhost:10000/api/loads_profile'

    //TODO SEND DATA FROM HERE TO API!
    Promise.resolve(data)
        .then(() => {
          console.log("you are here")
          setPlanningData([...plannings, [[10, 9, 7, 6, 5, 0], [10, 5, 4, 2, 1, 0]]]);
          setValue('3');
        })
  /*  fetch(url, data)
        .then((response) => {
          console.log(response);
           setPlanningData([...plannings, response.data.data]);
        })
        .catch(err => {

        })*/
  };

  const Values = Object.values(history).filter(x => x.changed === true);
  const sliced = Values.slice(0, 10);
  // console.log(sliced);
  return (

        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} color={'primary'}>
            <Toolbar
                sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}
            >
              <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
              >
                Smart Update Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: [1],
                }}
            >
                <img src={logo} width={50} height={50} alt="logo" className={"App-logo"}/>
                <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
            <Divider />
            {/*<List>{secondaryListItems}</List>*/}
          </Drawer>
          <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
          >
            <Toolbar />
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider',  position:'sticky', top:0 }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Historical Data" value="1" />
                    <Tab label="New Upload" value="2" />
                    <Tab label="Plannings" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign:'left' }}>
                    <Grid container spacing={3}>
                      {sliced.map(({given, returned}, i) =>
                        <React.Fragment key={i}>
                          <Grid item xs={6}>
                            <Typography variant={'h5'}>
                              Initial Planning Result
                            </Typography>
                            <br/>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                              <Watcher id={`before-${i}`} loads={given} />
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant={'h5'}>
                              Dispatcher Update
                            </Typography>
                            <br/>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                              <Watcher id={`after-${i}`} loads={returned} />
                            </Paper>
                          </Grid>
                      </React.Fragment>
                      )}
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                  </Container>
                </TabPanel>
                <TabPanel value="2" style={{textAlign:"left"}}>
                  <label htmlFor="contained-button-file">
                    <Input accept="image/*"
                           id="contained-button-file"
                           type="file"
                           onChange={handleFileChange}
                           style={{ display: 'none' }}
                           hidden={true}/>
                    <UnstyledButtonCustom name={'*does magic*'}/>
                  </label>
                </TabPanel>
                <TabPanel value="3" style={{textAlign:"left"}}>
                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3} justifyContent={'center'}>
                      {!plannings.length ?
                          <Box sx={{textAlign: 'center' }}>
                            <Typography variant={'h5'}>
                              No plannings yet :-(
                            </Typography>
                            <br/>
                            <img src="https://media.giphy.com/media/hEc4k5pN17GZq/giphy.gif" alt="this slowpoke moves"  width="500" />
                          </Box>
                      : null}
                      {plannings.map(([before, after], i) =>
                          <React.Fragment key={i}>
                            <Grid item xs={6}>
                              <Typography variant={'h5'}>
                                Without AI
                              </Typography>
                              <br/>
                              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Watcher id={`before-${i}`} loads={before} />
                              </Paper>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'}>
                                With AI
                              </Typography>
                              <br/>

                              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Watcher id={`after-${i}`} loads={after} />
                              </Paper>
                            </Grid>
                          </React.Fragment>
                      )}
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                  </Container>
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}