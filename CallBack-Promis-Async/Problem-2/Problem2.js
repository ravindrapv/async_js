const fs = require("fs");

const readFile = async (filename) => {
  const data = await fs.promises.readFile(filename, "utf8");
  return data;
};

const writeFile = async (filename, data) => {
  await fs.promises.writeFile(filename, data, "utf8");
};

const toUppercase = (str) => str.toUpperCase();

const toLowercase = (str) => str.toLowerCase();

const splitIntoSentences = (str) => {
  const sentences = str.split(/\.\s+/);
  return sentences;
};

const sortArray = (array) => array.sort();

const deleteFile = async (filename) => {
  await fs.promises.unlink(filename);
};

const appendFile = async (filename, data) => {
  await fs.promises.appendFile(filename, data, "utf8");
};

// Main function & Read the lipsum.txt file
async function main() {
  const lipsumText = await readFile("lipsum.txt");
  const uppercaseText = toUppercase(lipsumText);

  // Write the uppercase content to a new file called uppercase.txt
  await writeFile("uppercase.txt", uppercaseText);

  // Store the name of the new file in filenames.txt
  const filenames = ["uppercase.txt"];
  await writeFile("filenames.txt", filenames.join("\n"));

  // Read the new file and convert it to lowercase
  const lowercaseText = await readFile("uppercase.txt");

  // Split the contents into sentences
  const sentences = splitIntoSentences(lowercaseText);

  // Write each sentence into separate new files
  for (const sentence of sentences) {
    const filename = `sentence-${sentences.indexOf(sentence) + 1}.txt`;
    const fullPath = filename;
    await writeFile(fullPath, sentence);
    // Append the name of the new file to filenames.txt in append mode
    await appendFile("filenames.txt", `${filename}\n`);
  }

  // Read the new files, sort the content, write it out to a new file called sorted.txt
  const sortedContent = [];
  for (const filename of filenames) {
    const content = await readFile(filename);
    sortedContent.push(content);
  }

  sortedContent.sort();

  await writeFile("sorted.txt", sortedContent.join("\n"));

  // Read the contents of filenames.txt and delete all the new files that are mentioned in that list concurrently
  const filesToDelete = (await readFile("filenames.txt")).split("\n");
  for (const filename of filesToDelete) {
    if (filename) {
      // Check if the filename is not empty
      await deleteFile(filename);
    }
  }
}

module.exports = main;
