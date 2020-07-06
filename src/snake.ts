// Rules Sidebar Elements
const rulesBtn = document.getElementById("rules-btn")! as HTMLButtonElement;
const closeBtn = document.getElementById("close-btn")! as HTMLButtonElement;
const rules = document.getElementById("rules")! as HTMLDivElement;

// Canvas Elements
const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Map Selection Elements
const map0Btn = document.getElementById("map0img")! as HTMLImageElement;
const map1Btn = document.getElementById("map1img")! as HTMLImageElement;
const map2Btn = document.getElementById("map2img")! as HTMLImageElement;
const mapBtns = [map0Btn, map1Btn, map2Btn];

// Game Mode Selection Elements
const spBtn = document.getElementById("sp-img")! as HTMLImageElement;
const mpBtn = document.getElementById("mp-img")! as HTMLImageElement;

// Reset Scores Button Elements
const resetSPBtn = document.getElementById(
  "reset-sp-score-btn"
)! as HTMLButtonElement;
const resetMPBtn = document.getElementById(
  "reset-mp-score-btn"
)! as HTMLButtonElement;

// Crown :)
let crown = new Image();
crown.src = "img/crown.png";

// Directionality ENUM
enum Direction {
  NONE,
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

// Flip directionality
function opposingDirection(dir: Direction): Direction {
  switch (dir) {
    case Direction.NONE:
      return Direction.NONE;
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.LEFT;
  }
}

// Convert directionality to vector
function dirToVect(dir: Direction): Vector {
  switch (dir) {
    case Direction.NONE:
      return { x: 0, y: 0 };
    case Direction.UP:
      return { x: 0, y: -1 };
    case Direction.DOWN:
      return { x: 0, y: 1 };
    case Direction.LEFT:
      return { x: -1, y: 0 };
    case Direction.RIGHT:
      return { x: 1, y: 0 };
  }
}

// Interfaces
interface Dimensioned {
  x: number;
  y: number;
}
interface Point extends Dimensioned {}
interface Vector extends Dimensioned {}

// Convert a pair of numbers into a point object
function toPoint(x: number, y: number): Point {
  return { x: x, y: y };
}

// Maps - move to separate file when you can get it working (infuriatingly it did not with "no errors")
type mapObj = { sp1: Point; sp2: Point; walls?: Point[] };
const map0Data: mapObj = { sp1: { x: 46, y: 20 }, sp2: { x: 53, y: 27 } };
const map1Data: mapObj = {
  sp1: { x: 43, y: 12 },
  sp2: { x: 56, y: 37 },
  walls: [
    { x: 8, y: 8 },
    { x: 9, y: 8 },
    { x: 10, y: 8 },
    { x: 11, y: 8 },
    { x: 12, y: 8 },
    { x: 13, y: 8 },
    { x: 14, y: 8 },
    { x: 15, y: 8 },
    { x: 40, y: 8 },
    { x: 41, y: 8 },
    { x: 42, y: 8 },
    { x: 45, y: 8 },
    { x: 46, y: 8 },
    { x: 47, y: 8 },
    { x: 84, y: 8 },
    { x: 85, y: 8 },
    { x: 86, y: 8 },
    { x: 87, y: 8 },
    { x: 88, y: 8 },
    { x: 89, y: 8 },
    { x: 90, y: 8 },
    { x: 91, y: 8 },
    { x: 8, y: 9 },
    { x: 9, y: 9 },
    { x: 10, y: 9 },
    { x: 11, y: 9 },
    { x: 12, y: 9 },
    { x: 13, y: 9 },
    { x: 14, y: 9 },
    { x: 15, y: 9 },
    { x: 40, y: 9 },
    { x: 41, y: 9 },
    { x: 42, y: 9 },
    { x: 45, y: 9 },
    { x: 46, y: 9 },
    { x: 47, y: 9 },
    { x: 84, y: 9 },
    { x: 85, y: 9 },
    { x: 86, y: 9 },
    { x: 87, y: 9 },
    { x: 88, y: 9 },
    { x: 89, y: 9 },
    { x: 90, y: 9 },
    { x: 91, y: 9 },
    { x: 8, y: 10 },
    { x: 9, y: 10 },
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
    { x: 13, y: 10 },
    { x: 14, y: 10 },
    { x: 15, y: 10 },
    { x: 40, y: 10 },
    { x: 41, y: 10 },
    { x: 42, y: 10 },
    { x: 45, y: 10 },
    { x: 46, y: 10 },
    { x: 47, y: 10 },
    { x: 84, y: 10 },
    { x: 85, y: 10 },
    { x: 86, y: 10 },
    { x: 87, y: 10 },
    { x: 88, y: 10 },
    { x: 89, y: 10 },
    { x: 90, y: 10 },
    { x: 91, y: 10 },
    { x: 8, y: 11 },
    { x: 9, y: 11 },
    { x: 10, y: 11 },
    { x: 11, y: 11 },
    { x: 12, y: 11 },
    { x: 13, y: 11 },
    { x: 14, y: 11 },
    { x: 15, y: 11 },
    { x: 40, y: 11 },
    { x: 41, y: 11 },
    { x: 42, y: 11 },
    { x: 45, y: 11 },
    { x: 46, y: 11 },
    { x: 47, y: 11 },
    { x: 84, y: 11 },
    { x: 85, y: 11 },
    { x: 86, y: 11 },
    { x: 87, y: 11 },
    { x: 88, y: 11 },
    { x: 89, y: 11 },
    { x: 90, y: 11 },
    { x: 91, y: 11 },
    { x: 8, y: 12 },
    { x: 9, y: 12 },
    { x: 10, y: 12 },
    { x: 11, y: 12 },
    { x: 12, y: 12 },
    { x: 13, y: 12 },
    { x: 14, y: 12 },
    { x: 15, y: 12 },
    { x: 40, y: 12 },
    { x: 41, y: 12 },
    { x: 42, y: 12 },
    { x: 45, y: 12 },
    { x: 46, y: 12 },
    { x: 47, y: 12 },
    { x: 84, y: 12 },
    { x: 85, y: 12 },
    { x: 86, y: 12 },
    { x: 87, y: 12 },
    { x: 88, y: 12 },
    { x: 89, y: 12 },
    { x: 90, y: 12 },
    { x: 91, y: 12 },
    { x: 8, y: 13 },
    { x: 9, y: 13 },
    { x: 10, y: 13 },
    { x: 11, y: 13 },
    { x: 12, y: 13 },
    { x: 13, y: 13 },
    { x: 14, y: 13 },
    { x: 15, y: 13 },
    { x: 40, y: 13 },
    { x: 41, y: 13 },
    { x: 42, y: 13 },
    { x: 45, y: 13 },
    { x: 46, y: 13 },
    { x: 47, y: 13 },
    { x: 84, y: 13 },
    { x: 85, y: 13 },
    { x: 86, y: 13 },
    { x: 87, y: 13 },
    { x: 88, y: 13 },
    { x: 89, y: 13 },
    { x: 90, y: 13 },
    { x: 91, y: 13 },
    { x: 8, y: 14 },
    { x: 9, y: 14 },
    { x: 10, y: 14 },
    { x: 11, y: 14 },
    { x: 12, y: 14 },
    { x: 13, y: 14 },
    { x: 14, y: 14 },
    { x: 15, y: 14 },
    { x: 40, y: 14 },
    { x: 41, y: 14 },
    { x: 42, y: 14 },
    { x: 45, y: 14 },
    { x: 46, y: 14 },
    { x: 47, y: 14 },
    { x: 84, y: 14 },
    { x: 85, y: 14 },
    { x: 86, y: 14 },
    { x: 87, y: 14 },
    { x: 88, y: 14 },
    { x: 89, y: 14 },
    { x: 90, y: 14 },
    { x: 91, y: 14 },
    { x: 8, y: 15 },
    { x: 9, y: 15 },
    { x: 10, y: 15 },
    { x: 11, y: 15 },
    { x: 12, y: 15 },
    { x: 13, y: 15 },
    { x: 14, y: 15 },
    { x: 15, y: 15 },
    { x: 40, y: 15 },
    { x: 41, y: 15 },
    { x: 42, y: 15 },
    { x: 45, y: 15 },
    { x: 46, y: 15 },
    { x: 47, y: 15 },
    { x: 84, y: 15 },
    { x: 85, y: 15 },
    { x: 86, y: 15 },
    { x: 87, y: 15 },
    { x: 88, y: 15 },
    { x: 89, y: 15 },
    { x: 90, y: 15 },
    { x: 91, y: 15 },
    { x: 24, y: 21 },
    { x: 25, y: 21 },
    { x: 26, y: 21 },
    { x: 27, y: 21 },
    { x: 28, y: 21 },
    { x: 29, y: 21 },
    { x: 30, y: 21 },
    { x: 31, y: 21 },
    { x: 68, y: 21 },
    { x: 69, y: 21 },
    { x: 70, y: 21 },
    { x: 73, y: 21 },
    { x: 74, y: 21 },
    { x: 75, y: 21 },
    { x: 24, y: 22 },
    { x: 25, y: 22 },
    { x: 26, y: 22 },
    { x: 27, y: 22 },
    { x: 28, y: 22 },
    { x: 29, y: 22 },
    { x: 30, y: 22 },
    { x: 31, y: 22 },
    { x: 68, y: 22 },
    { x: 69, y: 22 },
    { x: 70, y: 22 },
    { x: 73, y: 22 },
    { x: 74, y: 22 },
    { x: 75, y: 22 },
    { x: 24, y: 23 },
    { x: 25, y: 23 },
    { x: 26, y: 23 },
    { x: 27, y: 23 },
    { x: 28, y: 23 },
    { x: 29, y: 23 },
    { x: 30, y: 23 },
    { x: 31, y: 23 },
    { x: 68, y: 23 },
    { x: 69, y: 23 },
    { x: 70, y: 23 },
    { x: 73, y: 23 },
    { x: 74, y: 23 },
    { x: 75, y: 23 },
    { x: 68, y: 24 },
    { x: 69, y: 24 },
    { x: 70, y: 24 },
    { x: 73, y: 24 },
    { x: 74, y: 24 },
    { x: 75, y: 24 },
    { x: 68, y: 25 },
    { x: 69, y: 25 },
    { x: 70, y: 25 },
    { x: 73, y: 25 },
    { x: 74, y: 25 },
    { x: 75, y: 25 },
    { x: 24, y: 26 },
    { x: 25, y: 26 },
    { x: 26, y: 26 },
    { x: 27, y: 26 },
    { x: 28, y: 26 },
    { x: 29, y: 26 },
    { x: 30, y: 26 },
    { x: 31, y: 26 },
    { x: 68, y: 26 },
    { x: 69, y: 26 },
    { x: 70, y: 26 },
    { x: 73, y: 26 },
    { x: 74, y: 26 },
    { x: 75, y: 26 },
    { x: 24, y: 27 },
    { x: 25, y: 27 },
    { x: 26, y: 27 },
    { x: 27, y: 27 },
    { x: 28, y: 27 },
    { x: 29, y: 27 },
    { x: 30, y: 27 },
    { x: 31, y: 27 },
    { x: 68, y: 27 },
    { x: 69, y: 27 },
    { x: 70, y: 27 },
    { x: 73, y: 27 },
    { x: 74, y: 27 },
    { x: 75, y: 27 },
    { x: 24, y: 28 },
    { x: 25, y: 28 },
    { x: 26, y: 28 },
    { x: 27, y: 28 },
    { x: 28, y: 28 },
    { x: 29, y: 28 },
    { x: 30, y: 28 },
    { x: 31, y: 28 },
    { x: 68, y: 28 },
    { x: 69, y: 28 },
    { x: 70, y: 28 },
    { x: 73, y: 28 },
    { x: 74, y: 28 },
    { x: 75, y: 28 },
    { x: 8, y: 34 },
    { x: 9, y: 34 },
    { x: 10, y: 34 },
    { x: 11, y: 34 },
    { x: 12, y: 34 },
    { x: 13, y: 34 },
    { x: 14, y: 34 },
    { x: 15, y: 34 },
    { x: 52, y: 34 },
    { x: 53, y: 34 },
    { x: 54, y: 34 },
    { x: 55, y: 34 },
    { x: 56, y: 34 },
    { x: 57, y: 34 },
    { x: 58, y: 34 },
    { x: 59, y: 34 },
    { x: 84, y: 34 },
    { x: 85, y: 34 },
    { x: 86, y: 34 },
    { x: 87, y: 34 },
    { x: 88, y: 34 },
    { x: 89, y: 34 },
    { x: 90, y: 34 },
    { x: 91, y: 34 },
    { x: 8, y: 35 },
    { x: 9, y: 35 },
    { x: 10, y: 35 },
    { x: 11, y: 35 },
    { x: 12, y: 35 },
    { x: 13, y: 35 },
    { x: 14, y: 35 },
    { x: 15, y: 35 },
    { x: 52, y: 35 },
    { x: 53, y: 35 },
    { x: 54, y: 35 },
    { x: 55, y: 35 },
    { x: 56, y: 35 },
    { x: 57, y: 35 },
    { x: 58, y: 35 },
    { x: 59, y: 35 },
    { x: 84, y: 35 },
    { x: 85, y: 35 },
    { x: 86, y: 35 },
    { x: 87, y: 35 },
    { x: 88, y: 35 },
    { x: 89, y: 35 },
    { x: 90, y: 35 },
    { x: 91, y: 35 },
    { x: 8, y: 36 },
    { x: 9, y: 36 },
    { x: 10, y: 36 },
    { x: 11, y: 36 },
    { x: 12, y: 36 },
    { x: 13, y: 36 },
    { x: 14, y: 36 },
    { x: 15, y: 36 },
    { x: 52, y: 36 },
    { x: 53, y: 36 },
    { x: 54, y: 36 },
    { x: 55, y: 36 },
    { x: 56, y: 36 },
    { x: 57, y: 36 },
    { x: 58, y: 36 },
    { x: 59, y: 36 },
    { x: 84, y: 36 },
    { x: 85, y: 36 },
    { x: 86, y: 36 },
    { x: 87, y: 36 },
    { x: 88, y: 36 },
    { x: 89, y: 36 },
    { x: 90, y: 36 },
    { x: 91, y: 36 },
    { x: 8, y: 37 },
    { x: 9, y: 37 },
    { x: 10, y: 37 },
    { x: 11, y: 37 },
    { x: 12, y: 37 },
    { x: 13, y: 37 },
    { x: 14, y: 37 },
    { x: 15, y: 37 },
    { x: 84, y: 37 },
    { x: 85, y: 37 },
    { x: 86, y: 37 },
    { x: 87, y: 37 },
    { x: 88, y: 37 },
    { x: 89, y: 37 },
    { x: 90, y: 37 },
    { x: 91, y: 37 },
    { x: 8, y: 38 },
    { x: 9, y: 38 },
    { x: 10, y: 38 },
    { x: 11, y: 38 },
    { x: 12, y: 38 },
    { x: 13, y: 38 },
    { x: 14, y: 38 },
    { x: 15, y: 38 },
    { x: 84, y: 38 },
    { x: 85, y: 38 },
    { x: 86, y: 38 },
    { x: 87, y: 38 },
    { x: 88, y: 38 },
    { x: 89, y: 38 },
    { x: 90, y: 38 },
    { x: 91, y: 38 },
    { x: 8, y: 39 },
    { x: 9, y: 39 },
    { x: 10, y: 39 },
    { x: 11, y: 39 },
    { x: 12, y: 39 },
    { x: 13, y: 39 },
    { x: 14, y: 39 },
    { x: 15, y: 39 },
    { x: 52, y: 39 },
    { x: 53, y: 39 },
    { x: 54, y: 39 },
    { x: 55, y: 39 },
    { x: 56, y: 39 },
    { x: 57, y: 39 },
    { x: 58, y: 39 },
    { x: 59, y: 39 },
    { x: 84, y: 39 },
    { x: 85, y: 39 },
    { x: 86, y: 39 },
    { x: 87, y: 39 },
    { x: 88, y: 39 },
    { x: 89, y: 39 },
    { x: 90, y: 39 },
    { x: 91, y: 39 },
    { x: 8, y: 40 },
    { x: 9, y: 40 },
    { x: 10, y: 40 },
    { x: 11, y: 40 },
    { x: 12, y: 40 },
    { x: 13, y: 40 },
    { x: 14, y: 40 },
    { x: 15, y: 40 },
    { x: 52, y: 40 },
    { x: 53, y: 40 },
    { x: 54, y: 40 },
    { x: 55, y: 40 },
    { x: 56, y: 40 },
    { x: 57, y: 40 },
    { x: 58, y: 40 },
    { x: 59, y: 40 },
    { x: 84, y: 40 },
    { x: 85, y: 40 },
    { x: 86, y: 40 },
    { x: 87, y: 40 },
    { x: 88, y: 40 },
    { x: 89, y: 40 },
    { x: 90, y: 40 },
    { x: 91, y: 40 },
    { x: 8, y: 41 },
    { x: 9, y: 41 },
    { x: 10, y: 41 },
    { x: 11, y: 41 },
    { x: 12, y: 41 },
    { x: 13, y: 41 },
    { x: 14, y: 41 },
    { x: 15, y: 41 },
    { x: 52, y: 41 },
    { x: 53, y: 41 },
    { x: 54, y: 41 },
    { x: 55, y: 41 },
    { x: 56, y: 41 },
    { x: 57, y: 41 },
    { x: 58, y: 41 },
    { x: 59, y: 41 },
    { x: 84, y: 41 },
    { x: 85, y: 41 },
    { x: 86, y: 41 },
    { x: 87, y: 41 },
    { x: 88, y: 41 },
    { x: 89, y: 41 },
    { x: 90, y: 41 },
    { x: 91, y: 41 },
  ],
};
const map2Data: mapObj = {
  sp1: { x: 5, y: 24 },
  sp2: { x: 94, y: 25 },
  walls: [
    { x: 11, y: 0 },
    { x: 12, y: 0 },
    { x: 87, y: 0 },
    { x: 88, y: 0 },
    { x: 11, y: 1 },
    { x: 12, y: 1 },
    { x: 87, y: 1 },
    { x: 88, y: 1 },
    { x: 11, y: 2 },
    { x: 12, y: 2 },
    { x: 87, y: 2 },
    { x: 88, y: 2 },
    { x: 11, y: 3 },
    { x: 12, y: 3 },
    { x: 87, y: 3 },
    { x: 88, y: 3 },
    { x: 5, y: 4 },
    { x: 6, y: 4 },
    { x: 11, y: 4 },
    { x: 12, y: 4 },
    { x: 17, y: 4 },
    { x: 18, y: 4 },
    { x: 27, y: 4 },
    { x: 28, y: 4 },
    { x: 33, y: 4 },
    { x: 34, y: 4 },
    { x: 35, y: 4 },
    { x: 36, y: 4 },
    { x: 37, y: 4 },
    { x: 38, y: 4 },
    { x: 39, y: 4 },
    { x: 40, y: 4 },
    { x: 41, y: 4 },
    { x: 42, y: 4 },
    { x: 43, y: 4 },
    { x: 44, y: 4 },
    { x: 45, y: 4 },
    { x: 46, y: 4 },
    { x: 47, y: 4 },
    { x: 48, y: 4 },
    { x: 49, y: 4 },
    { x: 50, y: 4 },
    { x: 51, y: 4 },
    { x: 56, y: 4 },
    { x: 57, y: 4 },
    { x: 58, y: 4 },
    { x: 59, y: 4 },
    { x: 60, y: 4 },
    { x: 61, y: 4 },
    { x: 62, y: 4 },
    { x: 63, y: 4 },
    { x: 64, y: 4 },
    { x: 65, y: 4 },
    { x: 66, y: 4 },
    { x: 71, y: 4 },
    { x: 72, y: 4 },
    { x: 81, y: 4 },
    { x: 82, y: 4 },
    { x: 87, y: 4 },
    { x: 88, y: 4 },
    { x: 93, y: 4 },
    { x: 94, y: 4 },
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 11, y: 5 },
    { x: 12, y: 5 },
    { x: 17, y: 5 },
    { x: 18, y: 5 },
    { x: 27, y: 5 },
    { x: 28, y: 5 },
    { x: 33, y: 5 },
    { x: 34, y: 5 },
    { x: 35, y: 5 },
    { x: 36, y: 5 },
    { x: 37, y: 5 },
    { x: 38, y: 5 },
    { x: 39, y: 5 },
    { x: 40, y: 5 },
    { x: 41, y: 5 },
    { x: 42, y: 5 },
    { x: 43, y: 5 },
    { x: 44, y: 5 },
    { x: 45, y: 5 },
    { x: 46, y: 5 },
    { x: 47, y: 5 },
    { x: 48, y: 5 },
    { x: 49, y: 5 },
    { x: 50, y: 5 },
    { x: 51, y: 5 },
    { x: 56, y: 5 },
    { x: 57, y: 5 },
    { x: 58, y: 5 },
    { x: 59, y: 5 },
    { x: 60, y: 5 },
    { x: 61, y: 5 },
    { x: 62, y: 5 },
    { x: 63, y: 5 },
    { x: 64, y: 5 },
    { x: 65, y: 5 },
    { x: 66, y: 5 },
    { x: 71, y: 5 },
    { x: 72, y: 5 },
    { x: 81, y: 5 },
    { x: 82, y: 5 },
    { x: 87, y: 5 },
    { x: 88, y: 5 },
    { x: 93, y: 5 },
    { x: 94, y: 5 },
    { x: 5, y: 6 },
    { x: 6, y: 6 },
    { x: 11, y: 6 },
    { x: 12, y: 6 },
    { x: 17, y: 6 },
    { x: 18, y: 6 },
    { x: 27, y: 6 },
    { x: 28, y: 6 },
    { x: 42, y: 6 },
    { x: 43, y: 6 },
    { x: 56, y: 6 },
    { x: 57, y: 6 },
    { x: 71, y: 6 },
    { x: 72, y: 6 },
    { x: 81, y: 6 },
    { x: 82, y: 6 },
    { x: 87, y: 6 },
    { x: 88, y: 6 },
    { x: 93, y: 6 },
    { x: 94, y: 6 },
    { x: 5, y: 7 },
    { x: 6, y: 7 },
    { x: 11, y: 7 },
    { x: 12, y: 7 },
    { x: 17, y: 7 },
    { x: 18, y: 7 },
    { x: 27, y: 7 },
    { x: 28, y: 7 },
    { x: 42, y: 7 },
    { x: 43, y: 7 },
    { x: 56, y: 7 },
    { x: 57, y: 7 },
    { x: 71, y: 7 },
    { x: 72, y: 7 },
    { x: 81, y: 7 },
    { x: 82, y: 7 },
    { x: 87, y: 7 },
    { x: 88, y: 7 },
    { x: 93, y: 7 },
    { x: 94, y: 7 },
    { x: 5, y: 8 },
    { x: 6, y: 8 },
    { x: 11, y: 8 },
    { x: 12, y: 8 },
    { x: 17, y: 8 },
    { x: 18, y: 8 },
    { x: 27, y: 8 },
    { x: 28, y: 8 },
    { x: 42, y: 8 },
    { x: 43, y: 8 },
    { x: 56, y: 8 },
    { x: 57, y: 8 },
    { x: 71, y: 8 },
    { x: 72, y: 8 },
    { x: 81, y: 8 },
    { x: 82, y: 8 },
    { x: 87, y: 8 },
    { x: 88, y: 8 },
    { x: 93, y: 8 },
    { x: 94, y: 8 },
    { x: 5, y: 9 },
    { x: 6, y: 9 },
    { x: 11, y: 9 },
    { x: 12, y: 9 },
    { x: 17, y: 9 },
    { x: 18, y: 9 },
    { x: 27, y: 9 },
    { x: 28, y: 9 },
    { x: 42, y: 9 },
    { x: 43, y: 9 },
    { x: 56, y: 9 },
    { x: 57, y: 9 },
    { x: 71, y: 9 },
    { x: 72, y: 9 },
    { x: 81, y: 9 },
    { x: 82, y: 9 },
    { x: 87, y: 9 },
    { x: 88, y: 9 },
    { x: 93, y: 9 },
    { x: 94, y: 9 },
    { x: 5, y: 10 },
    { x: 6, y: 10 },
    { x: 17, y: 10 },
    { x: 18, y: 10 },
    { x: 27, y: 10 },
    { x: 28, y: 10 },
    { x: 42, y: 10 },
    { x: 43, y: 10 },
    { x: 56, y: 10 },
    { x: 57, y: 10 },
    { x: 71, y: 10 },
    { x: 72, y: 10 },
    { x: 81, y: 10 },
    { x: 82, y: 10 },
    { x: 93, y: 10 },
    { x: 94, y: 10 },
    { x: 5, y: 11 },
    { x: 6, y: 11 },
    { x: 17, y: 11 },
    { x: 18, y: 11 },
    { x: 27, y: 11 },
    { x: 28, y: 11 },
    { x: 42, y: 11 },
    { x: 43, y: 11 },
    { x: 56, y: 11 },
    { x: 57, y: 11 },
    { x: 71, y: 11 },
    { x: 72, y: 11 },
    { x: 81, y: 11 },
    { x: 82, y: 11 },
    { x: 93, y: 11 },
    { x: 94, y: 11 },
    { x: 5, y: 12 },
    { x: 6, y: 12 },
    { x: 17, y: 12 },
    { x: 18, y: 12 },
    { x: 27, y: 12 },
    { x: 28, y: 12 },
    { x: 42, y: 12 },
    { x: 43, y: 12 },
    { x: 56, y: 12 },
    { x: 57, y: 12 },
    { x: 71, y: 12 },
    { x: 72, y: 12 },
    { x: 81, y: 12 },
    { x: 82, y: 12 },
    { x: 93, y: 12 },
    { x: 94, y: 12 },
    { x: 5, y: 13 },
    { x: 6, y: 13 },
    { x: 17, y: 13 },
    { x: 18, y: 13 },
    { x: 27, y: 13 },
    { x: 28, y: 13 },
    { x: 29, y: 13 },
    { x: 30, y: 13 },
    { x: 31, y: 13 },
    { x: 32, y: 13 },
    { x: 33, y: 13 },
    { x: 34, y: 13 },
    { x: 35, y: 13 },
    { x: 36, y: 13 },
    { x: 37, y: 13 },
    { x: 42, y: 13 },
    { x: 43, y: 13 },
    { x: 48, y: 13 },
    { x: 49, y: 13 },
    { x: 50, y: 13 },
    { x: 51, y: 13 },
    { x: 52, y: 13 },
    { x: 53, y: 13 },
    { x: 54, y: 13 },
    { x: 55, y: 13 },
    { x: 56, y: 13 },
    { x: 57, y: 13 },
    { x: 62, y: 13 },
    { x: 63, y: 13 },
    { x: 64, y: 13 },
    { x: 65, y: 13 },
    { x: 66, y: 13 },
    { x: 67, y: 13 },
    { x: 68, y: 13 },
    { x: 69, y: 13 },
    { x: 70, y: 13 },
    { x: 71, y: 13 },
    { x: 72, y: 13 },
    { x: 81, y: 13 },
    { x: 82, y: 13 },
    { x: 93, y: 13 },
    { x: 94, y: 13 },
    { x: 5, y: 14 },
    { x: 6, y: 14 },
    { x: 11, y: 14 },
    { x: 12, y: 14 },
    { x: 17, y: 14 },
    { x: 18, y: 14 },
    { x: 27, y: 14 },
    { x: 28, y: 14 },
    { x: 29, y: 14 },
    { x: 30, y: 14 },
    { x: 31, y: 14 },
    { x: 32, y: 14 },
    { x: 33, y: 14 },
    { x: 34, y: 14 },
    { x: 35, y: 14 },
    { x: 36, y: 14 },
    { x: 37, y: 14 },
    { x: 42, y: 14 },
    { x: 43, y: 14 },
    { x: 48, y: 14 },
    { x: 49, y: 14 },
    { x: 50, y: 14 },
    { x: 51, y: 14 },
    { x: 52, y: 14 },
    { x: 53, y: 14 },
    { x: 54, y: 14 },
    { x: 55, y: 14 },
    { x: 56, y: 14 },
    { x: 57, y: 14 },
    { x: 62, y: 14 },
    { x: 63, y: 14 },
    { x: 64, y: 14 },
    { x: 65, y: 14 },
    { x: 66, y: 14 },
    { x: 67, y: 14 },
    { x: 68, y: 14 },
    { x: 69, y: 14 },
    { x: 70, y: 14 },
    { x: 71, y: 14 },
    { x: 72, y: 14 },
    { x: 81, y: 14 },
    { x: 82, y: 14 },
    { x: 87, y: 14 },
    { x: 88, y: 14 },
    { x: 93, y: 14 },
    { x: 94, y: 14 },
    { x: 5, y: 15 },
    { x: 6, y: 15 },
    { x: 11, y: 15 },
    { x: 12, y: 15 },
    { x: 17, y: 15 },
    { x: 18, y: 15 },
    { x: 81, y: 15 },
    { x: 82, y: 15 },
    { x: 87, y: 15 },
    { x: 88, y: 15 },
    { x: 93, y: 15 },
    { x: 94, y: 15 },
    { x: 5, y: 16 },
    { x: 6, y: 16 },
    { x: 11, y: 16 },
    { x: 12, y: 16 },
    { x: 17, y: 16 },
    { x: 18, y: 16 },
    { x: 81, y: 16 },
    { x: 82, y: 16 },
    { x: 87, y: 16 },
    { x: 88, y: 16 },
    { x: 93, y: 16 },
    { x: 94, y: 16 },
    { x: 5, y: 17 },
    { x: 6, y: 17 },
    { x: 11, y: 17 },
    { x: 12, y: 17 },
    { x: 17, y: 17 },
    { x: 18, y: 17 },
    { x: 81, y: 17 },
    { x: 82, y: 17 },
    { x: 87, y: 17 },
    { x: 88, y: 17 },
    { x: 93, y: 17 },
    { x: 94, y: 17 },
    { x: 5, y: 18 },
    { x: 6, y: 18 },
    { x: 11, y: 18 },
    { x: 12, y: 18 },
    { x: 17, y: 18 },
    { x: 18, y: 18 },
    { x: 81, y: 18 },
    { x: 82, y: 18 },
    { x: 87, y: 18 },
    { x: 88, y: 18 },
    { x: 93, y: 18 },
    { x: 94, y: 18 },
    { x: 5, y: 19 },
    { x: 6, y: 19 },
    { x: 11, y: 19 },
    { x: 12, y: 19 },
    { x: 17, y: 19 },
    { x: 18, y: 19 },
    { x: 27, y: 19 },
    { x: 28, y: 19 },
    { x: 29, y: 19 },
    { x: 30, y: 19 },
    { x: 31, y: 19 },
    { x: 32, y: 19 },
    { x: 33, y: 19 },
    { x: 34, y: 19 },
    { x: 35, y: 19 },
    { x: 36, y: 19 },
    { x: 37, y: 19 },
    { x: 38, y: 19 },
    { x: 39, y: 19 },
    { x: 40, y: 19 },
    { x: 41, y: 19 },
    { x: 42, y: 19 },
    { x: 43, y: 19 },
    { x: 44, y: 19 },
    { x: 45, y: 19 },
    { x: 46, y: 19 },
    { x: 47, y: 19 },
    { x: 48, y: 19 },
    { x: 49, y: 19 },
    { x: 50, y: 19 },
    { x: 51, y: 19 },
    { x: 52, y: 19 },
    { x: 53, y: 19 },
    { x: 54, y: 19 },
    { x: 55, y: 19 },
    { x: 56, y: 19 },
    { x: 57, y: 19 },
    { x: 58, y: 19 },
    { x: 59, y: 19 },
    { x: 60, y: 19 },
    { x: 61, y: 19 },
    { x: 62, y: 19 },
    { x: 63, y: 19 },
    { x: 64, y: 19 },
    { x: 65, y: 19 },
    { x: 66, y: 19 },
    { x: 67, y: 19 },
    { x: 68, y: 19 },
    { x: 69, y: 19 },
    { x: 70, y: 19 },
    { x: 71, y: 19 },
    { x: 72, y: 19 },
    { x: 81, y: 19 },
    { x: 82, y: 19 },
    { x: 87, y: 19 },
    { x: 88, y: 19 },
    { x: 93, y: 19 },
    { x: 94, y: 19 },
    { x: 5, y: 20 },
    { x: 6, y: 20 },
    { x: 11, y: 20 },
    { x: 12, y: 20 },
    { x: 17, y: 20 },
    { x: 18, y: 20 },
    { x: 27, y: 20 },
    { x: 28, y: 20 },
    { x: 29, y: 20 },
    { x: 30, y: 20 },
    { x: 31, y: 20 },
    { x: 32, y: 20 },
    { x: 33, y: 20 },
    { x: 34, y: 20 },
    { x: 35, y: 20 },
    { x: 36, y: 20 },
    { x: 37, y: 20 },
    { x: 38, y: 20 },
    { x: 39, y: 20 },
    { x: 40, y: 20 },
    { x: 41, y: 20 },
    { x: 42, y: 20 },
    { x: 43, y: 20 },
    { x: 44, y: 20 },
    { x: 45, y: 20 },
    { x: 46, y: 20 },
    { x: 47, y: 20 },
    { x: 48, y: 20 },
    { x: 49, y: 20 },
    { x: 50, y: 20 },
    { x: 51, y: 20 },
    { x: 52, y: 20 },
    { x: 53, y: 20 },
    { x: 54, y: 20 },
    { x: 55, y: 20 },
    { x: 56, y: 20 },
    { x: 57, y: 20 },
    { x: 58, y: 20 },
    { x: 59, y: 20 },
    { x: 60, y: 20 },
    { x: 61, y: 20 },
    { x: 62, y: 20 },
    { x: 63, y: 20 },
    { x: 64, y: 20 },
    { x: 65, y: 20 },
    { x: 66, y: 20 },
    { x: 67, y: 20 },
    { x: 68, y: 20 },
    { x: 69, y: 20 },
    { x: 70, y: 20 },
    { x: 71, y: 20 },
    { x: 72, y: 20 },
    { x: 81, y: 20 },
    { x: 82, y: 20 },
    { x: 87, y: 20 },
    { x: 88, y: 20 },
    { x: 93, y: 20 },
    { x: 94, y: 20 },
    { x: 11, y: 21 },
    { x: 12, y: 21 },
    { x: 87, y: 21 },
    { x: 88, y: 21 },
    { x: 11, y: 22 },
    { x: 12, y: 22 },
    { x: 87, y: 22 },
    { x: 88, y: 22 },
    { x: 11, y: 23 },
    { x: 12, y: 23 },
    { x: 87, y: 23 },
    { x: 88, y: 23 },
    { x: 0, y: 24 },
    { x: 1, y: 24 },
    { x: 11, y: 24 },
    { x: 12, y: 24 },
    { x: 22, y: 24 },
    { x: 23, y: 24 },
    { x: 76, y: 24 },
    { x: 77, y: 24 },
    { x: 87, y: 24 },
    { x: 88, y: 24 },
    { x: 98, y: 24 },
    { x: 99, y: 24 },
    { x: 0, y: 25 },
    { x: 1, y: 25 },
    { x: 11, y: 25 },
    { x: 12, y: 25 },
    { x: 22, y: 25 },
    { x: 23, y: 25 },
    { x: 76, y: 25 },
    { x: 77, y: 25 },
    { x: 87, y: 25 },
    { x: 88, y: 25 },
    { x: 98, y: 25 },
    { x: 99, y: 25 },
    { x: 11, y: 26 },
    { x: 12, y: 26 },
    { x: 87, y: 26 },
    { x: 88, y: 26 },
    { x: 11, y: 27 },
    { x: 12, y: 27 },
    { x: 87, y: 27 },
    { x: 88, y: 27 },
    { x: 11, y: 28 },
    { x: 12, y: 28 },
    { x: 87, y: 28 },
    { x: 88, y: 28 },
    { x: 5, y: 29 },
    { x: 6, y: 29 },
    { x: 11, y: 29 },
    { x: 12, y: 29 },
    { x: 17, y: 29 },
    { x: 18, y: 29 },
    { x: 27, y: 29 },
    { x: 28, y: 29 },
    { x: 29, y: 29 },
    { x: 30, y: 29 },
    { x: 31, y: 29 },
    { x: 32, y: 29 },
    { x: 33, y: 29 },
    { x: 34, y: 29 },
    { x: 35, y: 29 },
    { x: 36, y: 29 },
    { x: 37, y: 29 },
    { x: 38, y: 29 },
    { x: 39, y: 29 },
    { x: 40, y: 29 },
    { x: 41, y: 29 },
    { x: 42, y: 29 },
    { x: 43, y: 29 },
    { x: 44, y: 29 },
    { x: 45, y: 29 },
    { x: 46, y: 29 },
    { x: 47, y: 29 },
    { x: 48, y: 29 },
    { x: 49, y: 29 },
    { x: 50, y: 29 },
    { x: 51, y: 29 },
    { x: 52, y: 29 },
    { x: 53, y: 29 },
    { x: 54, y: 29 },
    { x: 55, y: 29 },
    { x: 56, y: 29 },
    { x: 57, y: 29 },
    { x: 58, y: 29 },
    { x: 59, y: 29 },
    { x: 60, y: 29 },
    { x: 61, y: 29 },
    { x: 62, y: 29 },
    { x: 63, y: 29 },
    { x: 64, y: 29 },
    { x: 65, y: 29 },
    { x: 66, y: 29 },
    { x: 67, y: 29 },
    { x: 68, y: 29 },
    { x: 69, y: 29 },
    { x: 70, y: 29 },
    { x: 71, y: 29 },
    { x: 72, y: 29 },
    { x: 81, y: 29 },
    { x: 82, y: 29 },
    { x: 87, y: 29 },
    { x: 88, y: 29 },
    { x: 93, y: 29 },
    { x: 94, y: 29 },
    { x: 5, y: 30 },
    { x: 6, y: 30 },
    { x: 11, y: 30 },
    { x: 12, y: 30 },
    { x: 17, y: 30 },
    { x: 18, y: 30 },
    { x: 27, y: 30 },
    { x: 28, y: 30 },
    { x: 29, y: 30 },
    { x: 30, y: 30 },
    { x: 31, y: 30 },
    { x: 32, y: 30 },
    { x: 33, y: 30 },
    { x: 34, y: 30 },
    { x: 35, y: 30 },
    { x: 36, y: 30 },
    { x: 37, y: 30 },
    { x: 38, y: 30 },
    { x: 39, y: 30 },
    { x: 40, y: 30 },
    { x: 41, y: 30 },
    { x: 42, y: 30 },
    { x: 43, y: 30 },
    { x: 44, y: 30 },
    { x: 45, y: 30 },
    { x: 46, y: 30 },
    { x: 47, y: 30 },
    { x: 48, y: 30 },
    { x: 49, y: 30 },
    { x: 50, y: 30 },
    { x: 51, y: 30 },
    { x: 52, y: 30 },
    { x: 53, y: 30 },
    { x: 54, y: 30 },
    { x: 55, y: 30 },
    { x: 56, y: 30 },
    { x: 57, y: 30 },
    { x: 58, y: 30 },
    { x: 59, y: 30 },
    { x: 60, y: 30 },
    { x: 61, y: 30 },
    { x: 62, y: 30 },
    { x: 63, y: 30 },
    { x: 64, y: 30 },
    { x: 65, y: 30 },
    { x: 66, y: 30 },
    { x: 67, y: 30 },
    { x: 68, y: 30 },
    { x: 69, y: 30 },
    { x: 70, y: 30 },
    { x: 71, y: 30 },
    { x: 72, y: 30 },
    { x: 81, y: 30 },
    { x: 82, y: 30 },
    { x: 87, y: 30 },
    { x: 88, y: 30 },
    { x: 93, y: 30 },
    { x: 94, y: 30 },
    { x: 5, y: 31 },
    { x: 6, y: 31 },
    { x: 11, y: 31 },
    { x: 12, y: 31 },
    { x: 17, y: 31 },
    { x: 18, y: 31 },
    { x: 81, y: 31 },
    { x: 82, y: 31 },
    { x: 87, y: 31 },
    { x: 88, y: 31 },
    { x: 93, y: 31 },
    { x: 94, y: 31 },
    { x: 5, y: 32 },
    { x: 6, y: 32 },
    { x: 11, y: 32 },
    { x: 12, y: 32 },
    { x: 17, y: 32 },
    { x: 18, y: 32 },
    { x: 81, y: 32 },
    { x: 82, y: 32 },
    { x: 87, y: 32 },
    { x: 88, y: 32 },
    { x: 93, y: 32 },
    { x: 94, y: 32 },
    { x: 5, y: 33 },
    { x: 6, y: 33 },
    { x: 11, y: 33 },
    { x: 12, y: 33 },
    { x: 17, y: 33 },
    { x: 18, y: 33 },
    { x: 81, y: 33 },
    { x: 82, y: 33 },
    { x: 87, y: 33 },
    { x: 88, y: 33 },
    { x: 93, y: 33 },
    { x: 94, y: 33 },
    { x: 5, y: 34 },
    { x: 6, y: 34 },
    { x: 11, y: 34 },
    { x: 12, y: 34 },
    { x: 17, y: 34 },
    { x: 18, y: 34 },
    { x: 81, y: 34 },
    { x: 82, y: 34 },
    { x: 87, y: 34 },
    { x: 88, y: 34 },
    { x: 93, y: 34 },
    { x: 94, y: 34 },
    { x: 5, y: 35 },
    { x: 6, y: 35 },
    { x: 11, y: 35 },
    { x: 12, y: 35 },
    { x: 17, y: 35 },
    { x: 18, y: 35 },
    { x: 27, y: 35 },
    { x: 28, y: 35 },
    { x: 29, y: 35 },
    { x: 30, y: 35 },
    { x: 31, y: 35 },
    { x: 32, y: 35 },
    { x: 33, y: 35 },
    { x: 34, y: 35 },
    { x: 35, y: 35 },
    { x: 36, y: 35 },
    { x: 37, y: 35 },
    { x: 42, y: 35 },
    { x: 43, y: 35 },
    { x: 44, y: 35 },
    { x: 45, y: 35 },
    { x: 46, y: 35 },
    { x: 47, y: 35 },
    { x: 48, y: 35 },
    { x: 49, y: 35 },
    { x: 50, y: 35 },
    { x: 51, y: 35 },
    { x: 56, y: 35 },
    { x: 57, y: 35 },
    { x: 62, y: 35 },
    { x: 63, y: 35 },
    { x: 64, y: 35 },
    { x: 65, y: 35 },
    { x: 66, y: 35 },
    { x: 67, y: 35 },
    { x: 68, y: 35 },
    { x: 69, y: 35 },
    { x: 70, y: 35 },
    { x: 71, y: 35 },
    { x: 72, y: 35 },
    { x: 81, y: 35 },
    { x: 82, y: 35 },
    { x: 87, y: 35 },
    { x: 88, y: 35 },
    { x: 93, y: 35 },
    { x: 94, y: 35 },
    { x: 5, y: 36 },
    { x: 6, y: 36 },
    { x: 17, y: 36 },
    { x: 18, y: 36 },
    { x: 27, y: 36 },
    { x: 28, y: 36 },
    { x: 29, y: 36 },
    { x: 30, y: 36 },
    { x: 31, y: 36 },
    { x: 32, y: 36 },
    { x: 33, y: 36 },
    { x: 34, y: 36 },
    { x: 35, y: 36 },
    { x: 36, y: 36 },
    { x: 37, y: 36 },
    { x: 42, y: 36 },
    { x: 43, y: 36 },
    { x: 44, y: 36 },
    { x: 45, y: 36 },
    { x: 46, y: 36 },
    { x: 47, y: 36 },
    { x: 48, y: 36 },
    { x: 49, y: 36 },
    { x: 50, y: 36 },
    { x: 51, y: 36 },
    { x: 56, y: 36 },
    { x: 57, y: 36 },
    { x: 62, y: 36 },
    { x: 63, y: 36 },
    { x: 64, y: 36 },
    { x: 65, y: 36 },
    { x: 66, y: 36 },
    { x: 67, y: 36 },
    { x: 68, y: 36 },
    { x: 69, y: 36 },
    { x: 70, y: 36 },
    { x: 71, y: 36 },
    { x: 72, y: 36 },
    { x: 81, y: 36 },
    { x: 82, y: 36 },
    { x: 93, y: 36 },
    { x: 94, y: 36 },
    { x: 5, y: 37 },
    { x: 6, y: 37 },
    { x: 17, y: 37 },
    { x: 18, y: 37 },
    { x: 27, y: 37 },
    { x: 28, y: 37 },
    { x: 42, y: 37 },
    { x: 43, y: 37 },
    { x: 56, y: 37 },
    { x: 57, y: 37 },
    { x: 71, y: 37 },
    { x: 72, y: 37 },
    { x: 81, y: 37 },
    { x: 82, y: 37 },
    { x: 93, y: 37 },
    { x: 94, y: 37 },
    { x: 5, y: 38 },
    { x: 6, y: 38 },
    { x: 17, y: 38 },
    { x: 18, y: 38 },
    { x: 27, y: 38 },
    { x: 28, y: 38 },
    { x: 42, y: 38 },
    { x: 43, y: 38 },
    { x: 56, y: 38 },
    { x: 57, y: 38 },
    { x: 71, y: 38 },
    { x: 72, y: 38 },
    { x: 81, y: 38 },
    { x: 82, y: 38 },
    { x: 93, y: 38 },
    { x: 94, y: 38 },
    { x: 5, y: 39 },
    { x: 6, y: 39 },
    { x: 17, y: 39 },
    { x: 18, y: 39 },
    { x: 27, y: 39 },
    { x: 28, y: 39 },
    { x: 42, y: 39 },
    { x: 43, y: 39 },
    { x: 56, y: 39 },
    { x: 57, y: 39 },
    { x: 71, y: 39 },
    { x: 72, y: 39 },
    { x: 81, y: 39 },
    { x: 82, y: 39 },
    { x: 93, y: 39 },
    { x: 94, y: 39 },
    { x: 5, y: 40 },
    { x: 6, y: 40 },
    { x: 11, y: 40 },
    { x: 12, y: 40 },
    { x: 17, y: 40 },
    { x: 18, y: 40 },
    { x: 27, y: 40 },
    { x: 28, y: 40 },
    { x: 42, y: 40 },
    { x: 43, y: 40 },
    { x: 56, y: 40 },
    { x: 57, y: 40 },
    { x: 71, y: 40 },
    { x: 72, y: 40 },
    { x: 81, y: 40 },
    { x: 82, y: 40 },
    { x: 87, y: 40 },
    { x: 88, y: 40 },
    { x: 93, y: 40 },
    { x: 94, y: 40 },
    { x: 5, y: 41 },
    { x: 6, y: 41 },
    { x: 11, y: 41 },
    { x: 12, y: 41 },
    { x: 17, y: 41 },
    { x: 18, y: 41 },
    { x: 27, y: 41 },
    { x: 28, y: 41 },
    { x: 42, y: 41 },
    { x: 43, y: 41 },
    { x: 56, y: 41 },
    { x: 57, y: 41 },
    { x: 71, y: 41 },
    { x: 72, y: 41 },
    { x: 81, y: 41 },
    { x: 82, y: 41 },
    { x: 87, y: 41 },
    { x: 88, y: 41 },
    { x: 93, y: 41 },
    { x: 94, y: 41 },
    { x: 5, y: 42 },
    { x: 6, y: 42 },
    { x: 11, y: 42 },
    { x: 12, y: 42 },
    { x: 17, y: 42 },
    { x: 18, y: 42 },
    { x: 27, y: 42 },
    { x: 28, y: 42 },
    { x: 42, y: 42 },
    { x: 43, y: 42 },
    { x: 56, y: 42 },
    { x: 57, y: 42 },
    { x: 71, y: 42 },
    { x: 72, y: 42 },
    { x: 81, y: 42 },
    { x: 82, y: 42 },
    { x: 87, y: 42 },
    { x: 88, y: 42 },
    { x: 93, y: 42 },
    { x: 94, y: 42 },
    { x: 5, y: 43 },
    { x: 6, y: 43 },
    { x: 11, y: 43 },
    { x: 12, y: 43 },
    { x: 17, y: 43 },
    { x: 18, y: 43 },
    { x: 27, y: 43 },
    { x: 28, y: 43 },
    { x: 42, y: 43 },
    { x: 43, y: 43 },
    { x: 56, y: 43 },
    { x: 57, y: 43 },
    { x: 71, y: 43 },
    { x: 72, y: 43 },
    { x: 81, y: 43 },
    { x: 82, y: 43 },
    { x: 87, y: 43 },
    { x: 88, y: 43 },
    { x: 93, y: 43 },
    { x: 94, y: 43 },
    { x: 5, y: 44 },
    { x: 6, y: 44 },
    { x: 11, y: 44 },
    { x: 12, y: 44 },
    { x: 17, y: 44 },
    { x: 18, y: 44 },
    { x: 27, y: 44 },
    { x: 28, y: 44 },
    { x: 33, y: 44 },
    { x: 34, y: 44 },
    { x: 35, y: 44 },
    { x: 36, y: 44 },
    { x: 37, y: 44 },
    { x: 38, y: 44 },
    { x: 39, y: 44 },
    { x: 40, y: 44 },
    { x: 41, y: 44 },
    { x: 42, y: 44 },
    { x: 43, y: 44 },
    { x: 48, y: 44 },
    { x: 49, y: 44 },
    { x: 50, y: 44 },
    { x: 51, y: 44 },
    { x: 52, y: 44 },
    { x: 53, y: 44 },
    { x: 54, y: 44 },
    { x: 55, y: 44 },
    { x: 56, y: 44 },
    { x: 57, y: 44 },
    { x: 58, y: 44 },
    { x: 59, y: 44 },
    { x: 60, y: 44 },
    { x: 61, y: 44 },
    { x: 62, y: 44 },
    { x: 63, y: 44 },
    { x: 64, y: 44 },
    { x: 65, y: 44 },
    { x: 66, y: 44 },
    { x: 71, y: 44 },
    { x: 72, y: 44 },
    { x: 81, y: 44 },
    { x: 82, y: 44 },
    { x: 87, y: 44 },
    { x: 88, y: 44 },
    { x: 93, y: 44 },
    { x: 94, y: 44 },
    { x: 5, y: 45 },
    { x: 6, y: 45 },
    { x: 11, y: 45 },
    { x: 12, y: 45 },
    { x: 17, y: 45 },
    { x: 18, y: 45 },
    { x: 27, y: 45 },
    { x: 28, y: 45 },
    { x: 33, y: 45 },
    { x: 34, y: 45 },
    { x: 35, y: 45 },
    { x: 36, y: 45 },
    { x: 37, y: 45 },
    { x: 38, y: 45 },
    { x: 39, y: 45 },
    { x: 40, y: 45 },
    { x: 41, y: 45 },
    { x: 42, y: 45 },
    { x: 43, y: 45 },
    { x: 48, y: 45 },
    { x: 49, y: 45 },
    { x: 50, y: 45 },
    { x: 51, y: 45 },
    { x: 52, y: 45 },
    { x: 53, y: 45 },
    { x: 54, y: 45 },
    { x: 55, y: 45 },
    { x: 56, y: 45 },
    { x: 57, y: 45 },
    { x: 58, y: 45 },
    { x: 59, y: 45 },
    { x: 60, y: 45 },
    { x: 61, y: 45 },
    { x: 62, y: 45 },
    { x: 63, y: 45 },
    { x: 64, y: 45 },
    { x: 65, y: 45 },
    { x: 66, y: 45 },
    { x: 71, y: 45 },
    { x: 72, y: 45 },
    { x: 81, y: 45 },
    { x: 82, y: 45 },
    { x: 87, y: 45 },
    { x: 88, y: 45 },
    { x: 93, y: 45 },
    { x: 94, y: 45 },
    { x: 11, y: 46 },
    { x: 12, y: 46 },
    { x: 87, y: 46 },
    { x: 88, y: 46 },
    { x: 11, y: 47 },
    { x: 12, y: 47 },
    { x: 87, y: 47 },
    { x: 88, y: 47 },
    { x: 11, y: 48 },
    { x: 12, y: 48 },
    { x: 87, y: 48 },
    { x: 88, y: 48 },
    { x: 11, y: 49 },
    { x: 12, y: 49 },
    { x: 87, y: 49 },
    { x: 88, y: 49 },
  ],
};
const mapDatas = [map0Data, map1Data, map2Data];

