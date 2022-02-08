// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "www.gravatar.com"],
  },
  pageExtensions: ["page.tsx", "page.ts", "endpoint.ts"],
  reactStrictMode: true,
};

module.exports = nextConfig;
