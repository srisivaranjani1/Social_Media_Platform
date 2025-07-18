import React, { useState } from 'react';
import '../styles/CreatePost.css';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const removeImage = () => setImage(null);
  const removeVideo = () => setVideo(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Post submitted!');
   
  };

  return (
    <div className="create-post-container">
      <header className="header">
        <h1>SECE Connect</h1>
      </header>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <h2>Create Post</h2>
        <input
          type="text"
          placeholder="Caption / Title"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="file-upload">
          📷 Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
        </label>

        <label className="file-upload">
          🎥 Upload Video
          <input type="file" accept="video/*" onChange={handleVideoUpload} hidden />
        </label>

        <div className="media-preview">
          {image && (
            <div className="media-block">
              <img src={image} alt="Preview" />
              <button type="button" className="remove-btn" onClick={removeImage}>❌</button>
            </div>
          )}
          {video && (
            <div className="media-block">
              <video src={video} controls />
              <button type="button" className="remove-btn" onClick={removeVideo}>❌</button>
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">Submit Post</button>
      </form>
    </div>
  );
};

export default CreatePost;