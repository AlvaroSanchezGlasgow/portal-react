import React from "react";
import Loader from 'react-loader-spinner'

function SpinnerComponent() {
  return (
    <>
         <Loader
         type="ThreeDots"
         color="#9aae04"
         height={100}
         width={200}
         
      />
    </>
  );
}

export default SpinnerComponent;
