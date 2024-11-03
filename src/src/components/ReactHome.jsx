import React from "react";
import { NavLink } from "react-router-dom";

function ReactHome() {
  return (
    <div>
      <h1 className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <span className="text-light">Welco</span>
        <span className="text-dark">me to QuestApp!</span>
      </h1>
      <div className="p-4 rounded" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}>
        <p className="mb-4 fs-5">
          <strong>Unleash your inner trivia champion!</strong> At QuestApp, we bring you exciting and challenging quizzes that test your knowledge across various topics, from history and science to pop culture and beyond.
        </p>

        <p className="fs-5">
          <strong>Getting Started:</strong><br />
          If you're new here, <span className="text-info">register an account</span> to save your progress and compete on the leaderboard. Already have an account? <span className="text-info">Log in</span> and pick up right where you left off!
        </p>

        <p className="fs-5">
          <strong>How It Works:</strong>
          <ul className="mt-2">
            <li>Choose Your Quiz – Browse through categories or pick a random quiz.</li>
            <li>Test Your Knowledge – Answer questions, earn points, and see how you rank!</li>
            <li>Challenge Friends – Share your scores and invite friends to join the fun.</li>
          </ul>
          Dive in, discover new facts, and have a blast learning. Ready to get started? <NavLink to="/signup" className="text-info">Sign up</NavLink> or <NavLink to="/login" className="text-info">Login</NavLink> now, and let’s quiz!
        </p>
      </div>
    </div>
  );
}

export default ReactHome;
