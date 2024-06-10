"use client";
import React,{useState} from "react";
import Link from "next/link";


export default function App(props) {
  let [question, setquestion] = useState(0)

  const Question = ["What is your gender?",]
  const roles = [["male","female","others"],["customer", "provider"]]

  const returnbody=()=>{
    return(
      <div className="flex flex-col mb-4">
          <h2 className="text-lg font-bold">Question {question+1} of {Question.length}</h2>
          <h3 className="text-sm">{Question[question]}</h3>
      </div>
      
)
  }

  
  const returnroles =()=>{
    roles[question].map((item)=>{
    return(
      <button className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 w-48">
      {item}
      </button>
  )})
  }

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
          <p className="text-sm text-gray-400 py-2"></p>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700">Next</button>
        </div>
      </div>
    </div>

  );
}