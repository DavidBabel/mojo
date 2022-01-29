import { createWriteStream } from "fs";
import path from "path";
import { FileUpload } from "graphql-upload";

export async function saveToLocal(video: FileUpload) {
  const { createReadStream, filename } = video;

  const filePath = path.join("public/localBucket", filename);

  return new Promise<string>((resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(filePath))
      .on("close", () => resolve(`/localBucket/${filename}`))
      .on("error", error => {
        console.error(error);
        reject(error);
      }),
  );
}
