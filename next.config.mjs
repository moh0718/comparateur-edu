/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/google48a9bad5586aa6d8.html",
        destination: "/api/google-verification",
      },
    ];
  },
  async redirects() {
    return [
      { source: "/comparatif", destination: "/comparer", permanent: true },
      { source: "/comparatif/:path*", destination: "/comparer", permanent: true },
      { source: "/fiches-banques", destination: "/etablissements", permanent: true },
      { source: "/recommandation", destination: "/orientation/1", permanent: true },
      { source: "/recommandation/:path*", destination: "/orientation/1", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;

