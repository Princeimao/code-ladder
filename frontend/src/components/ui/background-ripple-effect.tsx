"use client";
import React, { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 20,
  cols = 40,
  cellSize = 56,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden bg-black",
        "[--cell-border-color:rgba(255,255,255,0.12)] [--cell-fill-color:rgba(99,102,241,0.06)] [--cell-shadow-color:rgba(99,102,241,0.3)]",
      )}
    >
      <div className="relative h-full w-full overflow-hidden [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_40%,transparent_100%)]">
        <DivGrid
          key={`base-${rippleKey}`}
          className="opacity-100"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#797979ff",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: "fit-content",
    height: "fit-content",
    margin: "auto",
  };

  return (
    <div className={cn("relative z-[3] flex items-center justify-center min-h-full", className)}>
      <div style={gridStyle}>
        {cells.map((idx) => {
          const rowIdx = Math.floor(idx / cols);
          const colIdx = idx % cols;
          const distance = clickedCell
            ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
            : 0;
          const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
          const duration = 200 + distance * 80; // ms

          const style: CellStyle = clickedCell
            ? {
                "--delay": `${delay}ms`,
                "--duration": `${duration}ms`,
              }
            : {};

          return (
            <div
              key={idx}
              className={cn(
                "cell relative border-[0.5px] opacity-60 transition-all duration-300 will-change-transform hover:opacity-100 hover:bg-zinc-800",
                "before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
                "before:shadow-[0px_0px_15px_1px_rgba(99,102,241,0.2)_inset]",
                clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
                !interactive && "pointer-events-none",
              )}
              style={{
                backgroundColor: fillColor,
                borderColor: borderColor,
                ...style,
              }}
              onClick={
                interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};
