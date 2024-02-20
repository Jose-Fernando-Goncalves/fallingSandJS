'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const [grid, setGrid] = useState<{ value: number; color?: string }[]>([]);
  const [rightClickIsDown, setRightClickIsDown] = useState(false);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateGrid, 50);
    return () => clearInterval(intervalId);
  }, [updateGrid]);


  function init() {
    let array = Array(100).fill({ value: 0 });
    setGrid(array);
  }

  function getRandomColor() {
    const colors = ["bg-amber-700", "bg-amber-500", "bg-amber-600", "bg-amber-400"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function fillGrid(i: number) {
    if (grid[i]?.value === 0) {
      let newGrid = grid.map((cell, index) => {
        if (index === i) {
          return { value: 1, color: getRandomColor() };
        }
        return cell;
      });
      setGrid(newGrid);
    }
  }

  function updateGrid() {
    setGrid(oldGrid => {
      let newGrid = oldGrid.map((cell, index) => {
        if (cell.value === 1 && index < 90 && oldGrid[index + 10].value === 0) {
          return { value: 0 };
        } else if (cell.value === 0 && index > 9 && oldGrid[index - 10].value === 1) {
          return { value: 1, color: oldGrid[index - 10].color };
        }
        return cell;
      });
      return newGrid;
    });
  }


  return (
    <div className="w-full px-24 flex items-center justify-center">
      <div
        onMouseLeave={() => setRightClickIsDown(false)}
        className="w-[1000px] flex flex-wrap">
        {grid.map((item, i) => (
          <div
            key={i}
            onMouseUp={() => setRightClickIsDown(false)}
            onMouseDown={() => setRightClickIsDown(true)}
            onClick={() => fillGrid(i)}
            onMouseEnter={() => rightClickIsDown && fillGrid(i)}
            className={`${item.color || "bg-transparent border"} cursor-pointer w-[100px] h-[100px]`}
          ></div>
        ))}
      </div>
    </div >
  );
}
