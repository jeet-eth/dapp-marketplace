import React from "react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { decrement, increment } from "./counterSlice";

function Counter() {
  const count = useAppSelector((s) => s.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-around">
      <button className="btn btn-sm" onClick={() => dispatch(decrement())}>
        -
      </button>
      <div> {count} </div>
      <button className="btn btn-sm" onClick={() => dispatch(increment())}>
        +
      </button>
    </div>
  );
}

export default Counter;
