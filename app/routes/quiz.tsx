import ReactDOM from "react-dom";
import React, { useState, useEffect, useCallback } from "react";
import willy2 from "../../public/Images/jinans2.jpg";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/server-runtime";
import { getUserId } from "~/session.server";
import { prisma } from "~/db.server";
import { Question } from "@prisma/client";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import Countdown from "~/components/countdown";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/");

  return prisma.question.findMany({
    where: { authorId: { not: userId } },
    include: { options: true },
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const answer = formData.get("answer");

  if (!answer || typeof answer !== "string") {
    console.error("you fucked up");
    return null;
  }

  const isAnswer = formData.get(answer);

  const userId = await getUserId(request);

  if (!userId) {
    console.error("you don't exist");
    return null;
  }

  try {
    await prisma.answer.create({
      data: {
        user: { connect: { id: userId } },
        option: { connect: { id: answer } },
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }

  return isAnswer;
}

export default function Quiz() {
  const questions = useLoaderData<Question[]>();
  const result = useActionData();
  console.log(result, typeof result);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const q = questions[currentQuestionIdx];

  return (
    <main className="relative sm:flex sm:h-screen sm:items-center sm:justify-center sm:bg-stone-900 md:min-h-screen md:bg-white">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div
            id="quizContainer"
            className="relative p-10 py-16 md:pb-36 shadow-xl sm:overflow-hidden sm:rounded-2xl"
          >
            <div className="absolute inset-0 ">
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-900" />
            </div>
            <div className="relative mt-44 box-content sm:h-screen sm:px-6 sm:pt-4 sm:pb-4 md:mt-0 md:h-80 md:w-80 lg:px-8 lg:pb-2 lg:pt-32">
              <Countdown />
              <div className="relative bottom-44 box-content flex items-center justify-center md:bottom-36">
                <img
                  className="border-2 border-solid border-amber-300 sm:h-40 sm:w-40 md:h-64 md:w-64"
                  src={willy2}
                  alt="Tyler Texas Downtown"
                />
              </div>
              <div className="relative bottom-36 box-content md:bottom-32">
                <p className="text-md text-center text-white">{q.question}</p>
                <Form method="post">
                  <fieldset disabled={!!result}>
                    <div className="mx-auto mt-6 max-w-sm sm:flex sm:max-w-none">
                      <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                        {q.options.map((o) => (
                          <div key={o.id}>
                            <button
                              type="submit"
                              name="answer"
                              value={o.id}
                              key={o.id + "-btn"}
                              className="flex items-center justify-center rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-white hover:text-amber-700"
                            >
                              {o.option}
                            </button>
                            <input
                              hidden
                              key={o.id + "-hidden"}
                              name={o.id}
                              defaultValue={o.isAnswer}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                </Form>
                {result && (
                  <>
                    <div
                      className= {
                        result === "true" ? "text-lime-500 mt-8" : "text-amber-500 mt-8"
                      }
                    >
                      {result === "true" ? "Correct" : "Incorrect"}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentQuestionIdx(currentQuestionIdx + 1)
                      }
                      className="flex items-center justify-center rounded-md bg-indigo-200 px-4 py-3 mt-2 font-medium text-black hover:bg-indigo-100 hover:text-indigo-700 "
                    >
                      Next Question
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
