import { createWriteStream } from "fs";
import { FileUpload } from "graphql-upload";
import path from "path";

export async function saveToLocal(video: FileUpload) {
  const { createReadStream, filename } = video;

  const filePath = path.join("public/localBucket", filename);

  return new Promise<string>((resolve, reject) =>
    createReadStream()
      .on("close", () => resolve(`/localBucket/${filename}`))
      .on("error", error => {
        console.error(error);
        reject(error);
      })
      .pipe(createWriteStream(filePath)),
  );
}
