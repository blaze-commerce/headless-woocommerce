/* eslint-disable no-console */
import { maybeDeleteFile, toHttps } from '@src/scripts/utils';
import siteData from '@public/site.json';
import * as fs from 'fs';
import path from 'path';
import https from 'https';

const imageExtensions = ['jpg', 'jpeg', 'gif', 'png', 'webp', 'ico'];

export default async function execute() {
  try {
    imageExtensions.map(
      async (ext) => await maybeDeleteFile(path.resolve(process.cwd(), 'public', `favicon.${ext}`))
    );

    if (siteData.store.favicon) {
      const faviconPath = path.join(process.cwd(), 'public');
      const faviconFile = path.resolve(faviconPath, 'favicon.ico');
      https
        .get(toHttps(siteData.store.favicon), (res) => {
          const fileStream = fs.createWriteStream(faviconFile);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
          });
        })
        .on('error', async (err) => {
          await maybeDeleteFile(faviconFile);
          console.error(`Error downloading image: ${err.message}`);
        });
    }
    console.log('Downloading favicon');
  } catch (error) {
    console.error('Error downloading favicon:', error);
  }
}
