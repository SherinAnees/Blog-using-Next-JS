import data from "../data";
//api/post/:id
export default function handler(req, res) {
  const { postId } = req.query;
  const posts = data.Posts;
  if (postId) {
    const Post = posts.find((val) => val.id == postId);
    return res.status(200).json(Post);
  }
  return res.status(404).json({ error: "Data Not Found" });
}
