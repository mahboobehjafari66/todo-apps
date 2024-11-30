
import React, { useState } from 'react';
import { useTheme } from './context/ThemeContext';
const TodoApp = () => {
    const { isDark, toggleTheme } = useTheme();
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [inputValues, setInputValues] = useState({});

    const handleAddTodo = () => {
        const todoText = inputValues.newTodo || '';
        if (!todoText.trim()) return; 
        setTodos([...todos, todoText]);
        setInputValues({ newTodo: '' });
    };

    const handleEditTodo = (index) => {
        setEditIndex(index);
        setInputValues({ ...inputValues, [`todo_${index}`]: todos[index] });
    };

    const handleSaveTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index] = inputValues[`todo_${index}`];
        setTodos(updatedTodos);
        setEditIndex(null);
        setInputValues({ ...inputValues, [`todo_${index}`]: '' });
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
            <h1 className="text-3xl mb-4">Todo App</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={inputValues.newTodo || ''}
                    onChange={(e) => setInputValues({ ...inputValues, newTodo: e.target.value })}
                    className={`border p-2 rounded mr-2 ${isDark ? 'bg-gray-700 text-black' : 'bg-white text-black'}`}
                    placeholder="Add a new todo"
                />
                <button onClick={handleAddTodo} className="bg-blue-500 text-white p-2 rounded">Add</button>
                <button onClick={toggleTheme} className="ml-2 bg-green-500 text-white p-2 rounded">Toggle Theme</button>
            </div>
            <ul className="w-full max-w-md">
                {todos.map((todo, index) => (
                    <li key={index} className="flex items-center justify-between border-b py-2">
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={inputValues[`todo_${index}`] || ''}
                                    onChange={(e) => setInputValues({ ...inputValues, [`todo_${index}`]: e.target.value })}
                                    className={`border p-1 rounded w-full ${isDark ? 'bg-gray-700 text-black' : 'bg-white text-black'}`}
                                />
                                <button onClick={() => handleSaveTodo(index)} className="bg-green-500 text-white p-1 rounded ml-2">Save</button>
                            </>
                        ) : (
                            <>
                                <span>{todo}</span>
                                <div>
                                    <button onClick={() => handleEditTodo(index)} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
                                    <button onClick={() => handleDeleteTodo(index)} className="ml-2 bg-red-500 text-white p-1 rounded">Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;

