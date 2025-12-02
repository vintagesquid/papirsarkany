import fs from "node:fs"

try {
  fs.rmSync('./sanity/schema.json')
} catch (error) {
  console.log(error)
}
