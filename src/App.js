import React from "react";
import TimeSection from "./Components/TimeSection";
import { Container } from "react-bootstrap";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1 className="header">Time Tracking Application</h1>
      <Container>
        <TimeSection />
      </Container>
    </div>
  );
};

export default App;
