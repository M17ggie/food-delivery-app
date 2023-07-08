import path from 'path';

const aliases = {
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@styles': path.resolve(__dirname, 'src/styles'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@routes': path.resolve(__dirname, 'src/routes'),
    '@locales': path.resolve(__dirname, 'src/locales'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@api': path.resolve(__dirname, 'src/api')
}

export default aliases;