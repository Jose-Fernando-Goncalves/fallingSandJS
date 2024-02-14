"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [grid, setGrid] = useState<{ value: number; color?: string }[]>([]);

  useEffect(() => {
    init();
  }, []);

  function init() {
    let array = [];
    for (let i = 0; i < 100; i++) {
      array.push({ value: 0 });
    }

    setGrid([...array]);
  }

  function fillGrid(i: number) {
    if (grid[i]?.value === 0) {
      let newGrid = [...grid];
      const randomColor = Math.random() > 0.5 ? Math.random() > 0.5 ? "bg-amber-700" : "bg-amber-500" : Math.random() > 0.5 ? "bg-amber-600" : "bg-amber-400";
      newGrid[i] = { value: 1, color: randomColor };
      setGrid(newGrid);

      let nextI = i + 10;
      if (nextI < 100 && grid[nextI]?.value === 0) {

        newGrid.splice(newGrid.indexOf(i), 1);
        setGrid(newGrid);
        fillGrid(nextI);

      }
    }
  }

  return (
    <div className="w-full min-h-screen px-24 flex items-center justify-center">
      <div className="w-[800px] h-[800px] flex flex-wrap">
        {grid.map((item, i) => (
          <div
            key={i}
            onClick={() => fillGrid(i)}
            className={`${item.color || "bg-transparent border"} cursor-pointer w-[80px] h-[80px]`}
          ></div>
        ))}
      </div>
    </div>
  );
}