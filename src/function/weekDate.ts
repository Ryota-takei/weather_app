 export const weekDates = () => {
    let array = [];
    for(let i = 0; i < 8; i ++) {
      array.push({temp: { min: 0, max: 0 }, weather: [{ icon: "01d" }] })
    }
    return array;
  }
