import React, { useState } from 'react'
import { Delete , Edit ,SaveIcon } from 'lucide-react';

type TTodo= {
    todo:string;
    id:number;
    status:boolean;
}

const Todo : React.FC = () => {
  const [ todo, setTodo ] = useState<string>("");  
  const [todos, setTodos ] = useState<TTodo[]>([]);
  const [count,setCount] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [edit,setEdit] = useState<string>('');
  const [editId, setEditId ] = useState<number>();
  const [ empty ,setIsEmpty ] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsEmpty(false);
    setTodo(value);
  };
  
  const handleTodos = () =>{
     setCount(count+1);
     if(todo === ""){
         setIsEmpty(true);
         return;
     }
     setTodos((prev) => ([ ...prev, { id: count, todo: todo ,status:false} ]));
     setTodo("");
  }
  const handleEdit = (id:number) =>{
      setIsEdit(true);
      setEditId(id);
  }
  const handleDelete = ( id :number) =>{
     setTodos((prev) => (prev.filter( todo => todo.id !== id)) )
  }
  const handleCancel = () => {
      setIsEdit(false);
  }
  const handleSave = (id: number) => {
        setTodos(prev => prev.map((item: TTodo) => item.id === id ? { ...item, todo: edit } : item));
        setIsEdit(false);
        setEdit('');
  }
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
     setEdit(e.target.value)
  }
  const handleStatus = (id: number) =>{
     setTodos(prev => prev.map((item :TTodo) => item.id === id ? {...item,status:true } : item))
  }
  return (
    <>
      <div className='bg-black flex  flex-col justify-center items-center rounded m-2 p-10 min-h-screen'>
        <h2 className='text-amber-800  font-extrabold text-4xl shadow'>ToDo App</h2>
        <div className='items-center m-3 p-5 flex flex-row'>
           <div className='flex flex-col m-1 p-2'>
            <input type="text" value={todo} onChange={handleChange} className='bg-amber-50 text-black rounded border-amber-800 w-44'  />
            { empty && (<span className='text-red-400'>Add todo properly</span> )}
            </div>    
          <button onClick={ handleTodos } className='border-amber-700 p-2 m-2 text-white font-medium border rounded'>Add</button>
        </div>
        {
            todos.length>0 && (
                <>
                <div className='flex flex-row'> 
                 <div className=' border rounded border-amber-900 w-72 justify-around'>
                    <h2 className='text-2xl font-extralight text-amber-700'>Pending Tasks</h2>
                      { todos.map((todo :TTodo) => (
                         !todo.status && ( 
                          <div className='flex flex-row p-2 items-center' key={todo.id}>
                             { isEdit && editId === todo.id  ? (
                                 <>
                                     <input value={edit || todo.todo}  onChange={(e) =>handleEditChange(e)} className='text-white p-1 m-1 border rounded' />
                                     <SaveIcon size={18} color={'white'} onClick={() =>handleSave(todo.id)} />
                                     <button className='text-white' onClick={handleCancel}>Cancel</button>
                                 </> 
                               ):( 
                                <>
                                    <input type="checkbox" onClick={() => handleStatus(todo.id)}/>
                                    <p className='p-2 text-white'>{todo.todo}</p>
                                    <Edit size={20} color={'white'} onClick={() => handleEdit(todo.id)}/>
                                    <Delete size={20} color={'white'} onClick={() =>handleDelete(todo.id)} />
                                </>
                            )}  
                          </div>
                        ))
                    )}
                </div>    
                <div className='border rounded border-amber-800 m-3 p-3'>
                   <h2 className='font-extralight text-2xl text-amber-800'>Completed Task</h2>
                    { todos.map((item : TTodo) =>  (  
                        item.status && ( 
                         <div>
                             <p className='text-white'>{item.todo}</p>
                         </div>   
                    )))}
                </div>  
               </div>   
              </>
            )
        }
     </div>   
    </>
  )
}

export default Todo
