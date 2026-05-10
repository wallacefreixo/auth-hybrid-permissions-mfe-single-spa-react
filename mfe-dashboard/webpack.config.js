const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'app',
    projectName: 'mfe-dashboard',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      ...defaultConfig.externals,
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-router-dom',
      'single-spa-react',
      'i18next',
      'react-i18next',
    ],
  });
};
