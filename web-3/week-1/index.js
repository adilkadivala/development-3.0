const crypto = require("crypto");

const input = "100xdevs";
const hash = crypto.createHash("sha256").update(input).digest("hex");

console.log(hash);

// Function to find an input string that produces a hash starting with '00000'
function findHashWithPrefix(prefix) {
  let input = 0;
  while (true) {
    let inputStr = input.toString();
    let hash = crypto.createHash("sha256").update(inputStr).digest("hex");
    if (hash.startsWith(prefix)) {
      return { input: inputStr, hash: hash };
    }
    input++;
  }
}

// Find and print the input string and hash
const result = findHashWithPrefix("00000");
console.log(`Input: ${result.input}`);
console.log(`Hash: ${result.hash}`);


// ----- //

function findHashWithPrefixandStr(prefix) {
  let input = 0;
  while (true) {
    let inputStr = "100xdevs" + input.toString();
    let hash = crypto.createHash("sha256").update(inputStr).digest("hex");
    if (hash.startsWith(prefix)) {
      return { input: inputStr, hash: hash };
    }
    input++;
  }
}

// Find and print the input string and hash
const Fresult = findHashWithPrefixandStr("00000");
console.log(`Input: ${Fresult.input}`);
console.log(`Hash: ${Fresult.hash}`);


// ---- // 


function findHashWithPrefixFind(prefix) {
    let input = 0;
    while (true) {
        let inputStr = `
harkirat => Raman | Rs 100
Ram => Ankit | Rs 10
` + input.toString();
        let hash = crypto.createHash('sha256').update(inputStr).digest('hex');
        if (hash.startsWith(prefix)) {
            return { input: inputStr, hash: hash };
        }
        input++;
    }
}

// Find and print the input string and hash
const Nresult = findHashWithPrefixFind('00000');
console.log(`Input: ${Nresult.input}`);
console.log(`Hash: ${Nresult.hash}`);

