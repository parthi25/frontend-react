import axios from 'axios';
import React, { useState } from 'react';

function InsertQuiz() {
    const [error, setError] = useState(""); // State to manage error messages
    const [data, setData] = useState({     // State to store form data
        title: "",
        description: ""
    });

    // Function to handle form submission
    const insert = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        try {
            // Sending a POST request to insert quiz title and description
            const response = await axios.post("http://localhost:8080/api/insert/quiz", data);
            
            // Checking response from the server
            if (response.data === "inserted") {
                setError("Inserted successfully"); // Update error state if insert is successful
            } else {
                setError("Insert failed"); // Update error state if insert fails
            }
        } catch (error) {
            console.error("Error inserting quiz:", error);
            setError("Insert failed"); // Update error state if an error occurs during insertion
        }
    };

    // Function to update state on input change
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <h1 className='head head-center'>Insert Quiz</h1>
            {error && <div className='alert'>{error}</div>} {/* Display error message if error state is not empty */}
            <form onSubmit={insert}>
                <div className='form-group'>
                    <label>Title</label>
                    <input
                        type='text'
                        name='title'
                        value={data.title}
                        className='form-control'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <input
                        type='text'
                        name='description'
                        value={data.description}
                        className='form-control'
                        onChange={handleChange}
                        required
                    />
                </div>
                <input type='submit' value='Insert' className='btn btn-primary' /> {/* Submit button */}
            </form>
        </div>
    );
}

export default InsertQuiz;
