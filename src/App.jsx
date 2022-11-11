import { useState, useEffect } from 'react';
import './App.css';
import Alert from './Alert';
import GrocerList from './GrocerList';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
}

export default function App() {
  const [list, setList] = useState(getLocalStorage());
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState(
    {
      status_: false,
      type: '',
      text: '',
    }
  );

  useEffect(() => localStorage.setItem('list', JSON.stringify(list)), [list]);
  
  const alertStatus = (status_ = false, type = '', text = '') => {
    setAlert({status_, type, text});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      alertStatus(true, 'red', 'Please add an item to add in basket');
    } else if (input && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, name: input };
          }
          return item;
        })
      );
      setInput('');
      setEditID(null);
      setIsEditing(false);
      alertStatus(true, 'success', `Item changed to \'${input}\'`);
    } else {
      alertStatus(true, 'success', `\'${input}\' is added to the basket`);
      const newItem = { id: list.length, name: input};

      setList([...list, newItem]);
      setInput('');
    }
  }

  const editItem = (id, name) => {
    setIsEditing(true);
    setEditID(id);
    setInput(name);
  }

  const removeItem = (id, name) => {
    alertStatus(true, 'red', `You removed \'${name}\' from the basket`);
    setList(list.filter((item) => item.id !== id));
  }

  return (
    <div className = "container">
      <form className="grocery-form" onSubmit = {handleSubmit}>
        {alert.status_ && <Alert {...alert} removeAlert = {alertStatus} list = {list}/>}
        <h2>Grocery Bud</h2>
        <div className = "form-controller">
          <input 
            placeholder = 'e.g. eggs'
            type = "text" 
            className = "grocery-input" 
            value = {input}
            onChange = {(e) => setInput(e.target.value)}
          />
          <button
            type = 'submit' 
            className = "submit-btn"
          >
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      {
      list.length > 0 && (
          <div className="grocery-container">
            <GrocerList list = {list} editItem = {editItem} removeItem = {removeItem}/>
            <button 
              className="clear-btn" 
              onClick = {() => {
                alertStatus(true, 'red', 'All items cleared');
                setList([]);
              }}
            >
              Clear Items
            </button>
          </div>
        )
      }
    </div>
  );
}