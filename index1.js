const palmTree = (n = 1) => {
  let result = typeof n == "number" && n > 0 ? "p".repeat(n) : false;
  return result;
};

const data = palmTree(3);
console.log("data", data);
// ppp
