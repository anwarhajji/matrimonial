/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
    images: {
        remotePatterns: [
            
            {
                protocol: 'https',
                hostname: 'utfs.io'
              },
              {
                protocol: 'https',
                hostname: 'picsum.photos'
              },{
                protocol: 'https',
                hostname: 'cplgsvpongmdzimtsflc.supabase.co'
              },
              {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
              },





        ]
    }
}

module.exports = nextConfig
