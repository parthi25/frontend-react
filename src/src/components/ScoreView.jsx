import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

const ScoreView = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("com.questapp.user"));
        if (user && user.id) {
          const id = user.id;
          const response = await axios.get(`http://127.0.0.1:8080/api/find/score?id=${id}`); 
          setScores(response.data);
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);


  return (
    <Container>
      <h2 className="my-4">User Scores</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Quiz</th>
            <th>Score</th>
            <th>Attempt</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.quiz}</td>
              <td>{score.score}</td>
              <td>{score.attempt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ScoreView;
