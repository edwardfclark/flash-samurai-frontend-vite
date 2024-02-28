import { test, expect } from "vitest";
import { getYouTubeVideoIdFromUrl } from "../../utils/youtube";

const supportedFormats = [
  "http://www.youtube.com/watch?v=-wtIMTCHWuI",
  "http://youtube.com/watch?v=-wtIMTCHWuI",
  "http://m.youtube.com/watch?v=-wtIMTCHWuI",
  "https://www.youtube.com/watch?v=lalOy8Mbfdc",
  "https://youtube.com/watch?v=lalOy8Mbfdc",
  "https://m.youtube.com/watch?v=lalOy8Mbfdc",

  "http://www.youtube.com/watch?v=yZv2daTWRZU&feature=em-uploademail",
  "http://youtube.com/watch?v=yZv2daTWRZU&feature=em-uploademail",
  "http://m.youtube.com/watch?v=yZv2daTWRZU&feature=em-uploademail",
  "https://www.youtube.com/watch?v=yZv2daTWRZU&feature=em-uploademail",
  "https://youtube.com/watch?v=yZv2daTWRZU&feature=em-uploademail",
  "https://m.youtube.com/watch?v=yZv2daTWRZU&feature=em-uploademail",

  "http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index",
  "http://youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index",
  "http://m.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index",
  "https://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index",
  "https://youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index",
  "https://m.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index",

  "http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s",
  "http://youtube.com/watch?v=0zM3nApSvMg#t=0m10s",
  "http://m.youtube.com/watch?v=0zM3nApSvMg#t=0m10s",
  "https://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s",
  "https://youtube.com/watch?v=0zM3nApSvMg#t=0m10s",
  "https://m.youtube.com/watch?v=0zM3nApSvMg#t=0m10s",

  "http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel",
  "http://youtube.com/watch?v=cKZDdG9FTKY&feature=channel",
  "http://m.youtube.com/watch?v=cKZDdG9FTKY&feature=channel",
  "https://www.youtube.com/watch?v=oTJRivZTMLs&feature=channel",
  "https://youtube.com/watch?v=oTJRivZTMLs&feature=channel",
  "https://m.youtube.com/watch?v=oTJRivZTMLs&feature=channel",

  "http://www.youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub",
  "http://youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub",
  "http://m.youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub",
  "https://www.youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub",
  "https://youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub",
  "https://m.youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub",

  "http://www.youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be",
  "http://youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be",
  "http://m.youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be",
  "https://www.youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be",
  "https://youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be",
  "https://m.youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be",

  "http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player",
  "http://youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player",
  "http://m.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player",
  "https://youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player",
  "https://m.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player",

  "http://www.youtube.com/watch?v=ishbTyLs6ps&list=PLGup6kBfcU7Le5laEaCLgTKtlDcxMqGxZ&index=106&shuffle=2655",
  "http://youtube.com/watch?v=ishbTyLs6ps&list=PLGup6kBfcU7Le5laEaCLgTKtlDcxMqGxZ&index=106&shuffle=2655",
  "http://m.youtube.com/watch?v=ishbTyLs6ps&list=PLGup6kBfcU7Le5laEaCLgTKtlDcxMqGxZ&index=106&shuffle=2655",
  "https://www.youtube.com/watch?v=ishbTyLs6ps&list=PLGup6kBfcU7Le5laEaCLgTKtlDcxMqGxZ&index=106&shuffle=2655",
  "https://youtube.com/watch?v=ishbTyLs6ps&list=PLGup6kBfcU7Le5laEaCLgTKtlDcxMqGxZ&index=106&shuffle=2655",
  "https://m.youtube.com/watch?v=ishbTyLs6ps&list=PLGup6kBfcU7Le5laEaCLgTKtlDcxMqGxZ&index=106&shuffle=2655",

  "http://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ",
  "http://youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ",
  "http://m.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ",
  "https://youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ",
  "https://m.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ",

  "http://www.youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
  "http://youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
  "http://m.youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
  "https://youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
  "https://m.youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",

  "http://www.youtube.com/v/dQw4w9WgXcQ",
  "http://youtube.com/v/dQw4w9WgXcQ",
  "http://m.youtube.com/v/dQw4w9WgXcQ",
  "https://www.youtube.com/v/dQw4w9WgXcQ",
  "https://youtube.com/v/dQw4w9WgXcQ",
  "https://m.youtube.com/v/dQw4w9WgXcQ",

  "http://www.youtube.com/v/-wtIMTCHWuI?version=3&autohide=1",
  "http://youtube.com/v/-wtIMTCHWuI?version=3&autohide=1",
  "http://m.youtube.com/v/-wtIMTCHWuI?version=3&autohide=1",
  "https://www.youtube.com/v/-wtIMTCHWuI?version=3&autohide=1",
  "https://youtube.com/v/-wtIMTCHWuI?version=3&autohide=1",
  "https://m.youtube.com/v/-wtIMTCHWuI?version=3&autohide=1",

  "http://www.youtube.com/v/0zM3nApSvMg?fs=1&hl=en_US&rel=0",
  "http://youtube.com/v/0zM3nApSvMg?fs=1&hl=en_US&rel=0",
  "http://m.youtube.com/v/0zM3nApSvMg?fs=1&hl=en_US&rel=0",
  "https://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0",
  "https://www.youtube.com/v/0zM3nApSvMg?fs=1&hl=en_US&rel=0",
  "https://youtube.com/v/0zM3nApSvMg?fs=1&hl=en_US&rel=0",
  "https://m.youtube.com/v/0zM3nApSvMg?fs=1&hl=en_US&rel=0",

  "http://www.youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player",
  "http://youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player",
  "http://m.youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player",
  "https://www.youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player",
  "https://youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player",
  "https://m.youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player",

  "http://youtu.be/-wtIMTCHWuI",
  "https://youtu.be/-wtIMTCHWuI",

  "http://youtu.be/dQw4w9WgXcQ?feature=youtube_gdata_player",
  "https://youtu.be/dQw4w9WgXcQ?feature=youtube_gdata_player",

  "http://youtu.be/oTJRivZTMLs?list=PLToa5JuFMsXTNkrLJbRlB--76IAOjRM9b",
  "https://youtu.be/oTJRivZTMLs?list=PLToa5JuFMsXTNkrLJbRlB--76IAOjRM9b",

  "http://youtu.be/oTJRivZTMLs&feature=channel",
  "https://youtu.be/oTJRivZTMLs&feature=channel",

  "http://youtu.be/lalOy8Mbfdc?t=1",
  "http://youtu.be/lalOy8Mbfdc?t=1s",
  "https://youtu.be/lalOy8Mbfdc?t=1",
  "https://youtu.be/lalOy8Mbfdc?t=1s",

  "http://youtu.be/M9bq_alk-sw?si=B_RZg_I-lLaa7UU-",
  "https://youtu.be/M9bq_alk-sw?si=B_RZg_I-lLaa7UU-",

  "http://www.youtube.com/embed/lalOy8Mbfdc",
  "http://youtube.com/embed/lalOy8Mbfdc",
  "http://m.youtube.com/embed/lalOy8Mbfdc",
  "https://www.youtube.com/embed/lalOy8Mbfdc",
  "https://youtube.com/embed/lalOy8Mbfdc",
  "https://m.youtube.com/embed/lalOy8Mbfdc",

  "http://www.youtube.com/embed/nas1rJpm7wY?rel=0",
  "http://youtube.com/embed/nas1rJpm7wY?rel=0",
  "http://m.youtube.com/embed/nas1rJpm7wY?rel=0",
  "https://www.youtube.com/embed/nas1rJpm7wY?rel=0",
  "https://youtube.com/embed/nas1rJpm7wY?rel=0",
  "https://m.youtube.com/embed/nas1rJpm7wY?rel=0",

  "http://www.youtube-nocookie.com/embed/lalOy8Mbfdc?rel=0",
  "https://www.youtube-nocookie.com/embed/lalOy8Mbfdc?rel=0",

  "http://www.youtube.com/e/dQw4w9WgXcQ",
  "http://youtube.com/e/dQw4w9WgXcQ",
  "http://m.youtube.com/e/dQw4w9WgXcQ",
  "https://www.youtube.com/e/dQw4w9WgXcQ",
  "https://youtube.com/e/dQw4w9WgXcQ",
  "https://m.youtube.com/e/dQw4w9WgXcQ",
];

const validIds = [
  "lalOy8Mbfdc",
  "yZv2daTWRZU",
  "0zM3nApSvMg",
  "cKZDdG9FTKY",
  "dQw4w9WgXcQ",
  "ishbTyLs6ps",
  "oTJRivZTMLs",
  "-wtIMTCHWuI",
  "nas1rJpm7wY",
  "M9bq_alk-sw",
];

test("it grabs the video ID from the URL for all supported formats", async () => {
  supportedFormats.forEach((url) => {
    const videoId = getYouTubeVideoIdFromUrl(url);
    if (!videoId) {
      console.log("No video ID found for", url);
    }
    expect(videoId).not.toBe(undefined);
    expect(validIds).includes(videoId);
  });
});
