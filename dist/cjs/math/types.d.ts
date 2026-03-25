export type Point = {
    x: number;
    y: number;
};
export type Size = {
    width: number;
    height: number;
};
export type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export type Rectangle = Point & Size;
export type Circle = Point & {
    radius: number;
};
export type VecPoint = [x: number, y: number];
export type VecSize = [x: number, y: number];
export type VecLine = [x1: number, y1: number, x2: number, y2: number];
export type VecRectangle = [
    x: number,
    y: number,
    width: number,
    height: number
];
export type VecCircle = [x: number, y: number, radius: number];
