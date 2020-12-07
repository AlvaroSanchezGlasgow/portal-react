import React from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import logo_everis from "../Static/Img/images/logo-everis.png";
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
        <img src={logo_everis} alt="logo everis"/>
      </figure>
      <br />
      <List>
        <ListItem button="true" onClick={() => history.push("/index")}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={"App Users"} />
        </ListItem>
        <ListItem button="true" onClick={() => history.push("/new-user")}>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary={"New User"} />
        </ListItem>

        <ListItem button="true" onClick={() => history.push("/client-mng")}>
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={"Clients List"} />
        </ListItem>
        <ListItem button="true" onClick={() => history.push("/new-client")}>
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={"New Client"} />
        </ListItem>
        <Divider />
        <ListItem
          button="true"
          onClick={() =>
            axios
              .get(
                `${
                  process.env.REACT_APP_API_ROOT_URL
                }/oauth/revoke-token/${sessionStorage.getItem("username")}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization:
                      "Bearer " + sessionStorage.getItem("user_token"),
                  },
                }
              )
              .then(function (response) {
                // handle success
              })
              .catch(function (error) {
                // handle error
              })
              .finally(function () {
                // always executed
                sessionStorage.removeItem("user_token");
                history.push("/");
              })
          }
        >
          <ListItemIcon>
            {" "}
            <ExitToAppIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
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
