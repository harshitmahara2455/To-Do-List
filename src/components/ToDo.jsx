import React, { useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todoitems from './Todoitems';

const ToDo = () => {

  const [todoList , setToDoList] = useState([])



  const inputRef = useRef(); // Create a ref for the input element

  const add = () => {
    const inputText = inputRef.current.value.trim(); // Access the input value

    if(inputText=== ""){
      return null ;  
    }



    const newTodo = {
      id : Date.now(),
      text :inputText,
      isComplete : false 
    }
    setToDoList((prev)=>[...prev, newTodo]);
    inputRef.current.value = "";
     

  };
  const deleteTodo =(id)=>{
    setToDoList((prvTodos)=>{
      return prvTodos.filter((todo)=> todo.id !==id)
    })
  }

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="ToDo Icon" />
        <h1 className='text-3xl font-semibold'>To Do List</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        {/* Attach the ref to the input element */}
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

      {/* To-do list items */}
      <div>
        {todoList.map((item,index)=>{
          return <Todoitems key ={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo ={deleteTodo } />
        })}

      </div>
    </div>
  );
};

export default ToDo;