// Colors ENUM
enum Colors {
  PINK = "#ff95dd",
  GREEN = "#2ecc71",
  BLUE = "#0095dd",
  YELLOW = "#ffcc00",
  ORANGE = "#ff9900",
  RED = "#ff3300",
  MAGIC = "#660066",
  WHITE = "#fff",
}

// No idea what to call this. Probability for an associated item/event
type ProbSlice = { p: number; v: any };

// Weighted probability function. Ensure probs add to 100% or the largest prob will scale up to make it 100%
function weightedProb(...args: ProbSlice[]) {
  let p_rand = Math.random();
  let p_acc = 0;
  args = args.sort((a, b) => a.p - b.p);
  for (var i = 0; i < args.length - 1; i++) {
    p_acc += args[i].p;
    if (p_rand > 1 - p_acc) {
      return args[i].v;
    }
  }
  return args[args.length - 1].v;
}

// Type describing objects that can exist in the grid
type GridObjects = null | GameEndingObject | SnakeSegment | FoodPellet;

// Game control class object
class Game {
  // Render and update
  private static force_frame = false;
  private static readonly default_refresh_delay = 100;
  private static refresh_delay = 100;
  static readonly cols = 100;
  static readonly rows = 50;
  static readonly pixel_size = 10;
  static readonly header_size = 50;

