/* eslint-disable no-console */
import * as fs from 'fs';
import path from 'path';
import wpTheme from '@public/wp-theme.json';

export default async function execute() {
  try {
    const themeObject = {
      colorVars: wpTheme?.color?.palette?.custom?.reduce((acc, { color, name }) => {
        acc[`--${name}`] = color;
        return acc;
      }, {} as Record<string, string>),
      colorClasses: wpTheme?.color?.palette?.custom?.reduce((acc, { name }) => {
        acc[`${name}`] = `var(--${name})`;
        return acc;
      }, {} as Record<string, string>),
    };

    const pageFilePath = path.join(process.cwd(), 'public', 'theme.json');
    fs.writeFileSync(pageFilePath, JSON.stringify(themeObject), {
      encoding: 'utf-8',
    });
    console.log('theme config reformatted', themeObject);
  } catch (error) {
    console.error('Error formatting theme config:', error);
  }
}
