import React from "react";

const Video = () => {

    const style = {
        left: "50%",
        top: "50%",
        width: "auto",
        height: "auto",
        position: "fixed",
        transform: "translate(-50%, -50%)",
        minWidth: "100%",
        minHeight: "100%",
        zIndex: -2,
    };
    
return (
    <video
    src={"/assets/Wall-Sketching.mp4"}
    autoPlay={true}
    loop={true}
    style={style}
    >
    </video>
);
}

export default Video;