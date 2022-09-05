import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import willy2 from "../../public/Images/jinans2.jpg";



export default function Quiz() {
  const [currentCount, setCount] = useState(1000);
  const timer = () => setCount(currentCount - 1);

  useEffect(
      () => {
          if (currentCount <= 0) {
              return;
          }
          const id = setInterval(timer, 1000);
          return () => clearInterval(id);
      },
      [currentCount]
  );

  const startQuiz = () => {
    let startBtn =document.querySelector("#startBtn");
    let quizContainer = document.querySelector("#quizContainer");
    startBtn?.classList.add('hidden');
    quizContainer?.classList.remove('hidden');

    
  }

  return (
    <main className="relative md:min-h-screen md:bg-white sm:h-screen sm:bg-stone-900 sm:flex sm:items-center sm:justify-center">
    <div className="relative sm:pb-16 sm:pt-8">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div id="startBtn" onClick={startQuiz}
                  className="flex items-center justify-center rounded-md bg-amber-300 text-center text-5xl md:text-lg w-screen h-screen md:w-60 md:h-32 m-auto px-4 py-3 font-medium text-black hover:bg-white hover:text-amber-700"
                >
                  Tap To Start Quiz
                </div>
       
        <div id="quizContainer" className="relative hidden shadow-xl p-10 py-16 sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0 ">
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-900" />
          </div>
          <div className="relative box-content mt-44 md:mt-0 md:h-80 md:w-80 sm:h-screen sm:px-6 sm:pt-4 sm:pb-4 lg:px-8 lg:pb-2 lg:pt-32">
          <div className='relative box-content bottom-52 md:bottom-40 flex items-center justify-center rounded-md bg-amber-300 px-4 py-1 font-medium text-black'>{currentCount} Seconds Remaining</div>
          <div className="relative box-content bottom-44 md:bottom-36 flex items-center justify-center">
          <img
                className="md:h-64 md:w-64 border-solid border-2 border-amber-300 sm:w-40 sm:h-40"
                src={willy2}
                alt="Tyler Texas Downtown"
              />
              </div>
            <div className="relative box-content bottom-36 md:bottom-32">
              <p className="text-center text-md text-white">
                Aproxitematly, how man inches did I deep throat this thick green hog?
              </p>
            <div className="mx-auto mt-6 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <div
                  className="flex items-center justify-center rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-white hover:text-amber-700"
                >
                  2 inches
                </div>
                <div
                  className="flex items-center justify-center rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-white hover:text-amber-700"
                >
                  5 inches
                </div>
                <div
                  className="flex items-center justify-center rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-white hover:text-amber-700"
                >
                  9 inches
                </div>
                <div
                  className="flex items-center justify-center rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-white hover:text-amber-700 "
                >
                  12 inches
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);
}