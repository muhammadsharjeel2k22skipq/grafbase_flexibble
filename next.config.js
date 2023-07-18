/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com','res.cloudinary.com']
    },
    experimental: {
        appDir: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
}

module.exports = nextConfig

// serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
