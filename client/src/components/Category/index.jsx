import React, { useState } from "react";

import categories from "../../const/categories";

export default function Categories({ activeCategory, setActiveCategory }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => setActiveCategory(i)}
            className={activeCategory === i ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
