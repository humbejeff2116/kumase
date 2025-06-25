/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true
    },
    images: {
        formats: ["image/avif", "image/webp"],
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.kuchtech.com',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
