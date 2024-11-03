// AdminView.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Spinner, Alert, Button } from "react-bootstrap";
import QuizzesComponent from "./QuizzesComponent";
import QuestionsComponent from "./QuestionsComponents";
import ScoresComponent from "./ScoresComponent";
import { NavLink } from "react-router-dom";

const AdminView = () => {
  const [data, setData] = useState({
    quizzes: [],
    scores: [],
    questions: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showQuizzes, setShowQuizzes] = useState(false); // State for quizzes component visibility
  const [showQuestions, setShowQuestions] = useState(false); // State for questions component visibility
  const [showScores, setShowScores] = useState(false); // State for scores component visibility

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [questionsResponse, quizzesResponse, scoresResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8080/api/questions"),
          axios.get("http://127.0.0.1:8080/api/quiz"),
          axios.get("http://127.0.0.1:8080/api/scores"),
        ]);

        setData({
          questions: questionsResponse.data,
          quizzes: quizzesResponse.data,
          scores: scoresResponse.data,
        });

        console.log(scoresResponse.data, questionsResponse.data, quizzesResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleQuizzes = () => {
    setShowQuizzes(!showQuizzes);
    setShowQuestions(false); // Close other components
    setShowScores(false);
  };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions);
    setShowQuizzes(false); // Close other components
    setShowScores(false);
  };

  const toggleScores = () => {
    setShowScores(!showScores);
    setShowQuizzes(false); // Close other components
    setShowQuestions(false);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error fetching data: {error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Button variant="primary" onClick={toggleQuizzes} active={showQuizzes}>
          {showQuizzes ? "Hide Quizzes" : "Show Quizzes"}
        </Button>
        <NavLink to={"/admin/insert/quiz"}>Add New Quiz</NavLink>
      </Row>
      {showQuizzes && (
        <Row>
          <QuizzesComponent quizzes={data.quizzes} />
        </Row>
      )}

      <Row>
        <Button variant="primary" onClick={toggleQuestions} active={showQuestions}>
          {showQuestions ? "Hide Questions" : "Show Questions"}
        </Button>
        <NavLink to={"/admin/insert/question"}>Add New Question</NavLink>
      </Row>
      {showQuestions && (
        <Row>
          <QuestionsComponent questions={data.questions} />
        </Row>
      )}

      <Row>
        <Button variant="primary" onClick={toggleScores} active={showScores}>
          {showScores ? "Hide Scores" : "Show Scores"}
        </Button>
      </Row>
      {showScores && (
        <Row>
          <ScoresComponent scores={data.scores} />
        </Row>
      )}
    </Container>
  );
};

export default AdminView;
