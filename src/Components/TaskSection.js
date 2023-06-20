import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";

const TaskSection = ({ savedTime }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTitle(savedTime[index].title);
    setEditedDescription(savedTime[index].description);
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedSavedTime = [...savedTime];
      updatedSavedTime[editIndex].title = editedTitle;
      updatedSavedTime[editIndex].description = editedDescription;
      setEditedTitle("");
      setEditedDescription("");
      setEditIndex(null);
      setShowEditModal(false);
    }
  };

  const handleModalClose = () => {
    setEditedTitle("");
    setEditedDescription("");
    setEditIndex(null);
    setShowEditModal(false);
  };

  return (
    <>
      <h1>Task section List</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Time Tracked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedTime.map((item, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                ) : (
                  item.title
                )}
              </td>

              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                ) : (
                  item.description
                )}
              </td>

              <td>{item.time}</td>

              <td>
                {editIndex === index ? (
                  <>
                    <Button variant="primary" onClick={handleSave}>
                      Save
                    </Button>

                    <Button variant="secondary" onClick={handleModalClose}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="info" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}

      <Modal show={showEditModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div style={{ marginBottom: "1rem" }}>
            <label>Title</label>

            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <label>Description:</label>
          <input
            type="text"
            value={editedDescription}
            className="form-control"
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskSection;
