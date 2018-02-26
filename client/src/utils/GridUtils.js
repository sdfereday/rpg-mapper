export const createGrid = (w, h, t) => {
    let arr = [];
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            arr.push({
                x, y, t
            });
        }
    }
    return arr;
};

export const createGridAsBox = (w, h, t, edgeType) => {
    let arr = [];
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            arr.push({
                x, y,
                t: x === 0
                || x === w - 1
                || y === 0
                || y === h - 1
                ? edgeType : t
            });
        }
    }
    return arr;
};