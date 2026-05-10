const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'app',
    projectName: 'shared-auth',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      ...defaultConfig.externals,
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@tanstack/react-query',
    ],
  });
};
