export const removeArrayItem = (arr, val) => {
  let index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

export const removeArrayObject = (arr, val) => {
  let index = arr.map(i => i.verse).indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
};
