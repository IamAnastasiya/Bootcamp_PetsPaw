/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
			{
				protocol: "https",
				hostname: "**.media.tumblr.com",
			},
			{
				protocol: "https",
				hostname: "**.thecatapi.com",
			},
			{
				protocol: "https",
				hostname: "**.theimageapi.com",
			},
		],
  },
}

module.exports = nextConfig
