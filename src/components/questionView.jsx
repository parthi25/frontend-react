import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Quiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState([]);
    const [seconds, setSeconds] = useState(30);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/questions/byid?quizId=${quizId}`);
                console.log('Fetched quiz data:', response.data);
                if (response.data && Array.isArray(response.data)) {
                    setQuiz(response.data);
                    setSelectedAnswers(Array(response.data.length).fill(null));
                } else {
                    console.error("Fetched data structure is not as expected:", response.data);
                }
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        fetchQuiz();
    }, [quizId]);

    useEffect(() => {
        if (seconds > 0) {
            const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            goToNextQuestion();
        }
    }, [seconds]);

    const handleOptionClick = (optionText) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[questionIndex] = optionText;
        setSelectedAnswers(newAnswers);
    };

    const goToNextQuestion = () => {
        if (questionIndex < quiz.length - 1) {
            setQuestionIndex(questionIndex + 1);
            setSeconds(30);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        selectedAnswers.forEach((answer, index) => {
            if (answer === quiz[index].answer) {
                correctAnswers++;
            }
        });
        navigate('/results', { state: { score: correctAnswers, total: quiz.length, quizId: quizId, attempt: 1 } });
    };

    if (quiz.length === 0) return <div>Loading...</div>;

    return (
      <div className="body2">
        <div className="log"><div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Question {questionIndex + 1}</h5>
                    <p className="card-text">{quiz[questionIndex].question}</p>
                    <div className="list-group">
                        {[1, 2, 3, 4].map(index => (
                            <button
                                key={index}
                                className={`list-group-item list-group-item-action ${selectedAnswers[questionIndex] === quiz[questionIndex][`option${index}`] ? 'active' : ''}`}
                                onClick={() => handleOptionClick(quiz[questionIndex][`option${index}`])}
                            >
                                {quiz[questionIndex][`option${index}`]}
                            </button>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        {questionIndex < quiz.length - 1 ? (
                            <button className="btn btn-primary" onClick={goToNextQuestion}>Next</button>
                        ) : (
                            <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
                        )}
                        <span className="badge badge-warning">{seconds} seconds left</span>
                    </div>
                </div>
            </div>
        </div></div>
      </div>  
    );
};

export default Quiz;
