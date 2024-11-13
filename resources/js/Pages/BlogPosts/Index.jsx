import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";

const Index = ({ posts }) => {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route("blogposts.destroy", id));
        }
    };

    return (
        <div>
            <h1>Blog Posts</h1>
            <InertiaLink href={route("blogposts.create")}>
                Create New Post
            </InertiaLink>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <InertiaLink href={route("blogposts.show", post.id)}>
                            {post.title}
                        </InertiaLink>
                        <InertiaLink href={route("blogposts.edit", post.id)}>
                            Edit
                        </InertiaLink>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;
