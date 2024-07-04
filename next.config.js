/** @type {import('next').NextConfig} */
const nextConfig = {


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
