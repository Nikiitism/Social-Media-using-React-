import { useContext, useEffect, useRef, useState } from "react";
import {PostList} from "../store/post-list-store";
import { useNavigate } from "react-router-dom";


const CreatePost = () =>{

  const {addPost} = useContext(PostList);
  const navigate = useNavigate();
  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if(userIdElement.current.value === '' ||
      postTitleElement.current.value === '' ||
      postBodyElement.current.value === '' ||
      reactionsElement.current.value === ''||
      tagsElement.current.value === '')
      {  setError('All fields are required');   return;}

    setError('');

    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value
    const postBody = postBodyElement.current.value
    const reactions = reactionsElement.current.value
    const tags = tagsElement.current.value.split(' ') 

    userIdElement.current.value = '';
    postTitleElement.current.value = '';
    postBodyElement.current.value = '';
    reactionsElement.current.value = '';
    tagsElement.current.value = '';

    // alert('woho!! Posted.')
    setPopupVisible(true);
    addPost(userId, postTitle, postBody, reactions, tags)
    navigate('/');
  }
  
  
  useEffect(() => {
    if (isPopupVisible) {
      const timer = setTimeout(() => {
        setPopupVisible(false);
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [isPopupVisible]);

  return (
    <div>
      <form className="create-post" onSubmit={handleSubmit}>

<div className="mb-3">
      <label htmlFor="userId" className="form-label">Enter your User Id here</label>
      <input type="number" ref={userIdElement} placeholder="Your User Id" className="form-control" id="userId"/>
    </div>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Post Title</label>
      <input type="text" ref={postTitleElement} placeholder="How are you feeling today...?" className="form-control" id="title"/>
    </div>
    <div className="mb-3">
      <label htmlFor="body" className="form-label">Post Content</label>
      <textarea type="text" rows="4" ref={postBodyElement} placeholder="Tell us more abouot it" className="form-control" id="body"/>
    </div>
    <div className="mb-3">
      <label htmlFor="reactions" className="form-label">Number of Reactions</label>
      <input type="number" ref={reactionsElement} placeholder="How many people reacted to this post" className="form-control" id="reactions"/>
    </div>
    <div className="mb-3">
      <label htmlFor="tags" className="form-label">Enter your tags here</label>
      <input type="text" ref={tagsElement} placeholder="Please enter tags using space" className="form-control" id="tags"/>
    </div>

    <button type="submit" className="btn btn-primary">Post</button>
    {error && <p className="error-message">{error}</p>}
  </form> 

  {isPopupVisible && (
  <div className="popup-top">
    <p id="postId">Posted!</p>
    <p>Your post has been successfully added.</p>
  </div>
)}

    </div> 
    )
}

export default CreatePost;