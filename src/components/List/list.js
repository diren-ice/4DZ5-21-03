import React from 'react'
import TodoCard from '../TodoCard/TodoCard'

const List = ({
  list,
  handleDone,
   handleDelete,
   currentEdit,
   handleChangeCurrent,
  handleEdit
  }) => {
  return (
    <>
    {list.map(todo => <TodoCard
    key={todo.id}
    todo={todo}
    handleChangeCurrent={handleChangeCurrent}
    handleDone={handleDone}
    handleDelete={handleDelete}
    currentEdit={todo.id === currentEdit}
    handleEdit={handleEdit}
    />)}
    </>
  )
}

export default List