  // Current game instance
  static current: Game;

  // Score and game-state variables
  static paused = false;
  static isMP = false;
  static highScores = [0, 0, 0];
  static mpWins = [0, 0];
  static currentMap = 0;

  // Instance variables
  score: number;
  p1_snake: Snake;
  p2_snake?: Snake;
  private grid: GridObjects[][];

  // Create a new game
  private constructor() {
    this.score = 0;
    this.grid = [];
    this.createGrid();
    this.loadMap(Game.currentMap);
  }

  // Spawn a new game and set it to the class variable
  static newGame() {
    // Allow update to refresh canvas while paused
    Game.force_frame = true;

    // Set current game as new game
    if (!Game.current) {
      Game.current = new Game();
      Game.current.update();
    } else {
      Game.current = new Game();
      Game.resetGameSpeed();
    }
  }

  // Start a single-player game
  static startSPGame() {
    Game.isMP = false;
    Game.newGame();
  }

  // Start a two-player game
  static startMPGame() {
    Game.isMP = true;
    Game.newGame();
  }

  // Create the grid at the game start
  createGrid() {
    for (let i = 0; i < Game.cols; i++) {
      this.grid[i] = [];
      for (let j = 0; j < Game.rows; j++) {
        this.grid[i][j] = null;
      }
    }
  }

