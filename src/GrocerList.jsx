import { FaEdit, FaTrash } from 'react-icons/fa';

export default function GrocerList ({ list, editItem, removeItem }) {
    return (
        <div className = "grocery-list">
            {
                list.map((item) => {
                    const { id, name } = item;
                    return (
                        <div className = "grocery-item" key = {id}>
                            <p className="name">{name}</p>
                            <div className="btn-container">
                                <button 
                                    className="edit-btn"
                                    type = 'button'
                                    onClick = {() => editItem(id, name)}
                                >
                                    <FaEdit />
                                </button>
                                <button 
                                    className = "remove-btn"
                                    type = 'button'
                                    onClick = {() => removeItem(id, name)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}