import React from 'react';
import './BodyContent.css';

function BodyContent () {
  return (
    <div className="container-bodycontent">
      <div className="username-bodycontent">
        <div className="username-inputDiv-bodycontent">
          <input type="text" placeholder="Username" className="username-input-bodycontent"/>
          <button className="username-submit-button-bodycontent">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default BodyContent;