function genitive(n, word) {
  let res = word.many2;
  if (n % 100 < 5 || n % 100 > 20) {
    if (n % 10 == 1) res = word.singular;
    if (n % 10 > 1 && n % 10 < 5) res = word.many1;
  }

  return `${n} ${res}`;
}

let result = genitive(61, {
  singular: "course",
  many1: "courses",
  many2: "huge courses",
});
console.log(result);
