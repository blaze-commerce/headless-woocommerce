interface Attribute {
  name: string;
  value?: string;
}

interface Shortcode {
  code: string;
  raw: string;
  attributes: Attribute[];
}

interface Result {
  markup: string;
  shortcodes: Shortcode[];
}

const stripChars = (str: string): string => {
  return str.replace('=', '').replace(/"/g, '').replace(/'/g, '');
};

export const WPShortcodes = (
  data: string,
  functionMap: { [key: string]: (attributes: Attribute[]) => string } = {}
): Result => {
  if (!data) {
    throw new Error('Must pass data to WPShortcodes');
  }
  let markup = data;

  // Picks up all of the shortcodes and turns them into an array.
  const shortcodesRaw = data.match(/\[(.*?)?\]/g) || [];
  const shortcodes: Shortcode[] = [];

  // Loops through the shortcode array to find the name and attributes.
  // eslint-disable-next-line prefer-const
  for (let shortcode of shortcodesRaw) {
    const codeMatch = shortcode.match(/(?<=\[)[a-zA-Z0-9]\w*/g);
    if (!codeMatch) continue;
    const code = codeMatch.toString();
    const attributeString = shortcode
      .toString()
      .replace(code, '')
      .replace('[', '')
      .replace(']', '');

    const attributes: Attribute[] = [];
    const attributeRegex = /(\w+)=["']((?:\\.|[^"\\])*)["']/g;
    let match: RegExpExecArray | null;

    while ((match = attributeRegex.exec(attributeString)) !== null) {
      attributes.push({
        name: match[1],
        value: match[2],
      });
    }

    if (typeof functionMap[code] === 'function') {
      const shortCodeMarkup = functionMap[code](attributes);
      if (shortCodeMarkup) {
        markup = markup.replace(shortcode, shortCodeMarkup);
      }
    }

    shortcodes.push({ code, raw: shortcode, attributes });
  }

  return { markup, shortcodes };
};
