import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PostsList from "../Components/PostsList";
import { getPosts } from "../Api/GetPostsData";
import { TitleContainer, PostWrapper } from "../styling/styling";

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
  }, [token]);

  return (
    <PostWrapper>
      <div>
        <TitleContainer>OurForum &#9825;</TitleContainer>
        {/* <Heart isClick={isClick} onClick={() => setClick(!isClick)} /> */}
        <h6>
          <NavLink to={"/posts/new/"}>Create new post</NavLink>
        </h6>
        <PostsList token={token} posts={posts} setPosts={setPosts} />
      </div>
    </PostWrapper>
  );
};

export default ListView;
