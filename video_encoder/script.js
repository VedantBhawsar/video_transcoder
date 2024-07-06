const { Storage } = require("@google-cloud/storage");
const { generateRandomId } = require("./utils");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const dotenv = require("dotenv");

dotenv.config();

const BASE_URL = `https://storage.googleapis.com/${process.env.BUCKET_ID}/`;

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: "keys.json",
});

// Create a bucket object
const bucket = storage.bucket(process.env.BUCKET_ID);

async function uploadFileWithPath(filePath, destinationFolder) {
  try {
    const destination = destinationFolder
      ? `${destinationFolder}/${path.basename(filePath)}`
      : path.basename(filePath);

    console.log(`Uploading ${filePath} to ${destination}`);
    await bucket.upload(filePath, {
      destination: destination,
    });
    console.log(`Upload complete for ${filePath}`);
  } catch (error) {
    console.log(error);
  }
}

async function uploadFile(sourceFilePath, destinationFolder = "") {
  try {
    const p = exec("npm install");
    p.stdout.on("data", function (data) {
      console.log(data.toString());
    });

    p.stderr.on("data", function (data) {
      console.error(data.toString());
    });

    p.on("close", async function () {
      console.log("Starting to upload files from", sourceFilePath);
      console.log("--------------------------------");
      const videoFolderContents = fs.readdirSync(sourceFilePath, {
        withFileTypes: true,
      });

      if (videoFolderContents.length === 0) {
        console.error("No video files found in the specified directory");
        return;
      }
      console.log("--------------------------------");

      for (let dirent of videoFolderContents) {
        const filePath = path.join(sourceFilePath, dirent.name);
        if (dirent.isDirectory()) {
          console.log(`Skipping directory ${filePath}`);
        } else {
          await uploadFileWithPath(filePath, destinationFolder);
        }
      }
    });
  } catch (err) {
    // console.log(err);
    throw new Error(err.message || "Something went wrong uploading");
  }
}

// Example usage

function init() {
  const id = generateRandomId();
  const resolutions = ["480p", "360p", "720p", "1080p"];
  for (let resolution of resolutions) {
    try {
      uploadFile(`./output/${resolution}`, `${id}/${resolution}`);
    } catch (error) {
      break;
    }
  }
}

init();
