import React, { useState } from 'react';
import './ToDo.css';  // Importing CSS file for custom styles

const ToDo = () => {
    const [tasks, setTasks] = useState(["get up early in the morning", "Learn React", "Read Daily"]);
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

    // Function to handle input box
    function handleInput(e) {
        setNewTask(e.target.value);
    }

    // Function to add a task
    function addTask() {
        if (newTask.trim() !== "") {
            if (isEditing) {
                let updatedTasks = [...tasks];
                updatedTasks[currentTaskIndex] = newTask;
                setTasks(updatedTasks);
                setIsEditing(false);
                setCurrentTaskIndex(null);
            } else {
                setTasks([...tasks, newTask]);
            }
            setNewTask("");
        }
    }

    // Function to delete a task
    function deleteTask(index) {
        let updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    // Function to move a task up
    function moveUp(index) {
        if (index > 0) {
            let updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // Function to move a task down
    function moveDown(index) {
        if (index < tasks.length - 1) {
            let updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // Function to edit a task
    function editTask(index) {
        setNewTask(tasks[index]);
        setIsEditing(true);
        setCurrentTaskIndex(index);
    }

    return (
        <div className="todo-container">
            {/* Heading */}
            <h1 className="todo-title">ToDo App</h1>

            {/* Input Box */}
            <div className="input-group">
                <input
                    type="text"
                    className="task-input"
                    placeholder="Enter task"
                    value={newTask}
                    onChange={handleInput}
                />
                <button
                    className={`add-btn ${isEditing ? 'edit-btn' : ''}`}
                    onClick={addTask}
                >
                    {isEditing ? "Update Task" : "Add Task"}
                </button>
            </div>

            {/* Task List */}
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        <span className="task-text">{task}</span>
                        <div className="task-buttons">
                            <button onClick={() => deleteTask(index)} className="task-btn delete-btn">
                                <i className="bi bi-trash3-fill"></i>
                            </button>
                            <button onClick={() => moveUp(index)} className="task-btn move-btn">
                                <i className="bi bi-arrow-up"></i>
                            </button>
                            <button onClick={() => moveDown(index)} className="task-btn move-btn">
                                <i className="bi bi-arrow-down"></i>
                            </button>
                            <button onClick={() => editTask(index)} className="task-btn edit-btn">
                                <i className="bi bi-pen-fill"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;