  loadMap(index: number) {
    //Load map
    let load = mapDatas[index];

    // Load walls
    if (load.hasOwnProperty("walls")) {
      for (let wall of load.walls) {
        this.setObject(wall, new Wall());
      }
    }

    // Load Snake 1
    this.p1_snake = new Snake(0, load.sp1);
    this.setObject(load.sp1, new SnakeSegment(0));

    // Load Snake 2 and an additional pellet if 2 players
    if (Game.isMP) {
      this.p2_snake = new Snake(1, load.sp2);
      this.setObject(load.sp2, new SnakeSegment(1));
      this.genFoodPellet();
    }

    // Load main food pellet after walls defined
    this.genFoodPellet();
  }

  // Spawn a new food pellet in the current game
  genFoodPellet() {
    let open_p: Point[] = [];

    // Determine value of pellet
    let value = weightedProb(
      { p: 0.75, v: 5 },
      { p: 0.2, v: 10 },
      { p: 0.045, v: 25 },
      { p: 0.005, v: 100 }
    );

    // Find open locations for the new pellet and spawn
    for (let i = 0; i < Game.cols; i++) {
      for (let j = 0; j < Game.rows; j++) {
        if (this.getObject(toPoint(i, j)) === null) {
          open_p.push(toPoint(i, j));
        }
      }
    }
    let new_p = open_p[Math.floor(Math.random() * open_p.length)];
    this.setObject(new_p, new FoodPellet(value));
  }

