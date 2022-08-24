import { Form } from "@remix-run/react";

export default function Quiz() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
    <div className="relative sm:pb-16 sm:pt-8">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative shadow-xl p-10 sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-900" />
          </div>
          <div className="relative box-content h-80 w-80 sm:px-6 sm:pt-4 sm:pb-4 lg:px-8 lg:pb-2 lg:pt-32">
          <div className="relative box-content bottom-32">
          <img
                className="h-60 w-30 "
                src="https://bloximages.newyork1.vip.townnews.com/tylerpaper.com/content/tncms/assets/v3/editorial/f/c2/fc260d20-b131-5c59-9a4e-3b908dd675da/59ef9b1525f3c.image.jpg?crop=440%2C330%2C80%2C0&resize=1200%2C900&order=crop%2Cresize"
                alt="Tyler Texas Downtown"
              />
              </div>
            <div className="relative box-content bottom-24">
              <p className="text-center text-sm text-white">
                On this play, did I make this shot?
              </p>
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <div
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-amber-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                >
                  No
                </div>
                <div
                  className="flex items-center justify-center rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-amber-200  "
                >
                  No
                </div>
                <div
                  className="flex items-center justify-center rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-amber-200  "
                >
                  Hell No
                </div>
                <div
                  className="flex items-center justify-center rounded-md bg-amber-300 px-4 py-3 font-medium text-black hover:bg-amber-200  "
                >
                  Of Course Not
                </div>
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