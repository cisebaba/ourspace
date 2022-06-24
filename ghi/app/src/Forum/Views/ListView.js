import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostsList from "../Components/PostsList";
import { getPosts } from "../Api/GetPostsData";
import {
  TitleContainer,
  PostWrapper,
  StyledCreateButton,
} from "../styling/styling";

// const CardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   width: 300px;
//   min-height: 250px;
//   background-color: #fff;
//   box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
//   margin: 0.5em;
//   margin-bottom: 1.3em;
// `;

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
          <StyledCreateButton
            style={{ float: "left" }}
            onClick={() => navigate("/posts/new/")}
          >
            Create post
          </StyledCreateButton>
        </TitleContainer>

        <PostsList token={token} posts={posts} setPosts={setPosts} />
      </div>
    </PostWrapper>
  );
};

export default ListView;
