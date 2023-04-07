const arr = [1, 3, 5, 7, 9, 11, 13, 19, 25, 30, 45, 49];
const binary_search = (list, item) => {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let guess = list[mid];

    if (guess === item) {
      return mid;
    } else if (guess > item) {
      high = mid - 1;
    } else if (guess < item) {
      low = mid + 1;
    }
  }

  return null;
};

console.log(binary_search(arr, 5));
