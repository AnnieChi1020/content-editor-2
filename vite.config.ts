import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [
        [
          '@swc/plugin-styled-components',
          {
            pure: true,
            ssr: false,
          },
        ],
      ],
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'HHContentEditor',
      // the proper extensions will be added
      fileName: 'hh-content-editor',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom/client', 'styled-components'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'styled-components': 'styled',
          'react-dom/client': 'ReactDOM',
        },
      },
    },
  },
});
