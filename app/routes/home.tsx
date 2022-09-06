import * as React from "react";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import {
  Form,
  useLoaderData,
  Link,
  useActionData,
  useSearchParams,
} from "@remix-run/react";
import { getUserId } from "~/session.server";
import type { Question } from "@prisma/client";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/");

  return prisma.question.findMany({
    where: { authorId: userId },
    include: { options: true },
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const question = formData.get("question");
  const option1 = formData.get("option1");
  const option2 = formData.get("option2");
  const option3 = formData.get("option3");
  const option4 = formData.get("option4");
  const answer = formData.get("answer");

  if (
    !question ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||
    !answer ||
    typeof question !== "string" ||
    typeof option1 !== "string" ||
    typeof option2 !== "string" ||
    typeof option3 !== "string" ||
    typeof option4 !== "string" ||
    typeof answer !== "string"
  ) {
    console.error("you fucked up");
    return null;
  }

  const userId = await getUserId(request);

  if (!userId) {
    console.error("you don't exist");
    return null;
  }

  try {
    await prisma.question.create({
      data: {
        question,
        author: { connect: { id: userId } },
        options: {
          create: [
            { option: option1, isAnswer: answer === "1" },
            { option: option2, isAnswer: answer === "2" },
            { option: option3, isAnswer: answer === "3" },
            { option: option4, isAnswer: answer === "4" },
          ],
        },
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }

  return null;
}

export default function Home() {
  const questions = useLoaderData<Question[]>();

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-stone-900 to-stone-900">
      {questions.length < 3 ? (
        <div className={"sm:flex sm:items-center sm:justify-center"}>
          <div>
            <p className="text-md ml-4 flex max-w-md items-center justify-center pt-4 pb-4 text-amber-300 md:mt-2 md:text-2xl">
              Create {3 - questions.length} more multiple choice question(s)
              about yourself from our younger years.
            </p>
            <p className="text-md ml-4 flex max-w-md items-center justify-start pb-8 text-white md:text-xl">
              Example: What car did I drive in high school?
            </p>
            <Form method="post" className="ml-10 space-y-6">
              <div>
                <label
                  htmlFor="question"
                  className="text-lg text-white text-blue-400"
                >
                  Question
                </label>
                <div className="mt-1">
                  <input
                    placeholder="?????"
                    id="question"
                    required
                    autoFocus={true}
                    name="question"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="option1" className="text-lg text-amber-300">
                  Option 1
                </label>
                <div className="mt-1">
                  <input
                    id="option1"
                    required
                    name="option1"
                    type="text"
                    placeholder="wrong answer"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="option2" className="text-lg text-amber-300">
                  Option 2
                </label>
                <div className="mt-1">
                  <input
                    id="option2"
                    required
                    name="option2"
                    type="text"
                    placeholder="wrong answer"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="option3" className="text-lg text-amber-300">
                  Option 3
                </label>
                <div className="mt-1">
                  <input
                    id="option3"
                    required
                    name="option3"
                    type="text"
                    placeholder="wrong answer"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="option4" className="text-lg text-amber-300">
                  Option 4
                </label>
                <div className="mt-1">
                  <input
                    id="option4"
                    required
                    name="option4"
                    type="text"
                    placeholder="you get it"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="option4" className="text-lg text-lime-500">
                  Select the correct answer
                </label>
                <div className="mt-1">
                  <select id="answer" required name="answer">
                    <option value={1}>Option 1</option>
                    <option value={2}>Option 2</option>
                    <option value={3}>Option 3</option>
                    <option value={4}>Option 4</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-amber-200 "
              >
                Submit Question
              </button>
            </Form>
          </div>
          <div className="mt-40 ">
            <img
              className="h-30 hidden w-40 pb-8 md:block"
              src="https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png"
              alt="Trivia"
            />
            <img
              className="h-30 hidden w-40 pb-8 md:block"
              src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Eucalyp-Deus_High_School.png"
              alt="High School"
            />
            <img
              className="h-30 hidden w-40 pb-8 md:block"
              src="https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png"
              alt="Trivia"
            />
          </div>
        </div>
      ) : (
        <div className="text-white">You're all done</div>
      )}
      <div>
        {questions.map((q, idx) => (
          <div key={q.id} className={"flex flex-col gap-1 text-white"}>
            <div>{`Question ${idx + 1}: ${q.question}`}</div>
            {q.options.map((o) => (
              <div
                key={o.id}
                className={o.isAnswer ? "text-lime-500" : "text-white"}
              >
                {o.option}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
