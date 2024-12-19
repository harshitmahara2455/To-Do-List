import React from 'react'
import tick from '../assets/tick.png'
import delete_icon from '../assets/delete.png'
import not_tick from '../assets/not_tick.png'



const Todoitems = ({text ,id, isComplete,deleteTodo,toggleTodo}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        <div className='flex flex-1 items-center cursor-pointer'>
          <img src={isComplete ? tick : not_tick} className='w-7' onClick={()=>toggleTodo(id)}></img>

          <p
          className={`ml-4 text-[17px] ${
            isComplete ? 'line-through text-gray-700' : 'text-slate-700'
          }`}
        >
          {text}
        </p>
         
          
        </div>

        <img onClick={()=>{deleteTodo(id)}} src={delete_icon} className='w-3.5 cursor-pointer'></img>
        
      
    </div>
  )
}

export default Todoitems
