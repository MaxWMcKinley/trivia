import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { logout } from "~/session.server";

export async function action({ request }: ActionArgs) {
  return logout(request);
}

export default function Logout() {
  return (
    <Form method="post">
      <div className="mt-20 flex items-center justify-center">
        <button
          type="submit"
          className="flex rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-white hover:text-amber-700"
        >
          Logout
        </button>
      </div>
    </Form>
  );
}
