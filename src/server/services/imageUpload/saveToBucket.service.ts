import { Storage } from "@google-cloud/storage";
import { FileUpload } from "graphql-upload";

import { bucketName, bucketPrefix } from "~/iso/constant";

const gcStorage = new Storage();
const uploadBucket = gcStorage.bucket(bucketName);

export async function saveToBucket(video: FileUpload) {
  const { createReadStream, filename } = video;

  return new Promise<string>((resolve, reject) =>
    createReadStream()
      .on("error", error => {
        console.error(error);
        reject(error);
      })
      .pipe(
        uploadBucket.file(filename).createWriteStream({
          gzip: true,
          resumable: false,
        }),
      )
      .on("finish", () => resolve(bucketPrefix + filename)),
  );
}