  // Get the object at a given coordinate
  getObject(p: Dimensioned): GridObjects {
    return this.grid[p.x][p.y];
  }

  // Set the object at a given coordinate
  setObject(p: Dimensioned, o: GridObjects) {
    this.grid[p.x][p.y] = o;
  }

  // Check if a coordinate is out of game bounds
  static outOfBounds(p: Point) {
    return p.x < 0 || p.y < 0 || p.x >= Game.cols || p.y >= Game.rows;
  }

  static increaseGameSpeed() {
    if (Game.refresh_delay > 0) {
      Game.refresh_delay *= 0.9;
    }
  }

  static resetGameSpeed() {
    Game.refresh_delay = Game.default_refresh_delay;
  }

  // Looped update of canvas drawing
  update() {
    // Draw everything
    if (!Game.paused || Game.force_frame) {
      // Turn off override if needed and skip movement if so
      if (Game.force_frame) {
        Game.force_frame = false;
      } else {
        Game.current.p1_snake.move();
        if (Game.current.p2_snake) {
          Game.current.p2_snake.move();
        }
      }
      Game.current.draw();
    }

    if (Game.current.isGameOver()) {
      Game.current.runGameOver();
    }

    // Loop update with a timeout
    setTimeout(
      () => requestAnimationFrame(this.update.bind(this)),
      Game.refresh_delay
    );
  }

