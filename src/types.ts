type Position = {
  x: number;
  y: number;
};

type CellColorType = "focus" | "highlight";

type TextColor = "preGenerated" | "userInputValid" | "userInputInvalid";

interface Cell {
  value: number | null;
}

type Settings = {
  focusRelevantSets: boolean;
  focusSameNumbers: boolean;
};

export { Position, CellColorType, TextColor, Cell, Settings };
