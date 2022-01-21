module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }], // Use our .prettierrc file as source
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
    },
};
