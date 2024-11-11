import React, { useState } from "react";
import { router } from "@inertiajs/react";

const Edit = ({ qna }) => {
    const [question, setQuestion] = useState(qna.question);
    const [answer, setAnswer] = useState(qna.answer);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/qnas/${qna.id}`, { question, answer });
    };

    return (
        <div>
            <h1>Edit QnA</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Question:</label>
                <input
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <label htmlFor="answer">Answer:</label>
                <textarea
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Edit;
