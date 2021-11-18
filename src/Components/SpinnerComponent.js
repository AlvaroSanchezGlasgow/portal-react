import React from "react";
import Loader from 'react-loader-spinner'

function SpinnerComponent() {
  return (
    <>
         <Loader
         type="ThreeDots"
         color="#005A87"
         height={100}
         width={200}
         
      />
    </>
  );
}

export default SpinnerComponent;
