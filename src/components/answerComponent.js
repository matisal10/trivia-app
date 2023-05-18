import React from 'react'
import './styles/quizCompnent.css'

export default function AnswerComponent({ question, answers, handleSubmit }) {


    function colorChange(q, e) {
        e.currentTarget.classList.add(q === question.correctAnswer ? 'correct' : 'inCorrect');
    }

    return (
        <div className='containerQuestion'>
            <div>
                <h2>{question.question}</h2>
            </div>
            <div>
                {
                    answers.map((q) => (
                        <button key={q} className='answers' onClick={(event) => { colorChange(q, event); handleSubmit(q); }}>{q}</button>
                    ))
                }
            </div>
        </div>
    )
}
