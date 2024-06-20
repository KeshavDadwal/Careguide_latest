// // next.config.mjs

// const config = {
//     images: {
//       // domains: ['hospitall.s3.amazonaws.com'],
//       domains: ['hospitall.s3.ap-south-1.amazonaws.com'],

//     },
//   };
  
//   export default config;
  

// next.config.mjs

const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hospitall.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default config;
