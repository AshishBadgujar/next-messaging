/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withPWA = require("next-pwa");
module.exports = withPWA({
  //...before
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  //...after
})

module.exports = nextConfig

