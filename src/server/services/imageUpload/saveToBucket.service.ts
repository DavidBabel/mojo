import { Storage } from "@google-cloud/storage";
import { FileUpload } from "graphql-upload";

const gcStorage = new Storage();
const bucketName = "mojo-dev";
const uploadBucket = gcStorage.bucket(bucketName);
// TODO => config variable
const bucketPrefix = `https://storage.googleapis.com/${bucketName}/`;

export async function saveToBucket(video: FileUpload) {
  const { createReadStream, filename } = video;

  return new Promise<string>((resolve, reject) =>
    createReadStream()
      .pipe(
        uploadBucket.file(filename).createWriteStream({
          resumable: false,
          gzip: true,
        }),
      )
      .on("finish", () => resolve(bucketPrefix + filename))
      .on("error", error => {
        console.error(error);
        reject(error);
      }),
  );
}
