import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import App from "../../App";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    
    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bank: inputs.bank,
          possession: inputs.possession,
          type: inputs.type,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          size: parseInt(inputs.size),
          borrowerName: inputs.borrowerName,
          propertyId: inputs.propertyId,
          saleNotice: inputs.saleNotice,
          titleReport: inputs.titleReport,
          viability: inputs.viability,
          propertyDesc: inputs.propertyDesc,
          EMD: inputs.EMD,
          EMDS: inputs.EMDS,
          SnE: inputs.SnE,
        },
        
      });
      
      navigate("/"+res.data.id)
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bank">Bank</label>
              <select name="bank">
                <option value="SBI" defaultChecked>
                  SBI
                </option>
                <option value="HDFC">HDFC</option>
                <option value="ICICI">ICICI</option>
                <option value="PNB">PNB</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="possession">Posession Type</label>
              <select name="possession">
                <option value="physical" defaultChecked>
                Physical
                </option>
                <option value="symbolic">Symbolic</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="borrowerName">Borrower name</label>
              <input id="borrowerName" name="borrowerName" type="text" />
            </div>
            <div className="item">
              <label htmlFor="propertyId ">property Id </label>
              <input id="propertyId" name="propertyId" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="FF" defaultChecked>
                Flat & Floor
                </option>
                <option value="IH">Independent House</option>
                <option value="IP">Industrial Property</option>
                <option value="AP">Agricultural Property</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="propertyDesc">Property Type</label>
              <input id="propertyDesc" name="propertyDesc" type="text" />
            </div>
            {/* <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Flat</option>
                <option value="land">Land</option>
              </select>
            </div> */}
            <div className="item">
              <label htmlFor="saleNotice">Sale Notice</label>
              <input id="saleNotice" name="saleNotice" type="value"/>
            </div>
            <div className="item">
              <label htmlFor="titleReport">Title Investigation Report</label>
              <input id="titleReport" name="titleReport" type="value"  />
            </div>
            <div className="item">
              <label htmlFor="viability">Viability & Market Analysis Report</label>
              <input id="viability" name="viability" type="value"/>
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="EMD">EMD Price</label>
              <input min={0} id="EMD" name="EMD" type="value" />
            </div>
            <div className="item">
              <label htmlFor="EMDS">EMD Submission</label>
              <input min={0} id="EMDS" name="EMDS" type="value" />
            </div>
            <div className="item">
              <label htmlFor="SnE">Auction Start and End Date</label>
              <input min={0} id="SnE" name="SnE" type="value" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "AuctionGenie",
            uploadPreset: "AuctionGenieUploads",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;