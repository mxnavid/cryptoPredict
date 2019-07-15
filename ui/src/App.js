import React from "react";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { IconButton } from "@material-ui/core";


import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

// import { Dashboard } from "./components/Dashboard";
// import { Portfolio } from "./components/Portfolio";
// import { Bitcoin } from "./components/Bitcoin";

import Grid from "@material-ui/core/Grid";

import LineEx from './components/LineEx/LineEx'
import MultiLineEx from './components/LineEx/MultiLineEx'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  toolbar: theme.mixins.toolbar
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Cryptowatch
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "Search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Views
              </ListSubheader>
            }
          >
            {["Dashboard", "Portfolio"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

          <Divider />

          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Cryptocurrencies
              </ListSubheader>
            }
            Î
          >
            {["Bitcoin", "Litecoin", "Ethereum"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

          <Divider />

        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Tools
            </ListSubheader>
          }

        >
          {["Sentiment Analysis", "Charts Galore", "Playground (To Be Removed)", "Settings"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <LineEx name="Bitcoin" label="Price" x="v.Time" y="v.Open" color="rgba(20,120,20,1)"/>
          </Grid>
          <Grid item xs={4}>
            <LineEx name="Litecoin" label="Price"  x="v.Time" y="v.Open" color="rgba(120,20,20,1)"/>
          </Grid>
          <Grid item xs={4}>
            <LineEx name="Ethereum" label="Price" x="v.Time" y="v.Open" color="rgba(20,20,120,1)"/>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MultiLineEx name="Price" x="v.Time" y="v.Open"/>
          </Grid>
          <Grid item xs={6}>
            <MultiLineEx name="Sentiment" x="v.Time" y="v.Polarity"/>
          </Grid>
        </Grid>
        </main>
      </div>
    </Router>
  );
}

export default App;
