const fs = require("fs").promises;
const path = require("path");

function createRandomJsonFile() {
  return new Promise((resolve, reject) => {
    // Generate a random JSON object
    const jsonObject = {
      name: Math.random().toString(36).substring(7),
      age: Math.floor(Math.random() * 100),
    };

    const filePath = path.join(__dirname, "json", `${jsonObject.name}.json`);

    fs.writeFile(filePath, JSON.stringify(jsonObject))
      .then(() => {
        console.log(`Created JSON file: ${filePath}`);
        resolve(filePath);
      })
      .catch((err) => {
        console.error(`Error creating JSON file: ${err}`);
        reject(err);
      });
  });
}

function deleteJsonFile(filename) {
  return new Promise((resolve, reject) => {
    fs.unlink(filename)
      .then(() => {
        console.log(`Deleted JSON file: ${filename}`);
        resolve();
      })
      .catch((err) => {
        if (err.code === "ENOENT") {
          console.error(`File not found: ${filename}`);
          resolve(); // File not found is not treated as an error
        } else {
          console.error(`Error deleting JSON file: ${err}`);
          reject(err);
        }
      });
  });
}

function main() {
  const createPromises = [];
  for (let i = 0; i < 3; i++) {
    createPromises.push(createRandomJsonFile());
  }

  Promise.all(createPromises)
    .then((createdFiles) => {
      const deletePromises = createdFiles.map((filename) =>
        deleteJsonFile(filename)
      );
      return Promise.all(deletePromises);
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });
}

module.exports = main;
