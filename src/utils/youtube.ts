export function getYouTubeVideoIdFromUrl(urlOrId: string): string | undefined {
  const isIdRegex = /^[^#&?/]+$/;
  const urlRegex =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]+).*/;

  if (isIdRegex.test(urlOrId)) {
    // argument is already an ID
    return urlOrId;
  } else {
    // argument is a URL, needs to be cleaned first
    try {
      return urlOrId.match(urlRegex)?.[1];
    } catch (error) {
      console.error(error);
      return urlOrId;
    }
  }
}
