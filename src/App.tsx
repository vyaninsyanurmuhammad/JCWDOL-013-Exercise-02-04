import { Button, Checkbox, Divider, IconButton, Input } from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";
import { ChangeEventHandler, useState } from "react";

type ToDoModel = {
  id: number;
  todo: string;
  isDone: boolean;
};

function App() {
  const [toDoes, setToDoes] = useState<ToDoModel[]>([]);
  const [input, setInput] = useState<string>("");

  const handleInputChange = (
    event: ChangeEventHandler<HTMLInputElement> | any
  ) => setInput(event.target.value);

  const hendleChecklistChange = (
    id: number,
    event: ChangeEventHandler<HTMLInputElement> | any
  ) => {
    const targetChange = toDoes.map((data) => {
      if (data.id === id) data.isDone = event.target.checked;
      return data;
    });

    setToDoes(targetChange);
  };

  const onCLickDelete = (id: number) => {
    const targetChange = toDoes.filter((data) => data.id !== id);

    setToDoes(targetChange);
  };

  const onClickAddTodo = () => {
    const oldLastToDoesId =
      toDoes.length === 0 ? 0 : toDoes[toDoes.length - 1].id;

    const newToDo: ToDoModel = {
      id: oldLastToDoesId + 1,
      todo: input,
      isDone: false,
    };

    setToDoes([...toDoes, newToDo]);
    setInput("");
  };

  const getIsCompleteCount = () => {
    let count = 0;
    for (let i = 0; i < toDoes.length; i++) {
      count += toDoes[i].isDone ? 1 : 0;
    }
    return count;
  };

  return (
    <>
      <div className="h-screen w-screen dark:bg-slate-800 overflow-auto">
        <div className="flex flex-col gap-12">
          <p className="text-xl font-bold text-gray-500 ms-3 dark:text-gray-200 text-center pt-12">
            Chores ToDo List
          </p>
          <div className="flex flex-col gap-3 px-60">
            {toDoes.map((data) => (
              <div key={data.id} className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    size="lg"
                    isChecked={data.isDone}
                    onChange={(e) => hendleChecklistChange(data.id, e)}
                  />
                  <p className="text-lg text-gray-500 ms-3 dark:text-gray-200">
                    {data.todo}
                  </p>
                </div>

                <IconButton
                  colorScheme="red"
                  variant="outline"
                  aria-label="Delete"
                  icon={<Trash size={24} weight="duotone" />}
                  onClick={() => onCLickDelete(data.id)}
                />
              </div>
            ))}
          </div>

          <Divider orientation="horizontal" />

          <div className="flex flex-col px-60 gap-8">
            <p className="text-black dark:text-white text-xl text-center">
              Done : {getIsCompleteCount()}
            </p>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-0">
                <label className="block text-xs font-medium mb-2 dark:text-white">
                  Add Todo
                </label>
                <Input
                  className="dark:text-white"
                  onChange={handleInputChange}
                  placeholder="Type Here"
                  value={input}
                />
              </div>

              <Button className="w-fit" onClick={() => onClickAddTodo()}>
                ADD TASK
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
