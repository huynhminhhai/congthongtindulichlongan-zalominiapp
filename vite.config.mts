import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import zaloMiniApp from 'zmp-vite-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default () => {
  return defineConfig({
    root: './src',
    base: '',
    plugins: [zaloMiniApp(), react(), tsconfigPaths()],
    resolve: {
      alias: {
        styles: path.resolve(__dirname, 'src/styles'),
        components: path.resolve(__dirname, 'src/components'),
        pages: path.resolve(__dirname, 'src/pages'),
        store: path.resolve(__dirname, 'src/store'),
        services: path.resolve(__dirname, 'src/services'),
        assets: path.resolve(__dirname, 'src/assets'),
        apiRequest: path.resolve(__dirname, 'src/apiRequest'),
        utils: path.resolve(__dirname, 'src/utils'),
        constants: path.resolve(__dirname, 'src/constants'),
        locales: path.resolve(__dirname, 'src/locales'),
        envConfig: path.resolve(__dirname, 'src/envConfig'),
      },
    },
    server: {
      proxy: {
        '/auth': {
          target: 'https://sso1022.longan.gov.vn',
          changeOrigin: true,
          secure: false,
        },
        '/AppLAS': {
          target: 'https://longanso.com',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
