import { useState, useContext } from "react";
import { Button } from 'antd'
import { TasksContext, TasksDispatchContext } from "./TasksContext.js";
import type { ITask } from './types.ts'

function Task({ task }: { task: ITask }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TasksDispatchContext) as unknown as Function
  let taskContent = isEditing ? (
    <>
      <input
        value={task.text}
        onChange={(e) => {
          dispatch && dispatch({
            type: "changed",
            task: {
              ...task,
              text: e.target.value,
            },
          });
        }}
      />
      <Button type='primary' onClick={() => setIsEditing(false)}>Save</Button>
    </>
  ) : (
    <>
      {task.text}
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
    </>
  )
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {taskContent}
      <Button
        color='red'
        variant='solid'
        onClick={() => {
          dispatch({
            type: "deleted",
            id: task.id,
          });
        }}
      >
        Delete
      </Button>
    </label>
  );
}

export default function TaskList() {
  const tasks: ITask[] | null = useContext(TasksContext);
  return (
    <div>
      {tasks?.map((task: ITask) => (
        <p key={task.id}>
          <Task task={task} />
        </p>
      ))}
    </div>
  );
}
