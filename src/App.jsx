import { useState, useEffect } from 'react';
import Alert from './Alert';

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
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState('');
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
    } else {
      alertStatus(true, 'success', `\'${input}\' is added to the basket`);
      const newItem = { id: list.length, name: input};

      setList([...list, newItem]);
      setInput('');
    }
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
    </div>
  );
}
