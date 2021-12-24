import React from 'react';
import ToDo from '../Todo/ToDo';

const TodoListItems = (props) => {
    const {todoData, onDataChange} = props;
    return (
        <>
            {todoData.map((todo) => {
                return (
                    <ToDo key={todo["_id"]} todo={todo} onInputChange={onDataChange} />
                )
            })}
        </>
    )
}

export default TodoListItems
