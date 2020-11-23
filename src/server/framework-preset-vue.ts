import { VueLoaderPlugin } from 'vue-loader'
import { Configuration } from 'webpack';

export function webpack(config: Configuration) {
  return {
    ...config,
    plugins: [...(config.plugins || []), new VueLoaderPlugin() as any],
    module: {
      ...config.module,
      rules: [
        ...((config.module || { rules: [] }).rules || []),
        {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
          options: {},
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...((config.resolve || {}).extensions || []), '.vue'],
      alias: {
        ...(config.resolve || {}).alias,
        vue$: require.resolve('vue/dist/vue.esm-bundler.js'),
      },
    },
  };
}
