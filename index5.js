const classNames = {
  cname: "",
  add: function (...s) {
    let cname = this.cname.splite(" ");
    let tmp = {};
    for (let i in cname) {
      tmp[cname[i]] = 1;
    }

    s.forEach(function (e) {
      tmp[e] = 1;
    });

    this.cname = "";

    for (let i in tmp) {
      this.cname += i + " ";
    }
    this.cname = this.cname.slice(0, -1);
  },
};
classNames.cname = "btn";
console.log(classNames);
