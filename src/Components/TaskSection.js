import React from "react";
import { Table } from "react-bootstrap";

const TaskSection = ({ savedTime }) => {
  return (
    <>
      <h2>Task section List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Time Tracked</th>
          </tr>
        </thead>
        <tbody>
          {savedTime.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TaskSection;
