import React from "react";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      {src ?(<img htmlFor="photo-upload" src={src} alt="Profile" />):(<div style={{marginTop:"32px"}}>Upload your Image Here✌</div>)}
    </div>  
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

export default ImgUpload;
