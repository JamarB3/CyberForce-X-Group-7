import React, { useState } from "react";
import Empty from "../../assets/emptyprofile.jpg";

// Define a functional component named UploadAndDisplayImage
const UploadAndDisplayImage = () => {
  // Define a state variable to store the selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Return the JSX for rendering
  return (
    <div>
      <h4 style={{fontWeight: '300'}}>Profile Photo</h4>
      

      {selectedImage &&(
        <div>
         
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br /> <br />
          {/* Button to remove the selected image */}
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      {
        <div>
         
            <img 
            style={{borderRadius: '50%'}}
           alt="not found"
           width={"250px"}
           src={Empty}
            />
             <br /> <br />
         {/* Button to remove the selected image */}
         <input
        type="file"
        id="fileUpload"
        name="myImage"
        style={{ display: "none" }}
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
      <label
        htmlFor="fileUpload"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          borderRadius: "50px",
          backgroundColor: "grey",
          color: "white",
          fontSize: "16px",
          fontWeight: "300",
          cursor: "pointer",
          textAlign: "center",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "grey")}
      >
        Change
      </label>
      {selectedImage && <p>Selected File: {selectedImage.name}</p>}
        </div>
      }

      <br />

    
    </div>
  );
};


export default UploadAndDisplayImage;