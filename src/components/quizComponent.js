import React, { useEffect, useState } from 'react'
import './styles/quizCompnent.css'
import AnswerComponent from './answerComponent';

export default function QuizComponent() {


    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [index, setIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [total, setTotal] = useState(5);
    async function combineAllAnswers(question) {
        let allAnswers = [question.correctAnswer, ...question.incorrectAnswers].sort((a, b) => a < b ? -1 : 1);
        await setAnswers(allAnswers);
    }

    const getQuestions = async () => {
        const response = await fetch(
            "https://the-trivia-api.com/api/questions?limit=5"
        );
        const questions = await response.json();
        setQuestions(questions);
        setCurrentQuestion(questions[index])
        await combineAllAnswers(questions[index])
    };

    async function handleSubmit(q) {
        // e.target.className = 'correct'
        if (q === currentQuestion.correctAnswer && total >= 1) {
            await setTimeout(async () => {
                setPoints(points + 1)
                await setTotal(total - 1)
                setIndex(index + 1)
                if (total === 1) {
                    setTotal(total - 1)
                } else {
                    combineAllAnswers(questions[index + 1])
                    setCurrentQuestion(questions[index + 1])
                }

            }, 1000);
        }
    }

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <div className='containerQuiz'>
            {
                total === 0 ? <div>
                    <h2>Game Over</h2>
                    <button className='answers' onClick={() => { window.location.href = '/' }}>play again</button>
                </div>
                    :
                    <div>
                        {
                            questions.length === 0 ?
                                "Trivia Question Loading..."
                                :
                                <div className='containerQuestion'>

                                    <AnswerComponent question={currentQuestion} answers={answers} handleSubmit={handleSubmit} />
                                    <h4>Questions remaining: {total}</h4>
                                    <h4>Corrects Question: {points}</h4>
                                </div>
                        }
                    </div>
            }


        </div>
    )
}
