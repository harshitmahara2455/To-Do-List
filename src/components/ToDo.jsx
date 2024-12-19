import React, { useRef, useState, useEffect } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todoitems from './Todoitems';

const ToDo = () => {
  const [todoList, setToDoList] = useState([]);
  const inputRef = useRef();

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem('todoList');
      if (storedTodos) {
        setToDoList(JSON.parse(storedTodos)); // Parse JSON string into an array
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      setToDoList([]); // Fallback to an empty array
    }
  }, []);

  // Save tasks to localStorage whenever the todoList changes
  useEffect(() => {
    try {
      localStorage.setItem('todoList', JSON.stringify(todoList)); // Save as JSON string
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [todoList]);

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setToDoList((prev) => [...prev, newTodo]);
    inputRef.current.value = ""; // Clear the input
  };

  const deleteTodo = (id) => {
    setToDoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setToDoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="ToDo Icon" />
        <h1 className='text-3xl font-semibold'>To Do List</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input
          ref={inputRef}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
          type='text'
          placeholder='Add the task'
        />
        <button
          onClick={add}
          className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'
        >
          ADD +
        </button>
      </div>

      <div>
        {todoList.map((item) => (
          <Todoitems
            key={item.id}
            id={item.id}
            text={item.text}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDo;
