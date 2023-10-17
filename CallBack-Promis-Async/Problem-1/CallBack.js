const fs = require("fs");
const path = require("path");

// Define the directory path
const jsonDirectory = path.join(__dirname, "json");

// Creating the 'json' directory if it doesn't exist
if (!fs.existsSync(jsonDirectory)) {
  fs.mkdirSync(jsonDirectory);
}

function createRandomJsonFile(callback) {
  // Generate a random JSON object
  const jsonObject = {
    name: Math.random().toString(36).substring(7),
    age: Math.floor(Math.random() * 100),
  };

  // Write the JSON object to a file
  fs.writeFile(
    path.join(jsonDirectory, `${jsonObject.name}.json`),
    JSON.stringify(jsonObject),
    (err) => {
      if (err) {
        callback(err);
      } else {
        console.log(
          `Created JSON file: ${path.join(
            jsonDirectory,
            `${jsonObject.name}.json`
          )}`
        );
        callback(null);
      }
    }
  );
}

function deleteJsonFile(filename, callback) {
  fs.unlink(filename, (err) => {
    if (err) {
      callback(err);
    } else {
      console.log(`Deleted JSON file: ${filename}`);
      callback(null);
    }
  });
}

function main() {
  // Create three random JSON files
  for (let i = 0; i < 3; i++) {
    createRandomJsonFile((err) => {
      if (err) {
        console.error(`Error creating JSON file: ${err}`);
      }
    });
  }

  // Delete the JSON files concurrently
  const jsonFiles = fs.readdirSync(jsonDirectory);
  jsonFiles.forEach((filename) => {
    deleteJsonFile(path.join(jsonDirectory, filename), (err) => {
      if (err) {
        console.error(`Error deleting JSON file: ${err}`);
      }
    });
  });
}

module.exports = main;
