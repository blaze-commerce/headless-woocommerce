export const WPShortcodes = (data, functionMap = []) => {
  const stripChars = (string) => {
    return string.replace('=', '').replace(/"/g, '').replace(/'/g, '');
  };

  if (!data) {
    throw new Error('Must pass data to WPShortcodes');
  }
  var markup = data;

  // Picks up all of the shortcodes and turns them into an array.
  const shortcodesRaw = data.match(/\[(.*?)?\]/g);
  var shortcodes = [];

  // Loops through the shortcode array to find the name and attributes.
  for (let shortcode of shortcodesRaw) {
    const code = shortcode.match(/(?<=\[)[a-zA-Z0-9]\w*/g).toString();
    let attributes = [];
    const attributeString = shortcode
      .toString()
      .replace(code, '')
      .replace('[', '')
      .replace(']', '');
    let attributesArray = attributeString.split(' ');
    var skipNext = false;
    attributesArray.forEach((attribute, index) => {
      if (skipNext) {
        skipNext = false;
        return;
      }
      if (attributesArray.length === 1 && attribute) {
        attributes.push({ name: attribute });
        return;
      }
      if (attribute === '') {
        return;
      }
      if (attribute === '=') {
        attributes[attributes.length - 1] = {
          ...attributes[attributes.length - 1],
          ...{ value: stripChars(attributesArray[index + 1]) },
        };
        skipNext = true;
        return;
      }
      if (attribute[0] === '=') {
        attributes[attributes.length - 1] = {
          ...attributes[attributes.length - 1],
          ...{ value: stripChars(attribute) },
        };
        return;
      }
      if (attribute[attribute.length - 1] === '=') {
        attributes.push({
          name: stripChars(attribute),
          value: stripChars(attributesArray[index + 1]),
        });
        skipNext = true;

        return;
      }
      if (attribute.indexOf('=') > 0) {
        attribute = attribute.split('=');
        attributes.push({
          name: attribute[0],
          value: stripChars(attribute[1]),
        });
        return;
      }
      if (attribute.length) {
        attributes.push({ name: attribute });
      }
    });

    // If our shortcode name is listed in the function map and it points to a valid function,
    // run it and replace the shortcode with whatever the function returns.
    if (typeof functionMap[code] === 'function') {
      let shortCodeMarkup = functionMap[code](attributes);
      if (shortCodeMarkup) {
        markup = markup.replace(shortcode, shortCodeMarkup);
      }
    }
    // We add the shortcode to our formatted shortcode array, along with the name(code), raw
    // shortcode and the attributes.
    shortcodes.push({ code: code, raw: shortcode, attributes: attributes });
  }

  // We create an object with the updated string (markup) and the shortcode array and return it all, in case
  // someone wants to do something different with the return values.

  const obj = { markup: markup, shortcodes: shortcodes };
  return obj;
};
