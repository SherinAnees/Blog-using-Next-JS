import data from "./data";

//api/trending
export default function handler(req, res) {
  const popular = data.Popular;
  if (popular) {
    return res.status(200).json(popular);
  }
  return res.status(404).json({ error: "Data Not Found" });
}
