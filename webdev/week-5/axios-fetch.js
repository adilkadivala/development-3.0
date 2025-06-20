import axios from "axios";

// fetch

// function main() {
//   fetch("https://jsonplaceholder.typicode.com/todos").then(async (res) => {
//     const data = await res.json();
//     console.log(data);
//   });
// }

// async function main() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/todos");
//   const res = await data.json();
//   console.log(res);
// }



// axios

async function main() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  console.log(response.data);
}

main();
