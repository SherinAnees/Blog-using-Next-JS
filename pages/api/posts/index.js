import data from "../data";
//api/posts
export default function handler(req, res) {
  const posts = data.Posts;
  if (posts) return res.status(200).json(posts);
  return res.status(404).json({ error: "Data Not Found" });
}
