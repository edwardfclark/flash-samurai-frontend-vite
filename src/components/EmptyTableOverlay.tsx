import { Stack, Typography } from "@mui/material";
import { GridOverlay } from "@mui/x-data-grid";

export function EmptyTableOverlay({ text }: { text: string }) {
  return (
    <GridOverlay data-testid="empty-table-overlay-wrapper">
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Typography variant="h6" align="center">
          {text}
        </Typography>
      </Stack>
    </GridOverlay>
  );
}
