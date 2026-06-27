import axios from "axios";

export async function uploadImage(file) {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

  if (!apiKey) {
    throw new Error("Image upload key is missing. Set NEXT_PUBLIC_IMGBB_KEY in the client .env file.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
  const { data } = await axios.post(url, formData);

  if (!data?.data?.display_url) {
    throw new Error("Image upload failed. Please try another image.");
  }

  return data.data.display_url;
}

export default uploadImage;

