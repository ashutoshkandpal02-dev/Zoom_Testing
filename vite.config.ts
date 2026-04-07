import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 3000,
    strictPort: true,

    allowedHosts: [
      'creditor.onrender.com',
      'creditor-frontend-p6lt.onrender.com',
      'creditor-userdash-9zyq.onrender.com',
      'creditor-userdash-lu2w.onrender.com',
      'frontend-testing-branch.onrender.com',
    ],

    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              'Received Response from the Target:',
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },

    cors: {
      origin: ['http://localhost:3000', 'http://localhost:9000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
      ],
      credentials: true,
      maxAge: 3600,
    },

    hmr: {
      overlay: false,
      port: 8081,
    },

    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },

  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'www.lmsathena.com',
      'lmsathena.com',
      'api.lmsathena.com',
      '54.198.69.32',
      'creditor.onrender.com',
      'creditor-frontend-p6lt.onrender.com',
      'creditor-userdash-9zyq.onrender.com',
      'frontend-testing-branch.onrender.com',
    ],
    cors: true,
  },

  base: '/',

  plugins: [
    react(),
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lessonbuilder': path.resolve(__dirname, './src/lessonbuilder'),
    },
  },

  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      'https://creditor-backend-5pq9.onrender.com'
    ),
    'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(
      process.env.VITE_OPENAI_API_KEY || ''
    ),
    'import.meta.env.VITE_DEEPAI_API_KEY': JSON.stringify(
      process.env.VITE_DEEPAI_API_KEY || ''
    ),
    'import.meta.env.VITE_HUGGINGFACE_API_KEY': JSON.stringify(
      process.env.VITE_HUGGINGFACE_API_KEY || ''
    ),
  },
}));

