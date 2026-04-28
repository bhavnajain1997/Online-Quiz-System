import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const navigate = useNavigate();

  // fetch questions
  useEffect(() => {
    axios.get('http://localhost:5000/questions')
      .then(res => {
        setQuestions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQ = questions[currentIndex];
      setSelected(answers[currentQ.id] || "");
    }
  }, [currentIndex, questions, answers]);

  const handleSelect = (value) => {
    setSelected(value);

    setAnswers({
      ...answers,
      [questions[currentIndex].id]: value
    });
  };

const nextQuestion = () => {
  setShowAnswer(false);

  if (currentIndex < questions.length - 1) {
    setCurrentIndex(currentIndex + 1);
  } else {
    console.log("LAST QUESTION REACHED");

    axios.post("http://localhost:5000/submit", {
      answers
    })
    .then(res => {
      console.log("API RESPONSE:", res.data); 

      navigate("/result", {
        state: {
          score: res.data.score,
          total: questions.length
        }
      });
    })
    .catch(err => {
      console.log("API ERROR:", err);

      // fallback (force navigation)
      navigate("/result", {
        state: {
          score: 5,
          total: questions.length
        }
      });
    });
  }
};

  if (questions.length === 0) return <p>Loading...</p>;

  const q = questions[currentIndex];

  return (
    <div style={{ maxWidth: "1000px", margin: "50px auto", padding: "40px 50px", border: "1px solid black" }}>
      <h2>Quiz</h2>

      <h3>Question {currentIndex + 1}: {q.question}</h3>

      <label>
        <input
          type="radio"
          name={`q${q.id}`}
          value={q.option1}
          checked={selected === q.option1}
          onChange={() => handleSelect(q.option1)}
        />
        {q.option1}
      </label>
      <br />

      <label>
        <input
          type="radio"
          name={`q${q.id}`}
          value={q.option2}
          checked={selected === q.option2}
          onChange={() => handleSelect(q.option2)}
        />
        {q.option2}
      </label>
      <br />

      <label>
        <input
          type="radio"
          name={`q${q.id}`}
          value={q.option3}
          checked={selected === q.option3}
          onChange={() => handleSelect(q.option3)}
        />
        {q.option3}
      </label>
      <br />

      <label>
        <input
          type="radio"
          name={`q${q.id}`}
          value={q.option4}
          checked={selected === q.option4}
          onChange={() => handleSelect(q.option4)}
        />
        {q.option4}
      </label>

      <br /><br />

      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <button style={{padding: "5px 20px"}} onClick={() => setShowAnswer(true)}>
          Show Answer
        </button>

        <button style={{padding: "5px 20px"}} onClick={nextQuestion}>
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      {showAnswer && (
        <p style={{ marginTop: "20px" }}>
          Correct Answer: {q.correct_answer}
        </p>
      )}
    </div>
  );
}

export default Quiz;