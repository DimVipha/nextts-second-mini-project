
import React from "react";

const PolicyCard = () => {
    const list = [
        {
            title: "Privacy Policy",
            description: "Our return policy allows for returns within 30 days of the purchase date. Items must be returned in new and unused condition, with all original tags and labels attached"
        },
        {
            title: "Privacy Policy",
            description: "Our privacy policy outlines how we handle your personal information and data. We are committed to protecting your privacy and ensuring the security of your information"
        },
        {
            title: "Shipping Policy",
            description: "Our Shipping Policy outlines the terms and conditions regarding the shipping of products purchased from our website. We offer various shipping options to accommodate your needs."
        },
        {
            title: "Term policy",
            description: "Our Terms of Service govern your use of our website and the products and services offered. It's important to review and understand these terms before engaging with our platform"
        }
    ];
    return (
        <>
        <div className="max-w-screen-xl mx-auto gap-6 grid grid-cols-2 sm:grid-cols-4 mt-12">
            {list.map((item, index) => (
                <div key={index} className=" p-8 rounded-md shadow-lg mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-lg text-gray-600">
                        {item.description}
                    </p>
                </div>
            ))}
            </div>
        </>
    );
};

export default PolicyCard;
