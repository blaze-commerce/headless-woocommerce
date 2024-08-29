const cleanSource = (source: string) => {
  const thumbnailSrc = `${source}`.replace('\\', '');
  return thumbnailSrc;
};

const TSThumbnail = {
  clean: cleanSource,
};

export default TSThumbnail;
