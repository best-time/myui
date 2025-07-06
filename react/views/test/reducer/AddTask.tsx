import { useState, useContext } from "react";
import { TasksDispatchContext } from "./TasksContext.js";
import { message } from "antd";

let nextId = 3;
export default function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useContext(TasksDispatchContext) as unknown as Function;
  function enterAdd(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      addNew();
    }
  }
  function addNew() {
    if (!text) {
      message.error("未输入内容");
      return;
    }
    setText("");
    dispatch && dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }
  const eventMap = {
    onKeyDown: (e:KeyboardEvent) => enterAdd(e),
    onChange: (e: KeyboardEvent) => setText(e.target?.value),
  };
  return (
    <>
      <input placeholder="Add task" value={text} {...eventMap} />
      <button onClick={addNew}>Add</button>
    </>
  );
}
