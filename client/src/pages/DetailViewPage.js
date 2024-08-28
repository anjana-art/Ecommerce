import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AllProducts from "./AllProducts";

const DetailViewPage = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();
  console.log({ id });
  const [title, setTitle] = useState("");
  const [catagory, setCatagory] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [created, setCreated] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products/allProducts/" + id).then((response) => {
      const { data } = response;
      setProduct(data);
      setTitle(data.title);
      setCatagory(data.catagory);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPrice(data.price);
      setCreated(data.created);
    });
  }, [id]);

  return (
    <>
      <h1 className="text-2xl">Product Details</h1>
      <div className="border border-black  text-white bg-gray-600 p-5 m-5 rounded-2xl h-70">
        <div className="   ">
          <h1 className="text-2xl m-5"> {title}</h1>

          <div className=" grid grid-cols-3 md:grid-2 lg:grid-cols-4 p-2 bg-gray-600 m-5  shrink-0 rounded-2xl ">
            {" "}
            {/*i have removed grow from this classname to resize image*/}
            {addedPhotos.length > 0 &&
              addedPhotos.map((link) => (
                <div className="h-32 flex   relative" key={link}>
                  <img
                    className=" object-cover h-32 w-32"
                    src={"http://localhost:5555/uploads/" + link}
                    alt="iphone/smartphone/laptop/other"
                  />
                </div>
              ))}
          </div>
          <p className="mt-1 ml-5">Item listed in:{created}</p>

          <p className="m-5">{description}</p>
        </div>
        <div>
          <p></p>
          <p className="m-5">Price in Euro:{price}</p>
        </div>

        <div className="flex gap-2 p-5 m-5">
            <button className="p-2 bg-primary rounded-2xl text-white">Buy Now</button>
            <button className="p-2 bg-primary rounded-2xl text-white">Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default DetailViewPage;
