import { IReference } from "../../types/Cards";
import { Stack, Typography, Link } from "@mui/material";

function formatYoutubeLink(url?: string, timestampSeconds?: string) {
  // If no timestamp, return the url as is
  if (!timestampSeconds) return url;

  // If there are already query params, append the timestamp with &. Otherwise, use ?
  if (!url?.includes("?")) return `${url}?t=${timestampSeconds}`;
  return `${url}&t=${timestampSeconds}`;
}

export function ReferencesList({ references }: { references: IReference[] }) {
  if (references.length <= 0) return null;
  return (
    <>
      <Typography variant="h6">References:</Typography>
      <Stack>
        {references.map((ref, idx) => (
          <>
            {ref.type === "text" && (
              <Typography key={ref?._id || idx}>{ref.text}</Typography>
            )}
            {ref.type === "link" && Boolean(ref?.url) && (
              <Link href={ref?.url} key={ref?._id || idx}>
                {ref?.text || ref?.url}
              </Link>
            )}
            {ref.type === "youtube" && Boolean(ref?.url) && (
              <Link
                href={formatYoutubeLink(ref?.url, ref?.timestampSeconds)}
                key={ref?._id || idx}
              >
                {ref?.text || ref?.url}
              </Link>
            )}
          </>
        ))}
      </Stack>
    </>
  );
}
