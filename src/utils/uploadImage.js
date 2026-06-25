import axios from "axios";

const imageKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

export const uploadImage = async (image) => {
  const formData = new FormData();

  formData.append("image", image);

  const url = `https://api.imgbb.com/1/upload?key=${imageKey}`;

  const { data } = await axios.post(url, formData);

  return data.data.url;
};
