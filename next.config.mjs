/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["www.google.com", "cdn.pixabay.com", "sadakatcdn.cyparta.com"],
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true, 
        },
      ];
    },
  };
  
  export default nextConfig;
  