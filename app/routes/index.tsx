import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/home");

  return json({});
}

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="relative min-h-screen md:bg-white bg-stone-900 sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover hidden md:block "
                src="https://www.cityoftyler.org/home/showpublishedimage/11013/637775891902300000"
                alt="Tyler Texas Downtown"
              />
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block px-4 uppercase text-white drop-shadow-2xl">
                  The League
                </span>
              </h1>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <Link
                    to="/join"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-2 py-2 md:px-4 md:py-3 text-base font-medium text-amber-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-md bg-amber-300 px-2 py-2 md:px-4 md:py-3 font-medium text-black hover:bg-amber-200  "
                  >
                    Log In
                  </Link>
                </div>
              </div>
              <p className="mx-auto mt-4 md:mt-14 max-w-lg text-center text-xl text-white drop-shadow-2xl sm:max-w-3xl">
                2022 Season - Time To Draft
              </p>
              <img
                className="h-6/6 w-6/6 mx-auto mt-4 border-solid border-2 border-amber-300 block md:hidden"
                src="https://www.cityoftyler.org/home/showpublishedimage/11013/637775891902300000"
                alt="Tyler Texas Downtown"
              />
              <p className="mx-auto mt-4 md:mt-14 max-w-lg text-center text-md block md:hidden text-white drop-shadow-2xl sm:max-w-3xl">
                Tyler, Texas 
              </p>
              <p className="mx-auto mt-4 md:mt-14 max-w-lg text-center text-md block md:hidden text-white drop-shadow-2xl sm:max-w-3xl">
                Home of THE Jerome "Rocky" Miltion
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
