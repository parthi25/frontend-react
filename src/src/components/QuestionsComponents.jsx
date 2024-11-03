import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal, Form } from "react-bootstrap";

const QuestionsComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [editQuestion, setEditQuestion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/questions");
      setQuestions(response.data);
    } catch (error) {
      setError("Failed to fetch questions");
      console.error(error);
    }
  };

  const handleEditModalOpen = (question) => {
    setEditQuestion(question);
    setNewQuestionText(question.questionText);
    setNewOptions([
      question.option1,
      question.option2,
      question.option3,
      question.option4,
    ]);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditQuestion(null);
    setNewQuestionText("");
    setNewOptions(["", "", "", ""]);
    setShowEditModal(false);
  };

  const updateQuestion = async () => {
    try {
      const updatedQuestion = {
        id: editQuestion.id,
        question: newQuestionText,
        option1: newOptions[0],
        option2: newOptions[1],
        option3: newOptions[2],
        option4: newOptions[3],
      };
      await axios.put("http://localhost:8080/api/update/questions", updatedQuestion);
      fetchQuestions();
      handleEditModalClose();
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete/questions?id=${questionId}`);
      fetchQuestions();
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
};


  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {questions.length === 0 && !error && (
        <div>No questions available</div>
      )}
      {questions.map((question) => (
        <Card key={question.id} className="mb-3">
          <Card.Body>
            <Card.Title>Question {question.id}</Card.Title>
            <Card.Text>{question.question}</Card.Text>
            <div>
              {[question.option1, question.option2, question.option3, question.option4].map((option, index) => (
                <div key={index}>
                  <label className="m-1">{option}</label>
                </div>
              ))}
            </div>
            <Button variant="primary" className="mr-2" onClick={() => handleEditModalOpen(question)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteQuestion(question.id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formQuestionText">
            <Form.Label>Question Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new question text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formOptions">
            <Form.Label>Options</Form.Label>
            {newOptions.map((option, index) => (
              <Form.Control
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptionsCopy = [...newOptions];
                  newOptionsCopy[index] = e.target.value;
                  setNewOptions(newOptionsCopy);
                }}
                className="mb-2"
              />
            ))}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateQuestion}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuestionsComponent;
