import React from 'react';
import '../style/LoadingIndicator.css';
import CircularProgress from 'material-ui/CircularProgress';


const LoadingIndicator = (isLoading) => {
  return (
    <div className="loadingWrapper">
      <div className="loadingIndicator">
        <img src='./images/Logo.svg' alt="logo"/>
        <CircularProgress size={89} className="progress" />
      </div> 
    </div>
  );
}

export default LoadingIndicator;
