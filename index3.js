//autotag
const autoTags = (base = "http://mysite.local/tag/") => {
  return (str, tags, url = base) => {
    tags = "(" + tags.join("|") + ")";
    return str.replace(new RegExp(tags, "gi"), `<a href="${url}$1">@$1</a>`);
  };
};

let result = autoTags()("it is intresting to learn js", ["html", "js"]);

console.log(result);
//result
//it is intresting to learn <a href="http://mysite.local/tag/js">@js</a>
