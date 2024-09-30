import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { score, total, quizId } = location.state || {};

    // Parse user information from local storage
    const user = JSON.parse(localStorage.getItem("com.questapp.user"));
    const userId = user?.userId;

    useEffect(() => {
        if (userId && quizId !== undefined && score !== undefined) {
            const saveScore = async () => {
                try {
                    const response = await axios.post("http://127.0.0.1:8080/api/add/score", {
                        user: userId,
                        quiz: quizId,
                        score: score,
                        attempt: 1 // Ensure attempt starts from 1 when submitting new score
                    });
                    console.log('Score saved successfully:', response.data);
                } catch (error) {
                    console.error('Error saving score:', error);
                }
            };

            saveScore();
        }
    }, [userId, quizId, score]);

    if (score === undefined || total === undefined) {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Error</h5>
                    <p className="card-text">Required quiz data is missing.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/react/home')}>Go Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Quiz Results</h5>
                    <p className="card-text">You got {score} out of {total} correct!</p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
                </div>
            </div>
        </div>
    );
};

export default Results;