  static refreshScreen() {
    Game.force_frame = true;
  }

  isGameOver() {
    return (
      (!Game.isMP && this.p1_snake.disabled) ||
      (Game.isMP &&
        ((this.p1_snake.disabled && this.p2_snake.disabled) ||
          (this.p1_snake.disabled &&
            this.p2_snake.score > this.p1_snake.score) ||
          (this.p2_snake.disabled &&
            this.p2_snake.score < this.p1_snake.score)))
    );
  }

  runGameOver() {
    // If single-player, check if new high-score is achieved
    if (!Game.isMP) {
      if (Game.highScores[Game.currentMap] < this.p1_snake.score) {
        Game.highScores[Game.currentMap] = this.p1_snake.score;
        memSaveHighScores();
      }
      Game.startSPGame();
      // If two-player, tally winner
    } else {
      if (this.p2_snake.score > this.p1_snake.score) {
        Game.mpWins[1] += 1;
        memSaveMPWins();
      } else if (this.p2_snake.score < this.p1_snake.score) {
        Game.mpWins[0] += 1;
        memSaveMPWins();
      }
      Game.startMPGame();
    }
  }

  // Draw everything
  draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawScore();
    this.drawGameGrid();
  }

  // Draw score on canvas
  drawScore() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, Game.pixel_size * 5);
    ctx.fillStyle = Colors.BLUE;
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = Colors.WHITE;
    ctx.font = "20px Arial";

    if (!Game.isMP) {
      // Draw Scoring
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${this.p1_snake.score}`, 30, 30);
      ctx.textAlign = "right";
      ctx.fillText(
        `High-Score: ${Game.highScores[Game.currentMap]}`,
        canvas.width - 30,
        30
      );
    } else {
      // Draw p1 square
      ctx.beginPath();
      ctx.rect(16, 18, Game.pixel_size, Game.pixel_size);
      ctx.fillStyle = Colors.PINK;
      ctx.fill();
      ctx.closePath();

      // Draw p2 square
      ctx.beginPath();
      ctx.rect(canvas.width - 26, 18, Game.pixel_size, Game.pixel_size);
      ctx.fillStyle = Colors.GREEN;
      ctx.fill();
      ctx.closePath();

      // Draw Crown
      if (Game.mpWins[0] > Game.mpWins[1]) {
        ctx.drawImage(crown, 16, 13);
      } else if (Game.mpWins[0] < Game.mpWins[1]) {
        ctx.drawImage(crown, canvas.width - 26, 13);
      }

      // Draw Scoring
      ctx.fillStyle = Colors.WHITE;
      ctx.textAlign = "left";
      ctx.fillText(`P1 Score: ${this.p1_snake.score}`, 30, 30);
      ctx.textAlign = "center";
      ctx.fillText(`${Game.mpWins[0]}:${Game.mpWins[1]}`, canvas.width / 2, 30);
      ctx.textAlign = "right";
      ctx.fillText(`P2 Score: ${this.p2_snake.score}`, canvas.width - 30, 30); //
    }
  }

  static drawPixel(p: Point, color: string) {
    ctx.beginPath();
    ctx.rect(
      Game.pixel_size * p.x,
      Game.pixel_size * p.y + Game.header_size,
      Game.pixel_size,
      Game.pixel_size
    );
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  // Draw game_grid on canvas
  drawGameGrid() {
    for (let i = 0; i < Game.cols; i++) {
      for (let j = 0; j < Game.rows; j++) {
        let obj = this.getObject(toPoint(i, j));
        if (obj !== null) {
          if (obj instanceof SnakeSegment) {
            Game.drawPixel(toPoint(i, j), Snake.color[obj.id]);
          } else if (obj instanceof FoodPellet) {
            Game.drawPixel(toPoint(i, j), FoodPellet.color[obj.value]);
          } else if (obj instanceof Wall) {
            Game.drawPixel(toPoint(i, j), Colors.BLUE);
          }
        }
      }
    }
  }

  // Player 1 Snake Controls
  controlSnakes(this: Game, e: KeyboardEvent) {
    if (e.key === "Up" || e.key === "ArrowUp") {
      this.p1_snake.setFacing(Direction.UP);
    }
    if (e.key === "Down" || e.key === "ArrowDown") {
      this.p1_snake.setFacing(Direction.DOWN);
    }
    if (e.key === "Left" || e.key === "ArrowLeft") {
      this.p1_snake.setFacing(Direction.LEFT);
    }
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.p1_snake.setFacing(Direction.RIGHT);
    }

    if (this.p2_snake) {
      if (e.key === "W" || e.key === "w") {
        this.p2_snake.setFacing(Direction.UP);
      }
      if (e.key === "S" || e.key === "s") {
        this.p2_snake.setFacing(Direction.DOWN);
      }
      if (e.key === "A" || e.key === "a") {
        this.p2_snake.setFacing(Direction.LEFT);
      }
      if (e.key === "D" || e.key === "d") {
        this.p2_snake.setFacing(Direction.RIGHT);
      }
    }
  }
}

class Snake {
  head: Point;
  tail: Point;

  id: number;
  seg_to_gen: number;
  last_facing: Direction;
  current_facing: Direction;
  score: number;
  disabled: boolean;

  static color = [Colors.PINK, Colors.GREEN];

  constructor(id: number, p1: Point) {
    this.head = p1;
    this.tail = p1;

    this.id = id;
    this.seg_to_gen = 5;
    this.last_facing = Direction.NONE;
    this.current_facing = Direction.NONE;
    this.disabled = false;

    this.score = 0;

    //Game.current.setObject(this.head, new SnakeSegment());
  }

  move() {
    // Don't attempt to move if there is NONE facing or diabled!
    if (this.current_facing === Direction.NONE || this.disabled) return;

    // Get coords of location we intend to move into
    let next_location = addVect(this.head, dirToVect(this.current_facing));

    // Game end condition for out-of-bounds
    if (Game.outOfBounds(next_location)) {
      this.disabled = true;
      return;
    }

    // We know we are in bounds so we can get what is at the location
    let grid_object = Game.current.getObject(next_location);

    // Game end condition for hitting something deadly
    if (grid_object instanceof GameEndingObject) {
      this.disabled = true;
      return;
    }

    // Score condition for hitting a food
    if (grid_object instanceof FoodPellet) {
      if (grid_object.value === 100) {
        Game.resetGameSpeed();
      } else {
        Game.increaseGameSpeed();
      }
      this.score += grid_object.value;
      this.seg_to_gen += grid_object.value;
      Game.current.genFoodPellet();
    }

    // Move the snake forwards
    // @ts-ignore - object at Snake.head is ALWAYS a SnakeSegment
    Game.current.getObject(this.head).next_segment = this.current_facing;
    Game.current.setObject(next_location, new SnakeSegment(this.id));
    this.head = next_location;
    this.last_facing = this.current_facing;
    if (this.seg_to_gen > 0) {
      this.seg_to_gen--;
    } else {
      let old_tail = Game.current.getObject(this.tail);
      Game.current.setObject(this.tail, null);
      if (old_tail instanceof SnakeSegment) {
        this.tail = addVect(this.tail, dirToVect(old_tail.next_segment));
      }
    }
  }

  setFacing(dir: Direction) {
    if (dir !== opposingDirection(this.last_facing)) {
      this.current_facing = dir;
    }
  }
}

// Food pellet class
class FoodPellet {
  static color: { [key: number]: string } = {
    5: Colors.YELLOW,
    10: Colors.ORANGE,
    25: Colors.RED,
    100: Colors.MAGIC,
  };

  value: number;

  constructor(value = 5) {
    this.value = value;
  }
}

// Parent class for all objects with game-ending collision
class GameEndingObject {}
class Wall extends GameEndingObject {}

// Snake Segment Class
class SnakeSegment extends GameEndingObject {
  next_segment: Direction;
  id: number;

  constructor(id: number, next_segment: Direction = Direction.NONE) {
    super();
    this.next_segment = next_segment;
    this.id = id;
  }
}

// Load local storage ad start new game
memLoadMap();
memLoadHighScores();
memLoadMPWins();
memLoadGameMode();
Game.newGame();

function endGame() {
  Game.current.score = -1000;
  Game.current.p1_snake.disabled = true;
}

function addVect(...vectors: Dimensioned[]) {
  return vectors.reduce((a, b) => ({ x: a.x + b.x, y: a.y + b.y }));
}

// Load local storage for Map selection
function memLoadMap() {
  let _load = +localStorage.getItem("selectedMap");
  if (_load !== null) {
    Game.currentMap = _load;
    selectMapBtn(_load);
  }
}

// Update local storage for Map selection
function memSaveMap() {
  localStorage.setItem("selectedMap", Game.currentMap.toString());
}

// Load local storage for Map selection
function memLoadGameMode() {
  let _load = JSON.parse(localStorage.getItem("gameMode"));
  if (_load !== null) {
    Game.isMP = _load;
    if (_load) {
      selectMPBtn();
    } else {
      selectSPBtn();
    }
  }
}

// Update local storage for Map selection
function memSaveGameMode() {
  localStorage.setItem("gameMode", JSON.stringify(Game.isMP));
}

// Load local storage for high-scores
function memLoadHighScores() {
  let _load = JSON.parse(localStorage.getItem("highScores"));
  if (_load !== null) {
    Game.highScores = _load;
  }
}

// Update local storage for high-scores
function memSaveHighScores() {
  localStorage.setItem("highScores", JSON.stringify(Game.highScores));
}

// Reset local storage for high-scores
function memResetHighScores() {
  Game.highScores = [0, 0, 0];
  memSaveHighScores();
  Game.refreshScreen();
}

// Load local storage for multiplayer scores
function memLoadMPWins() {
  let _load = JSON.parse(localStorage.getItem("mpWins"));
  if (_load !== null) {
    Game.mpWins = _load;
  }
}

// Update local storage for multiplayer scores
function memSaveMPWins() {
  localStorage.setItem("mpWins", JSON.stringify(Game.mpWins));
}

// Reset local storage for multiplayer scores
function memResetMPWins() {
  Game.mpWins = [0, 0];
  memSaveMPWins();
  Game.refreshScreen();
}

// Keyboard event handlers for snake movement
document.addEventListener("keydown", (e) => Game.current.controlSnakes(e));

// Toggle the CSS for the associated button and set the internal variable
function selectMapBtn(n: number) {
  for (let btn of mapBtns) {
    btn.classList.remove("selected");
  }
  mapBtns[n].classList.add("selected");
  Game.currentMap = n;
}

// Map selection event handlers
map0Btn.addEventListener("click", () => {
  selectMapBtn(0);
  memSaveMap();
  Game.newGame();
});
map1Btn.addEventListener("click", () => {
  selectMapBtn(1);
  memSaveMap();
  Game.newGame();
});
map2Btn.addEventListener("click", () => {
  selectMapBtn(2);
  memSaveMap();
  Game.newGame();
});

// Toggle the CSS for the associated button and set the internal variable
function selectSPBtn() {
  mpBtn.classList.remove("selected");
  spBtn.classList.add("selected");
}
function selectMPBtn() {
  spBtn.classList.remove("selected");
  mpBtn.classList.add("selected");
}

// Game mode selection event handlers
spBtn.addEventListener("click", () => {
  selectSPBtn();
  Game.startSPGame();
  memSaveGameMode();
});
mpBtn.addEventListener("click", () => {
  selectMPBtn();
  Game.startMPGame();
  memSaveGameMode();
});

// Rules and close event handlers
rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
  Game.paused = true;
});
closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
  Game.paused = false;
});

// Reset Scores event handlers
resetSPBtn.addEventListener("click", () => {
  memResetHighScores();
});
resetMPBtn.addEventListener("click", () => {
  memResetMPWins();
});
