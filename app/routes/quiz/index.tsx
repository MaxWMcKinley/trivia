import ReactDOM from "react-dom";
import React from "react";
import { Link } from "@remix-run/react";

export default function StartQuiz() {
  return (
    <main className="relative sm:flex sm:h-screen sm:items-center sm:justify-center sm:bg-stone-900 md:min-h-screen md:bg-white">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Link
            to="0"
            className="m-auto flex h-screen w-screen items-center justify-center rounded-md bg-amber-300 px-4 py-3 text-center text-5xl font-medium text-black hover:bg-white hover:text-amber-700 md:h-32 md:w-60 md:text-lg"
          >
            Tap To Start Quiz
          </Link>
        </div>
      </div>
    </main>
  );
}
