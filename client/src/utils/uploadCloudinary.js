import axios from 'axios';

const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();
  uploadData.append('file', file);
  uploadData.append('upload_preset', upload_preset);
  uploadData.append('cloud_name', cloud_name);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      uploadData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return res.data; // Axios automatically parses JSON
  } catch (err) {
    throw new Error(err.response?.data?.error?.message || 'Image upload failed');
  }
};

export default uploadImageToCloudinary;