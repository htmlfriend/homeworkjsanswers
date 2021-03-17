// const person = {
//   name: "yura",
//   age: 25,
//   job: "fullstack",
// };

// const op = new Proxy(person, {
//   get(target, prop) {
//     console.log("prop getting", prop);
//     // return target[prop];
//     if (!(prop in target)) {
//       return prop
//         .split("_")
//         .map((p) => target[p])
//         .join(" : ");
//     }
//     return target[prop];
//   },
//   set(target, prop, value) {
//     if (prop in target) {
//       target[prop] = value;
//     } else {
//       throw new Error("No this field in target");
//     }
//   },
//   has(target, prop) {
//     Object.keys(target).map((key) => {
//       if (key === prop) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//   },
//   deleteProperty(target, prop) {
//     console.log("deleting", prop);
//     delete target[prop];
//     return true;
//   },
// });

// op.job = "devops";
// let res = delete op.job;

// console.log(op.data);
// console.log("op", op);
// console.log("res", op.name_job_age);

// // fuctions

// const log = (text) => `Log : ${text}`;

// const fproxy = new Proxy(log, {
//   apply(target, thisArg, args) {
//     console.log("target", target);
//     console.log("this", thisArg);
//     console.log("args", args);
//     return target.apply(thisArg, args).toUpperCase();
//   },
// });
// console.log(fproxy("hsldkf"));

// // class Person

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// const PersonProxy = new Proxy(Person, {
//   construct(target, args) {
//     console.log("construct");

//     return new Proxy(new target(...args), {
//       get(t, prop) {
//         console.log("prop to request", prop);
//         return t[prop];
//       },
//     });
//   },
// });

// const Pi = new PersonProxy("Max", 40);
// Pi.name = "Ben";
// console.log("po", Pi.name);

// wrapper

const withDefaultValue = (target, defautValue = 0) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      return prop in obj ? obj[prop] : defautValue;
    },
  });
};

const position = withDefaultValue(
  {
    x: 24,
    y: 43,
    _z: 44,
  },
  0
);

console.log(position);

// Hidden properties

const withHiddenPropst = (target, prefix = "_") => {
  return new Proxy(target, {
    has: (obj, prop) => prop in obj && !prop.startsWith(prefix),
    ownKeys: (obj) =>
      Reflect.ownKeys(obj).filter((p) => !p.startsWith("prefix")),
    get: (obj, prop, receiver) => (prop in receiver ? obj[prop] : void 0),
  });
};

const data = withHiddenPropst({
  name: "Yura",
  age: 25,
  _uid: 2434908908,
});
// console.log("reflect", Reflect.ownKeys(position));

console.log(data._uid);

//optimization

const userData = [
  { id: 1, name: "John", age: 33, job: "DevOps" },
  { id: 2, name: "Helen", age: 44, job: "Tester" },
  { id: 3, name: "Bob", age: 33, job: "SysAdmin" },
];

//userData.find(user => user.id ===3);
// index = key

// const index = {};
// userData.forEach((i) => (index[i.id] = i));
// console.log(index);

const IndexArray = new Proxy(Array, {
  construct(target, [args]) {
    const index = {};
    args.forEach((item) => (index[item.id] = item));
    return new Proxy(new target(...args), {
      get(arr, prop) {
        switch (prop) {
          case "push":
            return (item) => {
              index[item.id] = item;
              arr[prop].call(arr, item);
            };
          case "findById":
            return (id) => index[id];
          default:
            return arr[prop];
        }
      },
    });
    // return new target(...args);
  },
});

const users = new IndexArray(userData);
console.log("users", users.findById(3));
//  { id: 3, name: 'Bob', age: 33, job: 'SysAdmin' }
