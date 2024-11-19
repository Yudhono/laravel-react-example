import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const faqs = [
    {
        question: "What is your return policy?",
        answer: "You can return any item within 30 days of purchase.",
    },
    {
        question: "How do I track my order?",
        answer: "You can track your order using the tracking number provided in your order confirmation email.",
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we offer international shipping to many countries.",
    },
];

export default function Faq() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

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
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
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
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
