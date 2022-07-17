import axios from "axios";

const getUrl = async (file: FileList) => {
  const clUrl: string =
    `https://api.cloudinary.com/v1_1/` +
    process.env.NEXT_PUBLIC_CLOUD_NAME +
    `/upload`;
  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
  formData.append("tags", "gs-next,gs-next-uploaded");
  const res = await axios.post(clUrl, formData);

  return res.data.secure_url
};

// return (
//   <div id="app">
//     <input
//       type="file"
//       onChange={(e) => {
//         uploadImage(e.target.files);
//       }}
//       accept="image/*"
//     />
//   </div>
// );

export default getUrl;
