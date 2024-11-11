import React from "react";
import { Inertia } from "@inertiajs/inertia";

const Index = ({ qnas }) => {
    const handleClick = (id) => {
        Inertia.get(`/qnas/${id}`);
    };

    return (
        <div>
            <h1>QnAs</h1>
            <ul>
                {qnas.map((qna) => (
                    <li
                        key={qna.id}
                        onClick={() => handleClick(qna.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {qna.question}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;
