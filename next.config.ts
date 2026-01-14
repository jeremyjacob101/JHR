import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kkdbndkdbpltfharuklb.supabase.co",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "kkdbndkdbpltfharuklb.supabase.co",
        pathname: "/storage/v1/render/image/**",
      },
      { protocol: "https", hostname: "yykrealestate.com" },
      { protocol: "https", hostname: "cdn.stocksnap.io" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "imgcdn.stablediffusionweb.com" },
      { protocol: "https", hostname: "www.therealestateconversation.com.au" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
