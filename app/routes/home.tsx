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
  const isDelete = formData.get("delete");

  const userId = await getUserId(request);

  if (!userId) {
    console.error("you don't exist");
    return null;
  }

  if (isDelete) {
    try {
      await prisma.question.deleteMany({
        where: {
          authorId: userId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  } else {
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
                    placeholder="Option 1"
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
                    placeholder="Option 2"
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
                    placeholder="Option 3"
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
              <div className="">
                <label htmlFor="option4" className="text-lg text-lime-500">
                  Select the correct answer
                </label>
                <div className="mt-1">
                  <select className="" id="answer" required name="answer">
                    <option className="block" value={1}>
                      Option 1
                    </option>
                    <option className="block" value={2}>
                      Option 2
                    </option>
                    <option className="block" value={3}>
                      Option 3
                    </option>
                    <option className="block " value={4}>
                      Option 4
                    </option>
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
        <>
          <div className="text-md ml-4 flex items-center  justify-center pt-8 text-amber-300">
            You're all done
          </div>
          <Link
            to="/quiz"
            className="mt-8  flex hidden items-center justify-center rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-amber-200 "
          >
            Enter Quiz
          </Link>
        </>
      )}
      <div className="block items-center justify-center text-xl md:flex md:text-2xl">
        {questions.map((q, idx) => (
          <div key={q.id} className={"flex flex-col gap-3  p-10 text-white"}>
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
        <Form method="post">
          <button
            type="submit"
            name="delete"
            value="delete"
            className="ml-20 flex items-center justify-center  rounded-md bg-red-600 px-4
                py-3 font-medium text-white hover:bg-red-400 md:mt-20 md:ml-0 "
          >
            Delete All Questions
          </button>
        </Form>
      </div>
    </div>
  );
}
