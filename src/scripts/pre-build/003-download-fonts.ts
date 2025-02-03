/* eslint-disable no-console */
import { maybeCreateDir, maybeDeleteDir, maybeDeleteFile, toHttps } from '@src/scripts/utils';
import siteData from '@public/site.json';
import googleFonts from '@config/fonts-list.json';
import * as fs from 'fs';
import path from 'path';
import https from 'https';
import wpTheme from '@public/wp-theme.json';
import { camelCase, endsWith, get } from 'lodash';

const isItalic = (str: string) => {
  return endsWith(str, 'italic');
};

const generateFontContent = (fontPaths: string) => {
  return `import localFont from '@next/font/local';

  export const font = localFont({
    src: [
      ${fontPaths}
    ],
    variable: '--font-site-font'
  });`;
};

export default async function execute() {
  try {
    const fontPath = path.resolve(process.cwd(), 'public', 'fonts');
    const newFontPath = path.join(process.cwd(), 'public', 'fonts.ts');

    maybeDeleteDir(fontPath);
    // Ensure the directory exists
    maybeCreateDir(fontPath);
    maybeDeleteFile(path.resolve(process.cwd(), 'public', 'fonts.ts'));
    const fontFamilies = wpTheme.typography?.fontFamilies?.custom;

    if (fontFamilies) {
      let output = '// Generated fonts.ts file\n\n';
      output += `import localFont from '${'next/font/local'}';\n\n`;
      // output += `export const ${'fonts'} = {\n`;

      fontFamilies.forEach((font) => {
        output += `export const ${camelCase(font.slug)} = localFont({\n`;
        output += '    src: [\n';
        font.fontFace.forEach((face) => {
          const fontUrl = face.src;
          const fileName = path.basename(fontUrl);
          const filePath = path.join(process.cwd(), 'public', 'fonts', fileName);

          // Download the font
          https
            .get(fontUrl, (res) => {
              if (res.statusCode === 200) {
                const fileStream = fs.createWriteStream(filePath);
                res.pipe(fileStream);

                fileStream.on('finish', () => {
                  fileStream.close();
                  console.log(`Downloaded: ${filePath}`);
                });
              } else {
                console.error(`Failed to download ${fileName}. Status code: ${res.statusCode}`);
              }
            })
            .on('error', (err) => {
              console.error(`Error downloading ${fontUrl}: ${err.message}`);
            });

          output += `\t\t\t{ path: 'fonts/${fileName}', weight: '${
            face.fontWeight.replace(/[a-zA-Z]/g, '').trim() || '400'
          }', style: '${face.fontStyle}' },\n`;
        });
        output += '\t\t],\n';
        output += `\t\tvariable: '--font-${font.slug}'\n`;
        output += '});\n\n';
      });

      // output += '};\n';
      fs.writeFileSync(newFontPath, output, {
        encoding: 'utf-8',
      });
    }
  } catch (error) {
    console.error('Error downloading fonts:', error);
  }
}
