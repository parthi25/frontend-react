import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./HomeBody";

import Quest from "./Quest";
import Admin from "./Admin";
import AdminView from "./AdminView";
import Quiz from './questionView';
import Results from './result';
import NotFound from './NotFound';  
import ProfileDashboard from "./ProfileDashboard"; // Ensure this path is correct
import InsertQuestion from "./InsertQuestion";
import InsertQuiz from "./insertQuiz";
import ScoreView from "./ScoreView";
import ReactHome from "./ReactHome";
import Login from "./login";

function Pages({ user }) {
    return (
        <Routes>
            <Route path="/" element={ <ReactHome />}/>
            <Route path="/admin/home" element={<AdminView />} />
            <Route path="/admin/insert/question" element={<InsertQuestion />} />
            <Route path="/admin/insert/quiz" element={<InsertQuiz />} />
            <Route path="/quest" element={<Quest />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/react/home" element={<Home />} />
            <Route path="/profile" element={<ProfileDashboard userId={user?.userId} />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
            <Route path="/user/score" element={ <ScoreView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
        </Routes>
    );
}

export default Pages;
