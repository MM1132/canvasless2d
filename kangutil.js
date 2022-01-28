export const emptyMatrix = (width, height) =>
    Array.from({length: height}).fill(Array.from({length: width}).fill(null))