module.exports = {
    parser: "babel-eslint",
    env: {
      browser: true,
      es6: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    plugins: ["react"],
    rules: {
      "semi": ["error", "never"],
      "quotes": ["error", "double"],
      "react/prop-types": "off",
    },
  };