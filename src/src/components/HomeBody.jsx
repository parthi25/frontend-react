
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
       const res= axios.get('http://127.0.0.1:8080/api/quiz')
            .then(response => setQuizzes(response.data))
            .catch(error => console.error("Error fetching quizzes:", error));
            console.log(res)
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                {quizzes.map(quiz => (
                    <div className="col-md-4 mb-4" key={quiz.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <img src='' alt=' find it'/>
                                <h5 className="card-title">{quiz.title}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <Link to={`/quiz/${quiz.id}`} className="btn btn-primary">Start Quiz</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
