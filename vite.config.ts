import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      // Make env variables available globally in the app
      // This is important for production builds
      'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
    },
    build: {
      // Generate source maps for better debugging
      sourcemap: true,
      // Improve error handling in production
      rollupOptions: {
        onwarn(warning, warn) {
          // Skip certain warnings
          if (warning.code === 'MISSING_EXPORT') return;
          warn(warning);
        },
      },
    },
  };
});
