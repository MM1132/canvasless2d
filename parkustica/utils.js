// A helper function for the random parameters
let randomMinMax = minMax => minMax.min + Math.random() * Math.abs(minMax.min - minMax.max)

// Reading the parameters of the particle form the JSON
export const readParameter = range => {
    if(typeof range?.min != "undefined" && typeof range?.max != "undefined")
        return randomMinMax(range)
    else if(typeof range == "number")
        return range
    else
        return false
}

// To deal with the color changes
export const rgbaChange = color => {
    let startColor = rgbaStringToDict(color.start)
    let endColor = rgbaStringToDict(color.end)

    return {
        ...startColor,
        change: {
            r: readParameter(color.speed) * (endColor.r - startColor.r),
            g: readParameter(color.speed) * (endColor.g - startColor.g),
            b: readParameter(color.speed) * (endColor.b - startColor.b),
            a: readParameter(color.speed) * (endColor.a - startColor.a)
        }
    }
}

let rgbaStringToDict = rgbStr => {
    rgbStr = rgbStr.replace(/[^\d,]/g, '').split(',').map(e => {
        return parseInt(e)
    })
    let color = {
        r: rgbStr[0],
        g: rgbStr[1],
        b: rgbStr[2]
    }
    if(rgbStr.length == 4)
        color.a = rgbStr[3]
    else
        color.a = 1
    return color
}

export const dictToRgbaString = dict => `rgba(${Math.floor(dict.r)}, ${Math.floor(dict.g)}, ${Math.floor(dict.b)}, ${dict.a})`

// Assigns all the values of data to thisData
export const assignObject = (thisData, data) => {
    // They both must be of type Object
    for(const i of Object.keys(data)) {
        if(i in thisData) {
            // Only if they both are objects
            if(typeof thisData[i] == "object" && typeof data[i] == "object" && thisData[i] != null) {
                assignObject(thisData[i], data[i])
            } else { // Otherwise, assign
                thisData[i] = data[i]
            }
        }
    }
}