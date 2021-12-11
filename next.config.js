// const withCSS = require('@zeit/next-css');
// const withSass = require("@zeit/next-sass");

// module.exports = withSass ({
//   publicRuntimeConfig: {
//     APP_NAME: 'SEOBLOG',
//     API_DEVELOPMENT: 'http://localhost:8000/api',
//     PRODUCTION: false,
//     DOMAIN_DEVELOPMENT: 'http://localhost:3000/',
//     DOMAIN_PRODUCTION : ''
//   }
// });

// module.exports = withCSS(
//   withSass({
//     publicRuntimeConfig: {
//       APP_NAME: "SEOBLOG",
//       API_DEVELOPMENT: "http://localhost:8000/api",
//       PRODUCTION: false,
//       DOMAIN_DEVELOPMENT: "http://localhost:3000/",
//       DOMAIN_PRODUCTION: "",
//     },
//     reactStrictMode: true,
//     env: {
//       OPEN_WEATHER_APP: process.env.OPEN_WEATHER_APP,
//       REACT_APP_CLOUDINARY_CLOUDNAME:
//         process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
//       REACT_APP_CLOUDINARY_UPLOADPRESENT:
//         process.env.REACT_APP_CLOUDINARY_UPLOADPRESENT,
//       REACT_APP_googleApiKey: process.env.REACT_APP_googleApiKey,
//     },
//   })
// );


// module.exports = {
//   publicRuntimeConfig: {
//     APP_NAME: "Massnow News Site",
//     API_DEVELOPMENT: "http://localhost:8000/api",
//     API_PRODUCTION: process.env.PRODUCTION_API,
//     PRODUCTION: false,
//     DOMAIN_DEVELOPMENT: "http://localhost:3000/",
//     DOMAIN_PRODUCTION: process.env.PRODUCTION_DOMAIN,
//   },
//   reactStrictMode: true,
//   env: {
//     OPEN_WEATHER_APP: process.env.OPEN_WEATHER_APP,
//     REACT_APP_CLOUDINARY_CLOUDNAME: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
//     REACT_APP_CLOUDINARY_UPLOADPRESENT:
//       process.env.REACT_APP_CLOUDINARY_UPLOADPRESENT,
//     REACT_APP_googleApiKey: process.env.REACT_APP_googleApiKey,
//     PRODUCTION_API: process.env.PRODUCTION_API,
//     PRODUCTION_DOMAIN: process.env.PRODUCTION_DOMAIN,
//   },
// };




module.exports = {
  publicRuntimeConfig: {
    APP_NAME: "Massnow News Site",
    API_DEVELOPMENT: "http://localhost:8000/api",
    API_PRODUCTION: process.env.PRODUCTION_API,
    PRODUCTION: process.env.IN_PRODUCTION_MODE,
    DOMAIN_DEVELOPMENT: "http://localhost:3000/",
    DOMAIN_PRODUCTION: process.env.PRODUCTION_DOMAIN,
  },
  reactStrictMode: true,
  env: {
    OPEN_WEATHER_APP: process.env.OPEN_WEATHER_APP,
    REACT_APP_CLOUDINARY_CLOUDNAME: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
    REACT_APP_CLOUDINARY_UPLOADPRESENT:
      process.env.REACT_APP_CLOUDINARY_UPLOADPRESENT,
    REACT_APP_googleApiKey: process.env.REACT_APP_googleApiKey,
    PRODUCTION_API: process.env.PRODUCTION_API,
    PRODUCTION_DOMAIN: process.env.PRODUCTION_DOMAIN,
    IN_PRODUCTION_MODE: process.env.IN_PRODUCTION_MODE,
  },
};
