import { Head, usePage, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Faq() {
    const { props } = usePage();
    const { faqs, filters } = props;
    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.set("search", search);
        window.location.href = url.toString();
    };

    const handleReset = () => {
        setSearch("");
        const url = new URL(window.location.href);
        url.searchParams.delete("search");
        window.location.href = url.toString();
    };

    return (
        <>
            <Head title="Frequently Asked Questions" />
            <div className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            Frequently Asked Questions
                        </h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                            Find answers to the most frequently asked questions
                            below.
                        </p>
                    </div>
                    <form
                        onSubmit={handleSearch}
                        className="mb-6 flex space-x-2"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by question"
                            className="px-4 py-2 border rounded w-full"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Reset
                        </button>
                    </form>
                    <div className="space-y-4">
                        {faqs.data.length > 0 ? (
                            faqs.data.map((faq, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                                    data-aos="fade-up"
                                >
                                    <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {faq.question}
                                    </h3>
                                    <p className="font-light text-gray-500 dark:text-gray-400">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                No results found
                            </p>
                        )}
                    </div>
                    <div className="mt-6 flex justify-center">
                        {faqs.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                className={`px-4 py-2 mx-1 border rounded ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-blue-500"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
