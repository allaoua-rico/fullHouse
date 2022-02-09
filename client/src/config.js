// general config goes here
const configGlob = {};
// production specific config goes here
const configProd = {
  API_URI: "http://www.example.com/api/v2"
};
// development specific config goes here
const configDev = {
  API_URI: "http://localhost:4000"
};

const isProduction = process.env.NODE_ENV === 'production' ? {...configProd} : {...configDev}
// merged config
const config = { ...configGlob, ...isProduction  };
export default config;