import { useState, useReducer } from "react";
import "../Components/Todo.css"

const ReducerFunction = (state, action) => {
    switch (action.type) {
        case "Add_value":
            return [...state, { text: action.name }];
        case "Delete_Item":
            const updatedItems = [...state];
            updatedItems.splice(action.index, 1);
            return updatedItems;
        case "Edit_Item":
            const editedItems = [...state];
            editedItems[action.index].text = action.newText;
            return editedItems;
        default:
            return state;
    }
};

const TodoList = () => {
    const initialState = [];
    const [currentState, dispatch] = useReducer(ReducerFunction, initialState);
    const [todo, setNewTodo] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState("");

    const addTodo = () => {
        if (editIndex !== -1) {
            dispatch({ type: "Edit_Item", index: editIndex, newText: editText });
            setEditIndex(-1);
            setEditText("");
        } else {
            dispatch({ type: "Add_value", name: todo });
            setNewTodo("");
        }
    };

    const deleteTodo = (index) => {
        dispatch({ type: "Delete_Item", index });
    };

    const editTodo = (index, text) => {
        setEditIndex(index);
        setEditText(text);
    };

    const changeTodo = (event) => {
        setNewTodo(event.target.value);
    };

    const changeEdit = (event) => {
        setEditText(event.target.value);
    };

    return (

        <div className="container">
            <input value={editIndex !== -1 ? editText : todo} onChange={editIndex !== -1 ? changeEdit : changeTodo} placeholder="Add todo" />
            <button type="button" onClick={addTodo}>{editIndex !== -1 ? "Edit" : "Add"}</button>
            <ul>
                {currentState.map((value, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <input value={editText} onChange={changeEdit} />
                        ) : (
                            value.text
                        )}
                        {editIndex !== index && (
                            <>
                                <button onClick={() => editTodo(index, value.text)}>Edit</button>
                                <button onClick={() => deleteTodo(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        
            </div>

    );
};

export default TodoList;