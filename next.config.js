/** @type {import('next').NextConfig} */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withTM = require("next-transpile-modules")([
  // `monaco-editor` isn't published to npm correctly: it includes both CSS
  // imports and non-Node friendly syntax, so it needs to be compiled.
  // https://github.com/react-monaco-editor/react-monaco-editor/issues/271
  // https://www.swyx.io/how-to-add-monaco-editor-to-a-next-js-app-ha3
  "monaco-editor"
]);

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config) => {
    const rule = config.module.rules
      .find(rule => rule.oneOf)
      .oneOf.find(
        r =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes("_app")
      );
    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        // Allow `monaco-editor` to import global CSS:
        /[\\/]node_modules[\\/]monaco-editor[\\/]/
      ];
    }

    config.plugins.push(new MonacoWebpackPlugin({ 
      globalAPI: true,
      filename: 'static/[name].worker.js',
    }));

    return config;
  }
}

module.exports = withTM(nextConfig);
