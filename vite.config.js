import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true
        }),
        react()
    ],
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                assetFileNames: (chunkInfo) => {
                    let outDir = '';
                    // extract the file name without extension
                    const name = chunkInfo.name.split('.').slice(0, -1).join('.');
                    const kebabCaseName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                    // svg files
                    if (/svg$/.test(chunkInfo.name)) {
                        outDir = 'images/svg';
                    }

                    // images
                    if (/(png|jpg|jpeg|gif|webp)$/.test(chunkInfo.name)) {
                        outDir = 'images';
                    }

                    // js files
                    if (/js$/.test(chunkInfo.name)) {
                        outDir = 'js';
                    }

                    // css files
                    if (/css$/.test(chunkInfo.name)) {
                        outDir = 'css';
                    }

                    return `assets/${outDir}/${kebabCaseName}.[hash][extname]`;
                },
                chunkFileNames: (chunkInfo) => {
                    // Convert the chunk name to kebab-case
                    const name = chunkInfo.name || 'chunk';
                    const kebabCaseName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                    return `assets/js/${kebabCaseName}.[hash].js`;
                }
            }
        }
    }
});

