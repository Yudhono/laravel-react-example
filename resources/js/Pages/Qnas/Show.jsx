import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const Show = ({ qna }) => {
    const handleDelete = () => {
        Inertia.delete(`/qnas/${qna.id}`);
    };

    return (
        <div>
            <h1>{qna?.question}</h1>
            <p>{qna?.answer}</p>
            <InertiaLink href={`/qnas/${qna?.id}/edit`}>Edit</InertiaLink>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Show;
