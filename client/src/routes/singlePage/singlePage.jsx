import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handelSendMessage =async ()=>{
    try {
      await apiRequest.post("/chats",{receiverId : post.userId})
       navigate("/profile")
    } catch (error) {
      console.log(error);
    }
}

const handleShowDirection = ()=>{
const url = `https://www.google.com/maps?q=${post.latitude},${post.longitude}`;
window.open(url, '_blank');    
}
const handleSaleNotice = ()=>{
    const url = `https://${post.postDetail.saleNotice}`;
    window.open(url, '_blank');    
    }
const handleTitleReport = ()=>{
        const url = `https://${post.postDetail.titleReport}`;
        window.open(url, '_blank');    
        }
 const handleViability = ()=>{
            const url = `https://${post.postDetail.viability}`;
            window.open(url, '_blank');    
            }        
  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
    
}
    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.images}/>
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="" />
                                    <span>{post.address}</span>
                                </div>
                                <div className="price">
                                    Reserve Price: ₹ {post.price}
                                </div>
                            </div>
                            <div className="user">
                                <img src={post.user.avatar} alt="" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        <div
                         className="bottom"
                        dangerouslySetInnerHTML={{
                         __html: DOMPurify.sanitize(post.postDetail.desc),
                             }}
                             
                         ></div>
                         <div className="paywallItems">
                            <div className="saleNotice">
                                <span>Sale Notice</span>
                                {/* <img src="/pdf.png" alt="" /> */}
                                <button onClick={handleSaleNotice}>
                                    Download
                                </button>
                            </div>
                            <div className="titleReport">
                                <span>Legal Report</span>
                                {/* <img src="/pdf.png" alt="" /> */}
                                <button onClick={handleTitleReport}>
                                    Download
                                </button>
                            </div>
                            <div className="viability">
                                <span>Viability Analysis</span>
                                {/* <img src="/pdf.png" alt="" /> */}
                                <button onClick={handleViability}>
                                    Download
                                </button>
                            </div>
                         </div>
                    </div>

                 </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className='title'>General</p>
                    <div className="listVertical">
                    <div className="feature">
                            <div className="featureText">
                            <img src="/bath.png" alt="" />
                            <span>{post.bank}</span>
                        </div>
                        </div>
                    <div className="feature">
                            <img src="/pin.png" alt="" />
                            <div className="featureText">
                            <span>Borrower Name</span>
                            <p>{post.postDetail.borrowerName}</p>
                            </div>
                        </div>
                       
                        <div className="feature">
                            <img src="/pin.png" alt="" />
                            <div className="featureText">
                            <span>City</span>
                            <p>{post.city}</p>
                            </div>
                        </div>
                        
                    
                    </div>
                    <p className='title'>Property Details</p>
                            
                    <div className="pdetails">
                    
                    
                    <div className="pdetail">
                            <img src="/property.png" alt="" />
                            <span>{post.postDetail.propertyDesc}</span>
                        </div>
                        
                        <div className="pdetail">
                            <img src="/size.png" alt="" />
                            <span>{post.postDetail.size} sqft</span>
                        </div>
                        
                        <div className="pdetail">
                            <img src="/bed.png" alt="" />
                            <span>Possesion-</span>
                            <p>{post.possession}</p>
                        </div>
                    </div>
                    <p className="title">Auction Details</p>
                    <div className="listHorizontal">
                    <div className="feature">
                      <img src="/school.png" alt="" />
                        <div className="featureText">
                          <span>EMD amount</span>
                        <p>₹{post.postDetail.EMD}</p>
                         </div>
                    </div>
                    <div className="feature">
                       <img src="/bus.png" alt="" />
                          <div className="featureText">
                         <span>EMD Submission</span>
                            <p>{post.postDetail.EMDS}</p>
                    </div>
                    </div>
                         <div className="feature">
                            <img src="/restaurant.png" alt="" />
                             <div className="featureText">
                                <span>Auction start and end Time</span>
                                <p>{post.postDetail.SnE}</p>
                        </div>
                     </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                     <Map items={[post]} />
                    </div>
                    <div className="buttons">
                    <button onClick={handelSendMessage}>
                    <img src="/chat.png" alt="" />
                     Send a Message
                    </button>
                    <button onClick={handleShowDirection}> Show Direction</button>
                    <button onClick={handleSave}style={{
              backgroundColor : saved ? "#fece51" : "white"
            }} >
              <img src="/save.png" alt="" />
             {saved ? "Place Saved": "Save the Place"}
            </button>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default SinglePage