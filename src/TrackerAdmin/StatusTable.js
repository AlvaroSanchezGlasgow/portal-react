import React from "react";
import DoneAllIcon from "@material-ui/icons/CheckCircleOutline";
import ClearIcon from "@material-ui/icons/HighlightOffRounded";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import PowerIcon from "@material-ui/icons/Power";

function StatusTable(props) {
  return (
    <>
      <div className="sector_client">
        <center>
          <table className="table table is-fullwidth" id="tableSector">
            <tr>
              <td colspan="4" align="center">
                <PowerIcon />
                <strong>Electricity</strong>
              </td>
            </tr>
            <tr>
            <td></td>
              <td>Supply</td>
              <td>Generation</td>
              <td>Distribution</td>
            </tr>
            <tr>
            <td>
            </td>
              <td>
                {props.sector === 1 ? (
                  <td>
                    <DoneAllIcon style={{ color: "#9aae04", fontSize: 40 }} />
                  </td>
                ) : (
                  <td>
                    <ClearIcon style={{ fontSize: 40 }} />
                  </td>
                )}
              </td>
              <td>
                {props.sector === 2 ? (
                  <td>
                    <DoneAllIcon style={{ color: "#9aae04", fontSize: 40 }} />
                  </td>
                ) : (
                  <td>
                    <ClearIcon style={{ fontSize: 40 }} />
                  </td>
                )}
              </td>
              <td>
                {props.sector === 3 ? (
                  <td>
                    <DoneAllIcon style={{ color: "#9aae04", fontSize: 40 }} />
                  </td>
                ) : (
                  <td>
                    <ClearIcon style={{ fontSize: 40 }} />
                  </td>
                )}
              </td>
            </tr>
            
            <tr>
              <td colspan="4" align="center">
                <WhatshotIcon />
                <strong>Gas</strong>
              </td>
            </tr>
            <tr>
            <td></td>
              <td>Supply</td>
              <td>Generation</td>
              <td>Distribution</td>
            </tr>
            <tr>
            <td>
            </td>
              <td>
                {props.sector === 4 ? (
                  <td>
                    <DoneAllIcon style={{ color: "#9aae04", fontSize: 40 }} />
                  </td>
                ) : (
                  <td>
                    <ClearIcon style={{ fontSize: 40 }} />
                  </td>
                )}
              </td>
              <td>
                {props.sector === 5 ? (
                  <td>
                    <DoneAllIcon style={{ color: "#9aae04", fontSize: 40 }} />
                  </td>
                ) : (
                  <td>
                    <ClearIcon style={{ fontSize: 40 }} />
                  </td>
                )}
              </td>
              <td>
                {props.sector === 6 ? (
                  <td>
                    <DoneAllIcon style={{ color: "#9aae04", fontSize: 40 }} />
                  </td>
                ) : (
                  <td>
                    <ClearIcon style={{ fontSize: 40 }} />
                  </td>
                )}
              </td>
            </tr>
          </table>
        </center>
      </div>
    </>
  );
}

export default StatusTable;
