// email regex
export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

// register
export const passwordMinLength = 8;
export const passwordMaxLength = 32;
export const nameMinLength = 8;
export const nameMaxLength = 32;

// google storage
export const bucketName = "mojo-dev";
export const bucketPrefix = `https://storage.googleapis.com/${bucketName}/`;
