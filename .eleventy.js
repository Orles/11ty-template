require('tsx/cjs');

const fs = require('node:fs');
const path = require('node:path');

const DATA_DIR = path.resolve('./src/data');
const ICONS_DIR = path.resolve('./src/resources/icons');

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode(
    'svgIcon',
    function (type, name, attributes = '') {
      const iconPath = type
        ? path.join(ICONS_DIR, type, `${name}.svg`)
        : path.join(ICONS_DIR, `${name}.svg`);

      if (!fs.existsSync(iconPath)) {
        return `<!-- Иконка ${type ? `${type}/${name}` : name} не найдена -->`;
      }

      let svgContent = fs.readFileSync(iconPath, 'utf8');

      svgContent = svgContent.replace('<svg', `<svg ${attributes}`);

      return svgContent;
    },
  );
  eleventyConfig.addWatchTarget('./src/data/');

  const dataFiles = fs
    .readdirSync(DATA_DIR)
    .filter((file) => file.endsWith('.ts'));

  for (const file of dataFiles) {
    const fileName = path.basename(file, '.ts');
    const filePath = path.join(DATA_DIR, file);

    delete require.cache[require.resolve(filePath)];

    const data = require(filePath);

    eleventyConfig.addGlobalData(fileName, data);
  }

  eleventyConfig.addPassthroughCopy({
    'src/resources/fonts': 'fonts',
    'src/resources/icons': 'icons',
    'src/resources/images': 'images',
  });

  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');

  return {
    dir: {
      input: 'src/views',
      output: '_site',
      includes: 'includes',
    },
  };
};
