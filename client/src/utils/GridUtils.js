export const createGrid = (w, h, t) => {
    let arr = [];
    for (let x = 0; x < h; x++) {
        for (let y = 0; y < w; y++) {
            arr.push({
                x, y, t
            });
        }
    }
    return arr;
};