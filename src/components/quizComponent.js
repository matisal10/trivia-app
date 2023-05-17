import React, { useEffect, useState } from 'react'
import './styles/quizCompnent.css'

export default function QuizComponent() {


    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [index, setIndex] = useState(0);
    const [points, setPoints] = useState(0);

    async function combineAllAnswers(incorrectAnswers, correctAnswer) {
        let allAnswers = [];
        incorrectAnswers.map((item) => {
            allAnswers.push(item)
        });
        allAnswers.push(correctAnswer);
        allAnswers.sort(() => Math.random() - 0.5);
        setAnswers(allAnswers);
    }

    const getQuestions = async () => {
        const response = await fetch(
            "https://the-trivia-api.com/api/questions?limit=10"
        );
        const questions = await response.json();
        setQuestions(questions);
        setCurrentQuestion(questions[index])
        await combineAllAnswers(questions[index].incorrectAnswers, questions[index].correctAnswer)
    };

    async function handleSubmit(q, e) {
        // e.target.classList.add(q === currentQuestion.correctAnswer ? 'correct' : 'inCorrect');
        // e.target.className = 'correct'
        if (q === currentQuestion.correctAnswer) {
            setPoints(points + 1)
            setIndex(index + 1)
            setCurrentQuestion(questions[index + 1])
            await combineAllAnswers(questions[index].incorrectAnswers, questions[index].correctAnswer)
        }
    }


    useEffect(() => {
        getQuestions();
    }, []);



    return (
        <div className='container'>
            <h1>Trivia</h1>
            {
                questions.length === 0 ?
                    "Trivia Question Loading..."
                    :
                    <div>
                        <h2>{currentQuestion.question}</h2>
                        {
                            answers.map((q, i) => (
                                <button key={i} className='answers' onClick={(e) => handleSubmit(q, e)}>{q}</button>
                            ))
                        }
                    </div>
            }
        </div>
    )
}
