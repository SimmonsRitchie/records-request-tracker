import React from 'react';
import Modal from 'react-modal';

// Below, we use setAppElement so that assistive technologies don't get confused by our modal.
// Because it was effecting tests, this won't be in effect if the run environment is a test.
if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app');

// Modal.setAppElement('#app')

const RemovalModal = (props) => (
    <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Delete expense?"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">Are you sure you want to delete this request?</h3>
        <div className="modal__button-container">
            <button className="button" onClick={props.onRemove}>Confirm</button>
            <button className="button" onClick={props.closeModal}>Cancel</button>     
        </div>
    </Modal>
);
export default RemovalModal;