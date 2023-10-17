const fs = require("fs").promises;
const path = require("path");

async function createRandomJsonFile() {
  try {
    // Generate a random JSON object
    const jsonObject = {
      name: Math.random().toString(36).substring(7),
      age: Math.floor(Math.random() * 100),
    };

    const filePath = path.join(__dirname, "json", `${jsonObject.name}.json`);

    await fs.writeFile(filePath, JSON.stringify(jsonObject));
    console.log(`Created JSON file: ${filePath}`);
    return filePath;
  } catch (err) {
    console.error(`Error creating JSON file: ${err}`);
    throw err;
  }
}

async function deleteJsonFile(filename) {
  try {
    await fs.unlink(filename);
    console.log(`Deleted JSON file: ${filename}`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`File not found: ${filename}`);
    } else {
      console.error(`Error deleting JSON file: ${err}`);
      throw err;
    }
  }
}

async function main() {
  try {
    const createPromises = [];
    for (let i = 0; i < 3; i++) {
      createPromises.push(createRandomJsonFile());
    }

    const createdFiles = await Promise.all(createPromises);

    const deletePromises = createdFiles.map((filename) =>
      deleteJsonFile(filename)
    );
    await Promise.all(deletePromises);
  } catch (err) {
    console.error(`An error occurred: ${err}`);
  }
}

module.exports = main;
