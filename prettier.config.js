/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 80,
  importOrder: ['^[^./~]', '^@?[^./~]', '^~', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
