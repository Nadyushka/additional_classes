import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string,
    title: string
}

type TasksStateType = {
    [key: string]: DataType
}

type DataType = {
    data: TaskType[]
    filter: FilterValuesType
}


function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });


    function removeTask(todoListID: string, taskID: string) {
        setTasks({
            ...tasks,
            [todoListID]: {...tasks[todoListID], data: [...tasks[todoListID].data.filter(el => el.id !== taskID)]}
        })
    }

    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        setTasks({...tasks, [todoListID]: {...tasks[todoListID], data: [newTask, ...tasks[todoListID].data]}})
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
        setTasks({
            ...tasks,
            [todoListID]: {
                ...tasks[todoListID],
                data: [...tasks[todoListID].data.map(el => el.id === taskId ? {...el, isDone:isDone} : {...el})]
            }
        })
    }


    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTasks({...tasks,[todoListID]: {...tasks[todoListID], filter: value}})
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id].data;

                if (tasks[el.id].filter === "active") {
                    tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === false);
                }
                if (tasks[el.id].filter === "completed") {
                    tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tasks[el.id].filter}
                    />
                )
            })}


        </div>
    );
}

export default App;
