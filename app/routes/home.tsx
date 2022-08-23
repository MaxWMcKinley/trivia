import * as React from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import { Form, useLoaderData } from "@remix-run/react";
import { getUserId } from "~/session.server";
import type { Question } from "@prisma/client";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);

  return prisma.question.findMany({ where: { authorId: userId } });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const question = formData.get("question");
  const answer = formData.get("answer");

  if (
    !question ||
    !answer ||
    typeof question !== "string" ||
    typeof answer !== "string"
  ) {
    console.error("you fucked up");
    return;
  }

  const userId = await getUserId(request);

  if (!userId) {
    console.error("you don't exist");
    return;
  }

  try {
    await prisma.question.create({
      data: { question, answer, author: { connect: { id: userId } } },
    });
  } catch (e) {
    console.error(e);
  }

  return null;
}

export default function Home() {
  const questions = useLoaderData<Question[]>();

  return (
    <div className={"relative min-h-screen bg-gradient-to-r from-stone-900 to-stone-900 sm:flex sm:items-center sm:justify-center"}>
      <div>
      <p className="text-2xl flex items-center justify-center text-amber-300 pb-4 max-w-md">Create a multiple choice question about yourself from our younger years.</p>
      <p className="text-xl flex items-center justify-start text-white pb-8 max-w-md"> Example: What car did I drive in high school?</p>
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="question" className="text-white text-lg text-blue-400">Question</label>
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
            <label htmlFor="answer" className="text-amber-300 text-lg">Option 1</label>
            <div className="mt-1">
              <input id="answer" required name="answer" type="text"  placeholder="wrong answer"/>
              <input type="checkbox" className="ml-8"></input>
            </div>
          </div>
          <div>
            <label htmlFor="answer" className="text-amber-300 text-lg">Option 2</label>
            <div className="mt-1">
              <input id="answer" required name="answer" type="text" placeholder="wrong answer"/>
              <input type="checkbox" className="ml-8"></input>
            </div>
          </div>
          <div>
            <label htmlFor="answer" className="text-amber-300 text-lg">Option 3</label>
            <div className="mt-1">
              <input id="answer" required name="answer" type="text" placeholder="wrong answer"/>
              <input type="checkbox" className="ml-8"></input>
            </div>
          </div>
          <div>
            <label htmlFor="answer" className="text-lime-500 text-lg"> Corerct Answer</label>
            <div className="mt-1">
              <input id="answer" required name="answer" type="text" placeholder="you get it" />
              <input type="checkbox" className="ml-8"></input>
            </div>
          </div>
          <button type="submit" className="rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-amber-200 ">Submit Question</button>
        </Form>
      </div>
      <div className="mt-40 ">
    
        <img
        className="w-40 h-30 pb-8"
        src="https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png"
        alt="Trivia"
      />
          <img
          className="w-40 h-30 pb-8"
          src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Eucalyp-Deus_High_School.png"
          alt="High School"
        />
          <img
          className="w-40 h-30 pb-8"
          src="https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png"
          alt="Trivia"
        />
      </div>
      <div>
        {questions.map((q) => (
          <div key={q.id} className={"flex flex-col gap-1"}>
            <div>Question: {q.question}</div>
            <div>Answer: {q.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
