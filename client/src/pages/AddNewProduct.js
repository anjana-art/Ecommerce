import React, { useState } from "react";
import axios from "axios";

const AddNewProduct = () => {
  const [title, setTitle] = useState("");
  const [catagory, setCatagory] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/api/users/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    console.log('target.files' , files);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios.post("/api/users/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(response => {
        const { data:filenames} = response;
        console.log('response.data', response.data);
        console.log("data", filenames);

        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <div>
      <h2 className="text-xl text-center p-3">Add New Product</h2>
      <form>
        <div>
          <h2 className="text-2xl">Title</h2>
          <p className="text-gray-500 text-sm">
            Title for your product. should be short catchy and easy to
            understand
          </p>
        </div>
        <input
          type="text"
          placeholder="title, for eg. iphone android  laptop  or other "
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></input>
        <h2 className="mt-5 text-2xl">Catagory:</h2>
        <p className="text-gray-500 text-sm">catagory of product</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 items-center cursor-pointer">
          <div className=" flex border px-4 py-2  rounded-full">
            <input
              className="mr-1"
              type="radio"
              id="iphone"
              name="catagory"
              value="iphone"
              onChange={(ev) => setCatagory(ev.target.value)}
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
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>

            <label for="iphone">iphone</label>
          </div>
          <div className=" flex border px-4 py-2  rounded-full">
            <input
              className="mr-1"
              type="radio"
              id="android"
              name="catagory"
              value="android"
              onChange={(ev) => setCatagory(ev.target.value)}
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
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>

            <label for="android">android</label>
          </div>
          <div className=" flex border px-4 py-2  rounded-full">
            <input
              className="mr-1"
              type="radio"
              id="laptop"
              name="catagory"
              value="laptop"
              onChange={(ev) => setCatagory(ev.target.value)}
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
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>

            <label for="laptop">laptop</label>
          </div>
          <div className=" flex border px-4 py-2  rounded-full">
            <input
              className="mr-1"
              type="radio"
              id="other"
              name="catagory"
              value="other"
              onChange={(ev) => setCatagory(ev.target.value)}
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
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <label for="other">other</label>
          </div>
        </div>
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
              <div>
                <div>
                  <img
                    className="border rounded-2xl "
                    src={"http://localhost:5555/uploads/" + link}
                    alt='phone/laptop/other' 
                  />
                </div>
              </div>
            ))}
          <label className=" cursor-pointer flex  items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-500 gap-1">
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
        <h2 className="mt-5 text-2xl">Description:</h2>
        <p className="text-gray-500 text-sm">
          all the information about product
        </p>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>

        <h2 className="mt-5 text-2xl">Price:</h2>
        <p className="text-gray-500 text-sm">price of product in euro</p>
        <input
          type="number"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        ></input>

        <button className="primary m-4">Save</button>
      </form>
    </div>
  );
};

export default AddNewProduct;
