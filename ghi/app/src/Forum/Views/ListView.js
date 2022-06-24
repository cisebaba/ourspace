import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PostsList from "../Components/PostsList";
import { getPosts } from "../Api/GetPostsData";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
  min-height: 250px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  margin: 0.5em;
  margin-bottom: 1.3em;
`;


const ListView = (props) => {
  console.log(props, "props!");
  const token = props.token;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function initializePosts() {
      let posts = await getPosts({ token: token });
      setPosts(posts);
    }
    initializePosts();
  }, []);
  


  return (
    <CardContainer>
    <div>
      <h1>OurForum &#9825;</h1>
      
      <h6>
        <NavLink to={"/posts/new/"}>Create new post</NavLink>
      </h6>
      <PostsList token={token} posts={posts} setPosts={setPosts} />
    </div>
    </CardContainer>
  );
};

export default ListView;
