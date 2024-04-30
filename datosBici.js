const fs = require("fs");
const bicicletasJson = fs.readFileSync("./bicicletas.json","utf-8");

const bicicletasArray = JSON.parse(bicicletasJson);

//console.log(bicicletasArray);

module.exports = bicicletasArray;