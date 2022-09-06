import ReactDOM from "react-dom";
import React, { useState, useEffect, useCallback } from "react";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/server-runtime";
import { getUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { Answer, Question } from "@prisma/client";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/");

  const answers = await prisma.answer.findMany({
    where: { userId, option: { isAnswer: { equals: true } } },
    include: { option: true },
  });

  const time = await prisma.user.findUnique({
    where: { id: userId },
    select: { time: true },
  });

  return { numCorrect: answers.length, time: time?.time };
}

export default function Scoreboard() {
  const { numCorrect, time } = useLoaderData<{
    numCorrect: number;
    time: number;
  }>();

  return (
    <main className="relative sm:flex sm:h-screen sm:items-center sm:justify-center sm:bg-stone-900 md:min-h-screen md:bg-white">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div
            id="quizContainer"
            className="relative p-10 py-16 shadow-xl sm:overflow-hidden sm:rounded-2xl md:pb-44"
          >
            <div className="absolute inset-0 ">
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-900" />
            </div>
            <div className="relative box-content h-screen sm:px-6 sm:pt-4 sm:pb-40 md:mt-0 md:h-20 md:w-80 lg:px-8 lg:pb-2 lg:pt-32">
              <p className="text-center text-lg text-white">
                You scored {numCorrect} points and finished in {1000 - time}{" "}
                seconds!
              </p>
              <div className="mx-auto mt-6 max-w-sm sm:flex sm:max-w-none">
                <div>
                  <div className="mt-20 flex items-center justify-center">
                    <Link
                      to="/logout"
                      className="flex rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-white hover:text-amber-700"
                    >
                      Logout
                    </Link>
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
