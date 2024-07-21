// import { Link } from 'react-router-dom'
// import './card.scss'

// function Card({item}){
   

//     return (
//         <div className='card'>
//             <Link to={'/${item.id}'} className='imageContainer'>
//                 <img src={item.img} />
//             </Link>
//             <div className="textContainer">
//                 <h2 className='title'>
//                     <Link to={`/${item.id}`}>{item.title}</Link>
//                 </h2>
//                 <p className='address'>
//                     <img src='/pin.png' alt=''/>
//                     <span>{item.address}</span>
//                 </p>
//                 <p className='price'>₹ {item.price}</p>
//                 <div className="bottom">
//                     <div className="features">
//                         <div className="feature">
//                             <img src='/bed.png' alt='' />
//                             <span>{item.possesion}</span>
//                         </div>
//                         <div className="feature">
//                             <img src='/bath.png' alt='' />
//                             <span>{item.bank}</span>
//                         </div>
//                     </div>
//                     <div className="icons">
//                         <div className="icon">
//                             <img src="/save.png" alt="" />
//                         </div>
//                         <div className="icon">
//                             <img src="/chat.png" alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Card
import { Link, Navigate, useLoaderData } from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiRequest";

function Card({ item }) {
  const post = useLoaderData();
  const handelSendMessage =async ()=>{
    try {
      await apiRequest.post("/chats",{receiverId : post.userId})
       Navigate("/profile")
    } catch (error) {
      console.log(error);
    }
}
  console.log(item);
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.possession}</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bank}</span>
            </div>
          
          
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;