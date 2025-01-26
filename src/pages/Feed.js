import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const feedData = {
    posts: [
        {
            userId: "1",
            userImage: "https://picsum.photos/50/50",
            userName: "User1",
            postImage: "https://picsum.photos/800/1500",
            userPhone: "3333333333"
        },
        {
            userId: "2",
            userImage: "https://picsum.photos/55/55",
            userName: "User2",
            postImage: "https://picsum.photos/850/1500",
            userPhone: "3333333333"
        },
        {
            userId: "3",
            userImage: "https://picsum.photos/60/60",
            userName: "User3",
            postImage: "https://picsum.photos/900/1500",
            userPhone: "3333333333"
        }
    ]
}

const handleWhatsAppClick = (post) => {
    window.open(`https://wa.me/${post.userPhone}`, '_blank');
  };

const Feed = () =>{
return(
    <div>
    <Header></Header>
    <div className="container p-0" style={{maxWidth: "600px"}}>

    {feedData.posts.map((item)=>(
        <div className="justify-content-center mb-5">
        <div className="d-flex my-3">
            <div className="mx-3" style={{width: "60px", aspectRatio: "1/1"}}>
                <img src={item.userImage}
                    className="rounded-circle" 
                    style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minWidth: "100%",
                    minHeight: "100%",
                    objectFit: "cover",
                    }} 
                    alt="Descripción de la imagen"></img>    
            </div>
            <div className="pt-2 fs-4" style={{color: ""}}>
                {item.userName}
            </div>
            <a className="nav-link fs-5 mt-2 ms-auto" href="#calidad-3"><i className="bi bi-whatsapp me-2"></i></a>
        </div>
        <div style={{maxWidth: "600px", aspectRatio: "1/1"}}>
          <img src={item.postImage} 
                    className="rounded-4"
                    style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    minWidth: "100%",
                    minHeight: "100%",
                    objectFit: "cover",
                    }} 
                    alt="Descripción de la imagen"></img>            
        </div>
      </div>
    ))}

    
      
    </div>
    <Footer></Footer>
    </div>
)
}

export default Feed;