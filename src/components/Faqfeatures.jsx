import React from 'react'
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from './Faq';

const Faqfeatures = () => {
    const [openIndex, setOpenIndex] = useState(null);


    const toggle = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <div>
      <section className="py-16 px-4 md:px-10 bg-gray-50">
        <h2 className=" bg-gradient-to-r from-orange-400 to-green-700 bg-clip-text text-transparent text-nowrap text-3xl sm:text-4xl font-medium text-center mb-3">
          Frequently Asked Questions
        </h2>

        {/* FULL WIDTH FIX */}
        <div className="w-full max-w-5xl mx-auto space-y-5">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-700"
              >
                {/* HEADER */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-cyan-600">
                    {item.q}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 transition-transform duration-700 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* SMOOTH ANIMATION */}
                <div
                  className={`grid transition-all duration-700 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* <section className="py-16  px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border rounded-xl p-4 bg-white">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggle(index)}
              >
                <span className="font-medium">{item.q}</span>
                <ChevronDown
                  className={`transition ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <p className="mt-3 text-gray-600">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}

export default Faqfeatures