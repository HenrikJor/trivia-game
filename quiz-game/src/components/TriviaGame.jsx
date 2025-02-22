import { useState, useEffect } from "react";
import axios from "axios";

const TriviaGame = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5257/api/trivia/questions")
          .then(response => {
            setQuestions(response.data.results);
            setLoading(false);
          })
          .catch(error => console.error("Error fetching questions:", error));
      }, []);
    
      if (loading) return <p>Loading questions...</p>;
    
      return (
        <div>
          <h2>Trivia Game</h2>
          {questions.map((q, index) => (
            <div key={index}>
              <h3>{q.question}</h3>
              <ul>
                {[...q.incorrect_answers, q.correct_answer].sort().map((answer, i) => (
                  <li key={i}>{answer}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    };
    
    export default TriviaGame;