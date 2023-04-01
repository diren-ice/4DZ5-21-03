import { useEffect, useState } from "react";
import React from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/input";
import classes from './todolist.module.css';
import Modal from "../../components/Modal/Modal";
import List from "../../components/List/list";

const TodoList = () => {
    const [ isShow, setIsShow ] = useState(false);
    const [ newTitle, setNewTitle ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ currentEdit, setCurrentEdit ] = useState();
    //// list of Todo
    const [ todoList, setTodoList ] = useState([])



    const handleShow = () => setIsShow(!isShow);
    /// fc for add new todos;


    const handleAdd = () => {
        setTodoList((prevTodo) => {
            return [ ...prevTodo, { id: todoList.length+ 1 , title: newTitle, completed: false  } ]
        })
        setNewTitle('')
        handleShow()
    }


    const handleClear = () => {
    setTodoList((prevTodo) => {
            return [ ...prevTodo, { id: todoList.length - 1 , title: newTitle, completed: false  } ]
        })
        setNewTitle('')
        handleDelete()
    };


    // function for change completed of todo;
    const handleDone = (id) => {
    const currentIndex = todoList.findIndex((todo) => todo.id === id);
       todoList[currentIndex].completed = !todoList[currentIndex].completed;
       setTodoList([...todoList]);
    }


    ////
    const handleChangeText = (event) => {
        setNewTitle(event.target.value);
    }

    //// delete todo with id;
    const handleDelete = (id) => {
        const filtered = todoList.filter(todo => todo.id !== id)
        setTodoList([...filtered])
    }
    ////
    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    /// edit todo with id and new Text;
    const handleEdit = (editTodo) => {
        const editList = todoList.map(todo => {
            if(todo.id === editTodo.id) {
                return { ...todo, title: editTodo.title }
            }
            return todo;
        })
        setTodoList([...editList]);
        setCurrentEdit()
    }

    /// variable for search result;
    const resultSearch = todoList.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
 // любое обновление
    // useEffect(() => {

    // })
    //// Получаем список из нашего localStorage
    useEffect(() => {
        console.log('render1');
       const myLocalList = JSON.parse(localStorage.getItem('todoList')); // получение списка из хранилище
       if(myLocalList?.length !== 0) { // проверка на длину массива
           setTodoList(myLocalList);
       }

    },[]) // чтобы срабатывал один раз при фазе mounting(didMount);


    //// Записывает иземенения в localStorage;
    useEffect(() => {
        console.log('render 2');
    localStorage.setItem('todoList', JSON.stringify(todoList)) // запись
    return () => {

    }
    }, [todoList]) // отслеживаем за todoList состоянием,

 const handleRemove = () => {
        localStorage.removeItem('todoList')
           const listRemove = todoList.map((item) => {
               return (
                   setTodoList(todoList => todoList.filter((entry) => entry !== item))
               )}
 )
     console.log(listRemove)
 }


   const handleSelect = (e) =>{
       const selecting = e.target.value;
        setTodoList(todoList =>
            todoList.filter(todoList => {
                if(selecting === "all"){
                    return todoList
                }
                else if(selecting ==="completed"){
                    return todoList.completed=== true

                }
                else if(selecting ==="uncompleted"){
                    return todoList.completed === false
                }
            })
        )
    }



    return (
        <div className={classes.wrapper}>
            <Button onClick={handleShow}>
                Добавить
            </Button>
            <Input
            placeholder={'search...'}
            onChange={handleSearch}
            value={search}
            name={'search'}
              />
              <select name="todo" onChange={(e)=> handleSelect(e)}>
                <option value="all">Все таски</option>
                <option value="completed"> Выполненные</option>
                <option value="uncompleted">Не выполненные</option>
            </select>

            { isShow && <Modal handleShow={handleShow}>
                <p>{newTitle}</p>
           <Input
                    placeholder={'Добавить'}
                    onChange={handleChangeText}
                    name={'add'}
                    value={newTitle}
           />
            <Button onClick={handleAdd}>
                Добавить
            </Button>
            <button onClick={handleShow}>Close</button>
            </Modal> }
            <List
            list={resultSearch}
            handleChangeCurrent={setCurrentEdit}
            handleDone={handleDone}
            handleDelete={handleDelete}
            currentEdit={currentEdit}
            handleEdit={handleEdit}
            handleClear={handleClear}
            />

         <button onClick = {handleRemove}>Remove</button>

        </div>
    )
}


export default TodoList;