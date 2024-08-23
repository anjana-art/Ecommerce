import React from "react";
import { useState } from "react";
import axios from "axios";

const PhotoUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");
  
  async function addPhotoByLink(ev) {
    ev.preventDefault();

    const { data: filename } = await axios.post("/api/users/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    console.log("target.files", files);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/api/users/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        console.log("response.data", response.data);
        console.log("data", filenames);

        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  return (
    <div>
      <h2 className="mt-5 text-2xl">Photos</h2>
      <p className="text-gray-500 text-sm">more = better</p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="add using link ....jpg , jpeg"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 p-4 rounded-2xl"
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className="mt-2  grid  gap-2 grid-cols-2 md:grid-3 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex justify-center w-full">
              <img
                className="border rounded-2xl object-cover "
                src={"http://localhost:5555/uploads/" + link}
                alt="phone/laptop/other"
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer flex  items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-500 gap-1">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
