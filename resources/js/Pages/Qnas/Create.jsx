import React, { useState } from "react";
import { router } from "@inertiajs/react";

const Create = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/qnas", { question, answer });
    };

    return (
        <div>
            <h1>Create QnA</h1>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Create;
