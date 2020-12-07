import React from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Fab from '@material-ui/core/Fab';
import Tooltip from "@material-ui/core/Tooltip";
import ScrollToTop from "react-scroll-up";

export const FooterMenuComponent = () => {
  return (
    <>
      <nav
        className="navbar is-white is-fixed-bottom"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <div className="navbar-item">&copy; 2020 All Rights Reserved</div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
          <ScrollToTop showUnder={1}>
            <Tooltip title="Scroll Up">
              <Fab color="primary">
                <KeyboardArrowUpIcon style={{color:'white',fontSize:'40px'}}/>
              </Fab>
            </Tooltip>
          </ScrollToTop>

          </div>
        </div>
      </nav>
    </>
  );
};

export default FooterMenuComponent;
