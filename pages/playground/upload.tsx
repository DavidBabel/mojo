import type { NextPage } from "next";
import React from "react";

const PlaygroundUploadPage: NextPage = () => {
  const handleChange = (e: React.ChangeEventHandler<HTMLInputElement>) => {
    let formData = new FormData();
    formData.append("video", e.target.files[0]);
    fetch("/api/playground/fileUpload", { method: "PUT", body: formData })
      .then(console.log)
      .catch(console.log);
  };
  return (
    <>
      <input accept="*" type="file" onChange={handleChange} />
    </>
  );
};

export default PlaygroundUploadPage;
