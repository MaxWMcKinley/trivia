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
    <div className={"flex flex-col gap-1"}>
      <div className={"text-xl"}>Home</div>
      <div>
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="question">Question</label>
            <div className="mt-1">
              <input
                id="question"
                required
                autoFocus={true}
                name="question"
                type="text"
              />
            </div>
          </div>
          <div>
            <label htmlFor="answer">Answer</label>
            <div className="mt-1">
              <input id="answer" required name="answer" type="text" />
            </div>
          </div>
          <button type="submit">Add Question</button>
        </Form>
      </div>
      <div>
        {questions.map((q) => (
          <div className={"flex flex-col gap-1"}>
            <div>Question: {q.question}</div>
            <div>Answer: {q.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
