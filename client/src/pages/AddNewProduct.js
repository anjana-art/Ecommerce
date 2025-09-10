import React, {  useState } from "react";
import axios from "axios";
import PhotoUploader from "../components/PhotoUploader.js";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProfileNav from "../components/ProfileNav.js";

const AddNewProduct = () => {
  /* const { id } = useParams();
  console.log({ id }); */
  const [title, setTitle] = useState("");
  const [catagory, setCatagory] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  

  async function NewProduct(ev) {
    ev.preventDefault();
    const productData = { title, catagory, addedPhotos, description, price };

   
      await axios.post("/api/products/addNewProduct", productData);
      setRedirect(true);
    }
  

  if (redirect) {
    return <Navigate to={"/allProducts"} />;
  }

  return (
    <div className=" text-black bg-white center m-auto  border rounded-xl  grid grid-cols-3 gap-2">
     <div className="ml-2 mt-5">  
      
        <ProfileNav/>
      
     </div>
     <div className="mt-4 bg-slate-300 p-5 border rounded-2xl" > 
      <h2 className="text-xl text-center p-3">Add New Product</h2>
      <form onSubmit={NewProduct}>
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
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
    </div>
  );
};

export default AddNewProduct;
