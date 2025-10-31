import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";

function Todolist() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addItem = () => {
    if (!itemName.trim() || !quantity.trim()) {
      return alert("Enter item name and quantity");
    }

    const newItem = {
      id: nextId,
      name: itemName,
      qty: quantity,
      packed: false,
    };

    setItems([...items, newItem]);
    setNextId(nextId + 1);
    setItemName("");
    setQuantity("");
  };

  const handleDeleteItem = (id) => {
    const updateItem = items.filter((item) => item.id !== id);
    setItems(updateItem);
  };

  const togglePacked = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    setItems(updated);
  };

  const totalItems = items.length;
  const packedCount = items.filter((item) => item.packed).length;

  return (
    <>
      <section>
        <div className="card p-0 mb-2 mt-2 m-auto w-50">
          <div className="card-header bg-dark text-light">
            <h4>Add Items that You need to Pack</h4>
          </div>
          <div className="card-body border border-3 border-dark rounded-bottom">
            <input
              type="text"
              className="form-control w-75 mb-1 mt-2 ms-1 border-1 border-dark"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <input
              type="number"
              className="form-control w-75 mb-2 ms-1 border-1 border-dark"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button
              className="btn btn-warning w-25 ms-1 btn-m mb-1"
              onClick={addItem}
            >
              Add Item
            </button>
          </div>
        </div>
      </section>

      {items.length === 0 ? (
        <p className="text-danger text-center mt-2 bg-light w-50 m-auto rounded p-1">
          Please enter the items
        </p>
      ) : (
        <section>
          <div className="card p-0 m-auto w-50 border border-3 border-dark">
            <ul className="list-group">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span className="text-muted">#{item.id}</span>
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={item.packed}
                      onChange={() => togglePacked(item.id)}
                      className="me-2"
                    />
                    <span
                      style={{
                        textDecoration: item.packed ? "line-through" : "none",
                        color: item.packed ? "red" : "inherit",
                      }}
                    >
                      <strong>
                        {item.qty} {item.name}
                      </strong>
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <section className="">
            <div className="text-center mt-3 mb-2">
              <p className="text-success fw-bold">Total Items: {totalItems}</p>
              <p className="text-primary fw-bold">
                Packed Items: {packedCount}
              </p>
            </div>
          </section>
        </section>
      )}
      <div className="m-auto mt-1 text-center bg">
        <p className="text-primary fw-bold m-auto">
          The Items you have entered is {packedCount}
        </p>
      </div>
    </>
  );
}

export default Todolist;
