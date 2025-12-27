import fs from "node:fs";

try {
  fs.rmSync("./sanity/schema.json");
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('Sanity schema file does not exist.')
  } else {
    console.log(error);
  }
}
