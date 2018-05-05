/**
 * webpack配置文件
 */
const { injectBabelPlugin, getLoader } = require('react-app-rewired');

const fileLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}

module.exports = {
  webpack: function override(config, env) {
    config = injectBabelPlugin('transform-decorators-legacy',config)
    // babel-plugin-import
    config = injectBabelPlugin(['import',
    {
      "libraryName": "antd",
      "libraryDirectory": "lib",   // default: lib
      "style": true
    },
    ], config);
  
    // customize theme
    config.module.rules[1].oneOf.unshift(
      {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              // theme vars, also can use theme.js instead of this.
              modifyVars: { "@brand-primary": "#1DA57A" },
            },
          },
        ]
      }
    );
  
    config.module.rules[1].oneOf.unshift(
      {
        test: /\.less$/,
        exclude: /node_modules|antd/,
        use: [
          require.resolve('style-loader'),
          {
              loader: require.resolve('css-loader'),
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[local]___[hash:base64:5]'
              },
            },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              // theme vars, also can use theme.js instead of this.
              modifyVars: { "@brand-primary": "#1DA57A" },
            },
          },
        ]
      }
    );
  
    // css-modules
    config.module.rules[1].oneOf.unshift(
      {
        test: /\.css$/,
        exclude: /node_modules|antd\.css/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]'
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ]
      }
    );
  
    // file-loader exclude
    let l = getLoader(config.module.rules, fileLoaderMatcher);
    l.exclude.push(/\.less$/);
  
    return config;
  },
  devServer: function(configFunction){
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      // 启用局域网通过ip访问
      config.disableHostCheck = true;
     
      return config;
    }
  },
}