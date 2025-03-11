import { useState } from "react";
import "./BusinessProfileCreation.css";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import UploadAndDisplayImage from "../../components/ProfileImageUpload/ProfileImageupload";


const interestsList = ["Technology", "Music", "Sports", "Travel", "Art", "Gaming", "Fitness", "Cooking"];



const BusinessProfileCreation = () => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    interests: []
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const toggleInterest = (interest) => {
    setProfile((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleSubmit = () => {
    console.log("Profile Data:", profile);
  };

 
  const [selectedImages, setSelectedImages] = useState([]);
  
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    
    <div className="centered-container">
      <div className="column" style={{ display: 'flex', flexDirection: 'column', padding: '50px',  width: '85%'}}>
        <h2 className="text-xl font-bold">Create Your Business Profile</h2>
        <div className="profile-photo-container"> 
          <UploadAndDisplayImage></UploadAndDisplayImage>
        </div>
        <div className="grid-container">
          <div> 
            <label className="profile-label">Business Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={profile.name}
              onChange={handleChange}
              className="profile-input"
            />
          </div>

          <div>
            <label className="profile-label">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={profile.email}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
        </div>
        <div className="grid-container">
          <div>
            <label className="profile-label">Phone Number:</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={profile.phone}
              onChange={handleChange}
              className="profile-input"
            />
          </div>

         
        </div>

        

        <div className="grid-container">
          <div>
            <label className="profile-label" style={{verticalAlign: 'top' }}>Description: </label>
            <input
              type="text"
              name="address"
              placeholder="Enter profile description"
              value={profile.address}
              onChange={handleChange}
              className="profile-input"
              style={{width: '75%', height: '100px'
              }}
            />
          </div>
        </div>
      
      <div style={{ borderBottom: '1px solid black', width: '100%' , opacity: 0.2, marginTop: '20px'}}></div>

      <div className="grid-container">
          <div >
            <div >
              <label className="profile-label"> Address:</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter Business Address"
                value={profile.phone}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div>
              <RangeSlider></RangeSlider>
            </div>
          </div>

          <div>
            <label className="profile-label">Language:</label>
            <form>
              <div className="radio">
                <label>
                  <input type="radio" value="option1"  />
                  English
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="option2" />
                  Spanish
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="option3" />
                  French
                </label>
              </div>
            </form>
          </div>
        </div>
      <div style={{ borderBottom: '1px solid black', width: '100%' , opacity: 0.2, marginTop: '20px'}}></div>

        <div>
          <h3 className="font-semibold">Select Business Tags:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {interestsList.map((interest) => (
              <span
                key={interest}
                className={`tag ${
                  profile.interests.includes(interest)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleInterest(interest)}
                style={{margin: '10px'}}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div style={{ borderBottom: '1px solid black', width: '100%' , opacity: 0.2, marginTop: '20px', marginBottom: '20px'}}></div>
      </div>
      
      <div className="upload-container">
        <label htmlFor="imageUpload" className="upload-button">
          Business Portfolio
        </label>
        <input
          type="file"
          id="imageUpload"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden-input"
        />

        <div className="image-preview">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="preview-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileCreation;
