import * as React from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import { Form, useLoaderData, Link, useActionData, useSearchParams } from "@remix-run/react";
import { getUserId } from "~/session.server";
import type { Question, QuestionOptions } from "@prisma/client";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);

  return prisma.question.findMany({ where: { authorId: userId }, include: {options: true}});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const question = formData.get("question");
  const option1 = formData.get("option1");
  const option2 = formData.get("option2");
  const option3 = formData.get("option3");
  const option4 = formData.get("option4");



  if (
    !question ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||

    typeof question !== "string" ||
    typeof option1 !== "string" ||
    typeof option2 !== "string" ||
    typeof option3 !== "string" ||
    typeof option4 !== "string" 

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
      data: { question, author: { connect: { id: userId } }, options: {create: [{option: option1, isAnswer: false}, {option: option2, isAnswer: false}, {option: option3, isAnswer: false}, {option: option4, isAnswer: false}]} },
    });
  } catch (e) {
    console.error(e);
  }

  return null;
}


export default function Home() {
  const questions = useLoaderData<Question[]>();
  const options = useLoaderData<QuestionOptions[]>();

  return (
    <div className={"relative min-h-screen bg-gradient-to-r from-stone-900 to-stone-900 sm:flex sm:items-center sm:justify-center"}>
      <div>
      
      <p className="text-md pt-4 ml-4 md:text-2xl flex items-center justify-center md:mt-2 text-amber-300 pb-4 max-w-md">Create a multiple choice question about yourself from our younger years.</p>
      <p className="text-md ml-4 md:text-xl flex items-center justify-start text-white pb-8 max-w-md"> Example: What car did I drive in high school?</p>
        <Form method="post" className="space-y-6 ml-10">
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
            <label htmlFor="option1" className="text-amber-300 text-lg">Option 1</label>
            <div className="mt-1">
              <input id="option1" required name="option1" type="text"  placeholder="wrong answer"/>
              <input type="checkbox" className="ml-8"></input>
            </div>
          </div>
          <div>
            <label htmlFor="option2" className="text-amber-300 text-lg">Option 2</label>
            <div className="mt-1">
              <input id="option2" required name="option2" type="text" placeholder="wrong answer"/>
              <input type="checkbox" className="ml-8"></input>
            </div>
          </div>
          <div>
            <label htmlFor="option3" className="text-amber-300 text-lg">Option 3</label>
            <div className="mt-1">
              <input id="option3" required name="option3" type="text" placeholder="wrong answer"/>
              <input type="checkbox" className="ml-8"></input>
            </div>
          </div>
          <div>
            <label htmlFor="option4" className="text-lime-500 text-lg"> Option 4</label>
            <div className="mt-1">
              <input id="option4" required name="option4" type="text" placeholder="you get it" />
              <input type="checkbox" className="ml-8"></input>
            </div>
          </div>
          <button type="submit" className="rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-amber-200 "
           >Submit Question
           
           </button>
           <Link 
                to={{
                  pathname: "/quiz",
                }} type="submit" className=" rounded-md bg-red-700 m-auto mx-10 px-4 py-3 font-medium text-white hover:bg-red-200 "
           >Skip
           
           </Link>
        </Form>
      </div>
      <div className="mt-40 ">
    
        <img
        className="w-40 h-30 pb-8 hidden md:block"
        src="https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png"
        alt="Trivia"
      />-b
          <img
          className="w-40 h-30 pb-8 hidden md:block"
          src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Eucalyp-Deus_High_School.png"
          alt="High School"
        />
          <img
          className="w-40 h-30 pb-8 hidden md:block"
          src="https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png"
          alt="Trivia"
        />
      </div>
      <div>
        {questions.map((q) => (
          <div key={q.id} className={"flex flex-col gap-1 text-white"}>
            <div>{q.question}</div>
          </div>
        ))}
      </div>
      <div>
        {options.map((q) => (
          <div key={q.id} className={"flex flex-col gap-1 text-white"}>
            <div>{q.option}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
