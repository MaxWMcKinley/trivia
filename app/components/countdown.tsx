import ReactDOM from "react-dom";
import React, { useState, useEffect, useCallback } from "react";
import { timeAtom } from "~/store";
import { useAtom } from "jotai";

export default function Countdown() {
  const [count, setCount] = useAtom(timeAtom);
  const timer = useCallback(() => setCount(count - 1), [count, setCount]);

  useEffect(() => {
    if (count <= 0) {
      return;
    }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="relative bottom-52 box-content flex items-center justify-center rounded-md bg-amber-300 px-4 py-1 font-medium text-black md:bottom-40">
      {count} Seconds Remaining
    </div>
  );
}
