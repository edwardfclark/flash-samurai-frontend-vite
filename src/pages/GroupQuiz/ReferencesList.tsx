import { IReference } from "../../types/Cards";
import { Stack, Typography, Link, Box } from "@mui/material";

function createYouTubeLink(videoID?: string, timestampSeconds?: string) {
  const url = `https://www.youtube.com/watch?v=${videoID}`;
  // If no timestamp, return the url as is
  // Otherwise add a timestamp
  if (!timestampSeconds) return url;
  return `${url}&t=${timestampSeconds}`;
}

export function ReferencesList({ references }: { references: IReference[] }) {
  if (references.length <= 0) return null;

  return (
    <>
      <Typography variant="h6">References:</Typography>
      <Stack>
        {references.map((ref, idx) => (
          <Box key={idx}>
            {ref.type === "text" && <Typography>{ref.text}</Typography>}
            {ref.type === "link" && Boolean(ref?.url) && (
              <Link href={ref?.url} target="_blank">
                {ref?.text || ref?.url}
              </Link>
            )}
            {ref.type === "youtube" && Boolean(ref?.videoID) && (
              <Link
                href={createYouTubeLink(ref?.videoID, ref?.timestampSeconds)}
                target="_blank"
              >
                {ref?.text || ref?.url}
              </Link>
            )}
          </Box>
        ))}
      </Stack>
    </>
  );
}
