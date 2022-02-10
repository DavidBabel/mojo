// email regex
export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

// register
export const passwordMinLength = 8;
export const passwordMaxLength = 128;
export const nameMinLength = 4;
export const nameMaxLength = 32;
export const nameRequired = true;

// video upload
export const videoTitleMinLength = 0;
export const videoTitleMaxLength = 30;
export const videoTitleRequired = false;
export const videoDescriptionMinLength = 0;
export const videoDescriptionMaxLength = 400;

// google storage
export const bucketName = "mojo-dev";
export const bucketPrefix = `https://storage.googleapis.com/${bucketName}/`;
export const localBucketPrefix = "http://localhost:4000/localBucket/";

// allowed mime types
export const allowedMimeTypes = ["video/mp4"];
