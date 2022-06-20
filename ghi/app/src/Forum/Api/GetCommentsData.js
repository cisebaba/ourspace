export async function getComments(props) {
  const token = props.token;

  try {
    const commentsResponse = await fetch(
      `http://localhost:8090/api/posts/${props.post_id}/comment/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await commentsResponse.json();
  } catch (error) {
    return [];
  }
}
