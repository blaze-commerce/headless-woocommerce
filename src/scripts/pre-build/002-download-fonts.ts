/* eslint-disable no-console */
import { maybeCreateDir, maybeDeleteDir, maybeDeleteFile, toHttps } from '@src/scripts/utils';
import siteData from '@public/site.json';
import googleFonts from '@config/fonts-list.json';
import * as fs from 'fs';
import path from 'path';
import https from 'https';
import { endsWith, get } from 'lodash';

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
  const fontConfigJSON: (unknown[] & { family: string; format: string })[] = [];
  const fontConfigJSONForImport = [];
  let fontPaths = '';

  try {
    const fontPath = path.resolve(process.cwd(), 'public', 'fonts');

    maybeDeleteDir(fontPath);
    maybeDeleteFile(path.resolve(process.cwd(), 'public', 'fonts.ts'));

    const fontFamily = siteData.store.fontFamily;
    if (fontFamily) {
      const matchFont = googleFonts.find((font) => font.family === fontFamily);

      maybeCreateDir(fontPath);
      if (matchFont) {
        for (const fontWeight in matchFont.files) {
          const fontUrl = get(matchFont.files, fontWeight);
          if (fontUrl) {
            const extension = path.extname(new URL(fontUrl).pathname);
            const fontFileName = `${fontFamily}-${fontWeight}${extension}`;
            const fontFile = path.resolve(fontPath, fontFileName);
            const fontConfigObj = {
              path: `/fonts/${fontFileName}`,
              weight: fontWeight.replace(/[a-zA-Z]/g, '').trim() || '400',
              style: isItalic(fontWeight) ? 'italic' : 'normal',
            };
            fontPaths += `{ path: '/fonts/${fontFileName}', weight: '${
              fontWeight.replace(/[a-zA-Z]/g, '').trim() || '400'
            }', style: '${isItalic(fontWeight) ? 'italic' : 'normal'}' },\n`;
            fontConfigJSONForImport.push(fontConfigObj);
            fontConfigJSON.push(
              Object.assign({}, fontConfigJSON, {
                family: fontFamily,
                format: extension.replace(/\./g, '').trim(),
              })
            );
            https.get(fontUrl, (res) => {
              const fileStream = fs.createWriteStream(fontFile);
              res.pipe(fileStream);
              fileStream.on('finish', () => {});
            });
          }
        }

        const fullFilePath = path.join(process.cwd(), 'public', 'fonts.json');
        await fs.promises.writeFile(fullFilePath, JSON.stringify(fontConfigJSONForImport));

        const fullLibHelperPath = path.join(process.cwd(), 'public', 'fonts.ts');

        const libHelperContent = generateFontContent(fontPaths);
        await fs.promises.writeFile(fullLibHelperPath, libHelperContent);
      }
    }
  } catch (error) {
    console.error('Error downloading fonts:', error);
  }
}
