import axios from 'axios';
import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const QuizzesComponent = ({ quizzes }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(
    quizzes.reduce((acc, quiz) => {
      acc[quiz.id] = { title: quiz.title, description: quiz.description };
      return acc;
    }, {})
  );

  // Function to handle changes in input fields
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [name]: value,
      },
    }));
  };

  // Function to handle update or delete operation
  const handleAction = async (e, action, quiz_id) => {
    e.preventDefault();

    try {
      if (action === 'edit') {
        const { title, description } = formData[quiz_id];
        console.log('Editing quiz:', { quiz_id, title, description });
        const res = await axios.put("http://127.0.0.1:8080/api/update/quiz", { id: quiz_id, title, description });
        if (res.data === "updated") {
          setError("Quiz updated successfully");
        } else {
          setError("Quiz update failed");
        }
      } else if (action === 'delete') {
        console.log('Deleting quiz:', { quiz_id });
        const res = await axios.delete(`http://127.0.0.1:8080/api/delete/quiz?id=${quiz_id}`);
        if (res.data === "deleted") {
          setError("Quiz deleted successfully");
          // Optionally, update quizzes state after deletion if needed
        } else {
          setError("Quiz deletion failed");
        }
      }
      navigate("/admin/home"); // Redirect after update or delete
    } catch (error) {
      console.error("Error occurred:", error);
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <Card>
      {error && <div className='alert'>{error}</div>}
      <Card.Header>Quizzes</Card.Header>
      <ListGroup variant="flush">
        {quizzes.map((quiz) => (
          <form key={quiz.id}>
            <input type='hidden' name='quiz_id' value={quiz.id} />
            <input
              type='text'
              name='title'
              value={formData[quiz.id].title}
              onChange={(e) => handleChange(e, quiz.id)}
            />
            <input
              type='text'
              name='description'
              value={formData[quiz.id].desc}
              onChange={(e) => handleChange(e, quiz.id)}
            />
            <button type='button' onClick={(e) => handleAction(e, 'edit', quiz.id)}>Edit</button>
            <button type='button' onClick={(e) => handleAction(e, 'delete', quiz.id)}>Delete</button>
          </form>
        ))}
      </ListGroup>
    </Card>
  );
};

export default QuizzesComponent;
