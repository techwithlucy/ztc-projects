"use client";
import { FormEvent, useEffect, useState } from "react";

type Props = {};

const Main = (props: Props) => {
  const [todo, setTodo] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodo([...todo, input]);
    localStorage.setItem("todos", JSON.stringify([...todo, input]));
    setInput("");
  };

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (!todos) return;
    setTodo(JSON.parse(todos));
  }, []);

  return (
    <div>
      <h1 className="text-[2rem]">Best Todo App</h1>
      <form onSubmit={handleSubmit} className="mt-5 select-none">
        <input
          placeholder="Enter todo"
          className="border-[1px] p-2 rounded-sm"
          name="todo"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="p-2 bg-blue-400 rounded-sm ml-2 text-white"
        >
          Add todo
        </button>
      </form>
      <div className="mt-[2rem]">
        {todo.length > 0
          ? todo.map((item) => {
              return (
                <div
                  className="bg-blue-100 p-4 rounded-md mb-2 max-w-[400px] flex-wrap"
                  key={Math.ceil(Math.random() * 10000) + item}
                >
                  <p className="font-[500] text-gray-600 break-all">{item}</p>
                </div>
              );
            })
          : "No todos to display"}
      </div>
    </div>
  );
};

export default Main;
