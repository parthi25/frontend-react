import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InsertQuestion() {
    const [error, setError] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [data, setData] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        quiz: "", // Changed quiz_id to quiz to match the backend model
        answer: ""
    });

    useEffect(() => {
        async function fetchQuizzes() {
            try {
                const response = await axios.get("http://localhost:8080/api/quiz");
                setQuizzes(response.data); // Assuming response.data is an array of quizzes
            } catch (error) {
                console.error("Error fetching quizzes:", error);
                setError("Failed to fetch quizzes");
            }
        }
        fetchQuizzes();
    }, []); // Empty dependency array means this effect runs once on mount

    const insert = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/insert/questions", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data === "inserted") {
                setError("Inserted successfully");
            } else {
                setError("Insert failed");
            }
        } catch (error) {
            console.error("Error inserting question:", error);
            setError("Insert failed");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div className='container'>
            <h1 className='head head-center'>Insert Question</h1>
            {error && <div className='alert'>{error}</div>}
            <form onSubmit={insert}>
                <div className='form-group'>
                    <label htmlFor='quiz'>Quiz Title</label>
                    <select name='quiz' className='form-control' onChange={handleChange} required>
                        <option value=''>Select a quiz</option>
                        {quizzes.map((quiz, index) => (
                            <option key={index} value={quiz.id}>{quiz.title}</option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='question'>Question</label>
                    <input type='text' name='question' className='form-control' onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='option1'>Option 1</label>
                    <input type='text' name='option1' className='form-control' onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='option2'>Option 2</label>
                    <input type='text' name='option2' className='form-control' onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='option3'>Option 3</label>
                    <input type='text' name='option3' className='form-control' onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='option4'>Option 4</label>
                    <input type='text' name='option4' className='form-control' onChange={handleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='answer'>Answer</label>
                    <input type='text' name='answer' className='form-control' onChange={handleChange} required />
                </div>
                <input type='submit' value='Insert' className='btn btn-primary' />
            </form>
        </div>
    );
}

export default InsertQuestion;
