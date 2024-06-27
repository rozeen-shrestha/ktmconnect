"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function App(props) {
  const router = useRouter();
  let [question, setquestion] = useState(0);
  let [clickedButtons, setClickedButtons] = useState([]); 
  let [buttonBackgrounds, setButtonBackgrounds] = useState({}); 

  const Question = [
    "What is your gender?",
    "What is your age?",
    "What is your occupation?",
  ];
  const roles = [
    ["Male", "Female", "Others"],
    ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    ["Student", "Employee", "Self-employed", "Retired"],
  ];

  const returnbody = () => {
    return (
      <div className="flex flex-col mb-4">
        <h2 className="text-lg font-bold">Question {question + 1} of {Question.length}</h2>
        <h3 className="text-sm">{Question[question]}</h3>
      </div>
    );
  };

  const handleroleclick = (e) => {
    const buttonId = e.target.id;
    if (clickedButtons.includes(buttonId)) {
      setClickedButtons((prevButtons) => prevButtons.filter((id) => id!== buttonId));
      setButtonBackgrounds((prevBackgrounds) => ({...prevBackgrounds, [buttonId]: "bg-gray-800" }));
    } else {
      setClickedButtons((prevButtons) => [...prevButtons, buttonId]);
      setButtonBackgrounds((prevBackgrounds) => ({...prevBackgrounds, [buttonId]: "bg-green-500" }));
    }
  };

  const returnroles = () => {
    return roles[question].map((item) => {
      const backgroundColor = buttonBackgrounds[item] || "bg-gray-800";
      return (
        <button
          onClick={(e) => handleroleclick(e)}
          className={`${backgroundColor} text-white py-2 px-4 rounded-md`}
          id={item}
        >
          {item}
        </button>
      );
    });
  };

  const handleNextClick = () => {
    if (Question.length > question + 1) {
      setquestion(question + 1);
    } else if (question == Question.length - 1) {
      alert(clickedButtons)
      router.push('/');
    }
  };

  const handleBackClick = () => {
    if (question > 0) {
      setquestion(question - 1);
    }
  };

  return (
    <div className="flex h-screen justify-center from-[#2e026d] via-[#15162c] to-[#2e026d] items-center flex-col">
      <div className="bg-gray-700 rounded-t-md p-8 w-1/2 mb-0">
        {returnbody()}
        <div className="flex flex-wrap gap-4">
          {returnroles()}
        </div>
      </div>
      <div className="bg-gray-800 rounded-b-md p-4 w-1/2 mt-0">
        <div className="flex justify-between mt-2">
          <button onClick={handleBackClick} className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700">Back</button>
          <button onClick={handleNextClick} className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700">Next</button>
        </div>
      </div>
    </div>
  );
}