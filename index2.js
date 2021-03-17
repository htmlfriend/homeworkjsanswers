const autoReplace = (needles, change, haystack) => {
  if (!needles || !change || !haystack) {
    return false;
  } else {
    return haystack.replace(new RegExp(needles.join("|"), "gi"), change);
  }
};

let result = autoReplace(
  ["carrot", "tomato"],
  "food",
  "red tomato and carrot are good for salats"
);

console.log("result", result);
// result red food and food are good for salats
