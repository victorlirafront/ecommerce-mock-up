module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        'eslint:recommended'
        // Adicione aqui outras configurações ou plugins conforme necessário
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    rules: {
        'quotes': ['error', 'single'], // Permitir apenas aspas simples
        'printWidth': ['error', 120], // Definir o printWidth para 120 caracteres por linha
    }
};
