import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import TaskSection from "./TaskSection";

const TimeSection = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [savedTime, setSavedTime] = useState([]);
  const [currentSavedTime, setCurrentSavedTime] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveTime = () => {
    const newSavedTime = {
      time: formatTime(time),
      title: title,
      description: description,
    };

    setSavedTime((prevSavedTime) => [...prevSavedTime, newSavedTime]);
    setCurrentSavedTime(formatTime(time));
    setShowModal(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Time section </h2>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "1rem 0",
          border: "1px solid black",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        {formatTime(time)}
        <br></br>
        <Button
          variant="primary"
          onClick={handleStart}
          disabled={isRunning}
          className="me-2"
        >
          Start
        </Button>
        <Button
          variant="secondary"
          onClick={handlePause}
          disabled={!isRunning}
          className="me-2"
        >
          Pause
        </Button>
        <Button variant="success" onClick={handleStop} className="me-2">
          Save
        </Button>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: "1rem" }}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>{" "}
          <br />
          <lable>Running Time :</lable>
          <div className="time-section">{formatTime(time)} has been saved.</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTime}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <TaskSection savedTime={savedTime} />
    </div>
  );
};

export default TimeSection;
