import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [colorPercentageRange, setColorPercentageRange] = useState(10);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(colorPercentageRange);
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const changePercentageRange = (value) => {
    let range = Number(value);
    setColorPercentageRange(range);
  };

  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.value)}
            placeholder="#f15025"
            className={`${error ? "error" : null}`}
          />

          <button className="btn" type="submit">
            submit
          </button>
          <div>
            <label htmlFor="colorPercentageRange">Percentage Range</label>
            <select
              value={colorPercentageRange}
              onChange={(e) => changePercentageRange(e.target.value)}
              name="colorPercentageRange"
              id="colorPercentageRange"
            >
              <option value="1">1%</option>
              <option value="2">2%</option>
              <option value="4">4%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
            </select>
          </div>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
