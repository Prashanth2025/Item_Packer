import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "../index.css";
import { toast } from "react-toastify";

function Itempacker() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editQty, setEditQty] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const [clearMsg, setClearMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("items");
    if (saved) {
      const parsed = JSON.parse(saved);
      setItems(parsed);
      setNextId(parsed.length ? parsed[parsed.length - 1].id + 1 : 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!itemName.trim() || !quantity.trim()) {
      setValidationMsg("Please enter both item name and quantity.");
      return;
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
    setValidationMsg("");
    toast.success("Item added!");
  };

  const handleDeleteItem = (id) => {
    const updateItem = items.filter((item) => item.id !== id);
    setItems(updateItem);
    toast.info("Item deleted");
  };

  const togglePacked = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    setItems(updated);
  };

  const clearAll = () => {
    setItems([]);
    setNextId(1);
    setClearMsg("All items cleared.");
    toast.warn("Packing list cleared");
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditQty(item.qty);
  };

  const saveEdit = () => {
    const updated = items.map((item) =>
      item.id === editId ? { ...item, name: editName, qty: editQty } : item
    );
    setItems(updated);
    setEditId(null);
    setEditName("");
    setEditQty("");
    toast.success("Item updated!");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditQty("");
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "qty") return parseInt(a.qty) - parseInt(b.qty);
    if (sortBy === "packed")
      return a.packed === b.packed ? 0 : a.packed ? 1 : -1;
    return 0;
  });

  const filteredItems = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = items.length;
  const packedCount = items.filter((item) => item.packed).length;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-10">
          <div className="card shadow">
            <div className="card-header custom-navbar text-light">
              <h4 className="mb-0">🎒 Items Packer</h4>
            </div>
            <div className="card-body border border-dark rounded-bottom">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button className="btn btn-warning w-100 mb-2" onClick={addItem}>
                <i className="bi bi-plus-circle me-2"></i>Add Item
              </button>
              {validationMsg && (
                <div className="alert alert-danger py-1 px-2 mb-2">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  {validationMsg}
                </div>
              )}
              {clearMsg && (
                <div className="alert alert-warning py-1 px-2 mb-2">
                  <i className="bi bi-trash me-2"></i>
                  {clearMsg}
                </div>
              )}
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="form-select mb-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by...</option>
                <option value="name">Name</option>
                <option value="qty">Quantity</option>
                <option value="packed">Packed Status</option>
              </select>
              <button
                className="btn btn-outline-danger w-100"
                onClick={clearAll}
              >
                <i className="bi bi-trash me-2"></i>Clear All
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <p className="text-danger text-center mt-3 bg-light rounded p-2">
              Please enter the items
            </p>
          ) : (
            <>
              <div className="card mt-3 shadow border-dark">
                <ul className="list-group list-group-flush">
                  {filteredItems.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item fade-in d-flex justify-content-between align-items-center"
                    >
                      <span className="text-muted user-select">#{item.id}</span>
                      <div className="d-flex align-items-center flex-grow-1 mx-2">
                        <input
                          type="checkbox"
                          checked={item.packed}
                          onChange={() => togglePacked(item.id)}
                          className="me-2"
                        />
                        {editId === item.id ? (
                          <>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="form-control me-2"
                              style={{ width: "40%" }}
                            />
                            <input
                              type="number"
                              value={editQty}
                              onChange={(e) => setEditQty(e.target.value)}
                              className="form-control me-2"
                              style={{ width: "30%" }}
                            />
                            <button
                              className="btn btn-success btn-sm me-1"
                              onClick={saveEdit}
                            >
                              <i className="bi bi-check-lg"></i>
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={cancelEdit}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </>
                        ) : (
                          <span
                            style={{
                              textDecoration: item.packed
                                ? "line-through"
                                : "none",
                              color: item.packed ? "red" : "inherit",
                            }}
                          >
                            <strong>
                              {item.qty} {item.name}
                            </strong>
                          </span>
                        )}
                      </div>
                      {editId !== item.id && (
                        <>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => startEdit(item)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center mt-3">
                <p className="text-success fw-bold">
                  Total Items: {totalItems}
                </p>
                <p className="text-primary fw-bold">
                  Packed Items: {packedCount}
                </p>
                <progress
                  value={packedCount}
                  max={totalItems}
                  className="w-100"
                ></progress>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Itempacker;
