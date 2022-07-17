/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = (phase, { defaultConfig }) => {
  return {
    env: {
      //CLOUDINARY_URL="cloudinary://922236986931551:P-VlNrvIJgtF8FL2ppDGPPCgnp8@duaikrp5u",
      NEXT_PUBLIC_CLOUD_NAME: "duaikrp5u",
      NEXT_PUBLIC_UPLOAD_PRESET: "sfxiuf1n",
    },
  };
};
