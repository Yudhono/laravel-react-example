import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const Show = ({ post }) => {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <InertiaLink href={route("blogposts.index")}>
                Back to Posts
            </InertiaLink>
        </div>
    );
};

export default Show;
