import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostsList from "../Components/PostsList";
import { getPosts } from "../Api/GetPostsData";
import {
  TitleContainer,
  PostWrapper,
  StyledCreateButton,
} from "../styling/styling";

const ListView = (props) => {
  console.log(props, "props!");
  const token = props.token;
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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
        <TitleContainer>
          OurForum &#9825;{" "}
          <StyledCreateButton onClick={() => navigate("/posts/new/")}>
            Create post
          </StyledCreateButton>
        </TitleContainer>

        <PostsList token={token} posts={posts} setPosts={setPosts} />
      </div>
    </PostWrapper>
  );
};

export default ListView;
