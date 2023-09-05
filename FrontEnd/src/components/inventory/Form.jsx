import { useState, useRef, useEffect } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState("");
  // const [items, setItems] = useState([]);

  // function handleAddItems(item) {
  //   setItems((items) => [...items, item]);
  // }
  const inputEl = useRef(null);

  // inputEl.current.focus();

  useEffect(function () {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
      }
    }

    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    try {
      const newItem = {
        description,
        quantity,
        unit,
        consumed: false,
        // id: Date.now(),
      };
      const response = await fetch("http://localhost:5000/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      window.location = "/inventory";

      console.log(response);

      onAddItems(newItem);

      setDescription("");

      setQuantity("");

      setUnit("");
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div className="inventory-search-box">
      <div className="input-box-inventory">
        <form className="add-form" onSubmit={handleSubmit}>
          {/* <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select> */}
          <input
            type="text"
            placeholder="1"
            value={quantity}
            ref={inputEl}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                setQuantity(inputValue);
              } else {
                window.alert(
                  "You are only allowed to input numbers as quantity."
                );
                setQuantity("");
              }
            }}
          />
          <input
            type="text"
            placeholder="lb"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />

          <input
            className="description"
            type="text"
            placeholder="Item..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="button">Add</button>
        </form>
      </div>
    </div>
  );
}
