import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./TriviaGame.css";

const TriviaGame = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Helper function to load a new question from the API
  const loadQuestion = () => {
    setLoading(true);
    setSelectedAnswer(null); // Reset the selected answer for the new question
    axios
      .get("http://localhost:5257/api/trivia/questions?difficulty=medium")
      .then((response) => {
        console.log("API response:", response.data);
        // Adjust this line if your API wraps the question in an object (e.g., response.data.results[0])
        setQuestion(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
        setLoading(false);
      });
  };

  // Load the initial question when the component mounts
  useEffect(() => {
    loadQuestion();
  }, []);

  // When an answer is selected, wait a short delay, then load a new question
  useEffect(() => {
    if (selectedAnswer !== null) {
      const timer = setTimeout(() => {
        loadQuestion();
      }, 2000); // 2000 milliseconds = 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [selectedAnswer]);

  // Memoize the shuffled answers so they don't reshuffle on every re-render
  const allAnswers = useMemo(() => {
    if (!question) return [];
    return [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5
    );
  }, [question]);

  if (loading) return <p>Loading question...</p>;
  if (!question) return <p>Too quick, wait a few seconds and try again.</p>;

  // When an answer card is clicked, update selectedAnswer (only once)
  const handleAnswerClick = (answer) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
    }
  };

  // Determine CSS class based on the answer state
  const getAnswerClass = (answer) => {
    if (!selectedAnswer) return "answer-card";
    if (answer === question.correct_answer) return "answer-card correct";
    if (answer === selectedAnswer && answer !== question.correct_answer)
      return "answer-card incorrect";
    return "answer-card";
  };

  return (
    <div className="trivia-game">
      <div className="question">
        <h2>{question.question}</h2>
      </div>
      <div className="answers">
        {allAnswers.map((answer, i) => (
          <div
            key={i}
            className={getAnswerClass(answer)}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TriviaGame;
