import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteModalProps {
    show: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, handleClose, handleConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Yes, Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
