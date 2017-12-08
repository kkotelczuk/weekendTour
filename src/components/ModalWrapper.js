import React from 'react';
import '../style/ModalWrapper.css';

const ModalWrapper = props => {
  const handleModalClick = e => e.stopPropagation()
  return (
    <div>
    {props.isOpened && <div className="modalWrapper" onClick={props.onCoverClick}>
      <div className="modal" onClick={handleModalClick}>
        {props.children}
      </div>
    </div>}
    </div>
  );
}
export default ModalWrapper;
