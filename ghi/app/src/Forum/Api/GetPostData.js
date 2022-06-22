export async function getPost(props) {
  const token = props.token;
  try {
    const postResponse = await fetch(
      `http://localhost:8090/api/posts/${props.post_id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await postResponse.json();
  } catch (error) {
    return [];
  }
}
