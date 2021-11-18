import React from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import HomeIcon from '@material-ui/icons/Home';
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Tooltip from "@material-ui/core/Tooltip";
import logo from "../assets/img/img/bip_logo.png";

import business_plan from "../assets/img/svg/business_plan.svg";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from '@material-ui/icons/Menu';

const axios = require("axios");

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function AsideDrawerComponent() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  let history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <figure class="image">
      <img alt="" src={logo} />
      </figure>
      <br />
      <List>
      <ListItem button="true" onClick={() => history.push("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <Divider />
        <ListItem button="true" onClick={() => history.push("/users")}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={"Users Administration"} />
        </ListItem>
     
        <ListItem button="true" onClick={() => history.push("/client-mng")}>
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={"Clients Administration"} />
        </ListItem>

        <ListItem button="true" onClick={() => history.push("/my-clients")}>
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary={"My Clients"} />
        </ListItem>
     
     
        
      </List>
    </div>
  );
  return (
    <>
      <div>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Tooltip title="Display Menu">
              <Fab color="primary" onClick={toggleDrawer(anchor, true)}>
                <MenuIcon
                  style={{ color: "white" }}
                />
              </Fab>
            </Tooltip>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default AsideDrawerComponent;
