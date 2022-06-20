import React, { useState, useEffect } from "react";
import PostListDetail from "../Components/ListBody";
import { getPosts } from "../Api/GetPostsData";

//pass in current user id
function PostsList(props) {
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
    <div className="col">
      <h3>Posts</h3>
      {posts.map((post) => {
        return (
          <PostListDetail
            key={post.post_id}
            post={post}
            token={token}
            setPost={(newPost) => {
              let tempPosts = [...posts];
              tempPosts.forEach((tempPost, index) => {
                if (tempPost.post_id == newPost.post_id) {
                  tempPosts[index] = newPost;
                }
              });
              setPosts(tempPosts);
            }}
          />
        );
      })}
    </div>
  );
}
export default PostsList;
