import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import {
  Box,
  MenuItem,
  Button,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteRounded, AddLinkRounded } from "@mui/icons-material";
import { ICardForm } from "../../../types/Cards";

export function References() {
  const { watch, control } = useFormContext<ICardForm>();
  const { fields, append, remove } = useFieldArray({ name: "references" });

  return (
    <Box sx={{ mb: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          mb: "1rem",
        }}
      >
        <Typography variant="h6">References</Typography>
        <Button
          endIcon={<AddLinkRounded />}
          onClick={() => append({ type: "text", text: "" })}
        >
          Add
        </Button>
      </Box>
      {fields.length === 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="textSecondary">
            No references
          </Typography>
          <Button onClick={() => append({ type: "text", text: "" })}>
            Add Reference
          </Button>
        </Box>
      )}
      {fields.map((field, idx) => {
        const current = watch(`references.${idx}`);
        const { type } = current;

        return (
          <Box
            sx={{
              mb: "1rem",
              display: "grid",
              gridTemplateColumns: "1fr 2fr auto",
              gap: "1rem",
            }}
            key={field.id}
          >
            {/* TODO use something else */}
            <Controller
              name={`references.${idx}.type`}
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <TextField
                  select
                  label="Type"
                  data-testid={`card-form-references-${idx}-type`}
                  {...field}
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="link">Link</MenuItem>
                  <MenuItem value="youtube">YouTube Video</MenuItem>
                </TextField>
              )}
            />
            <>
              {type === "text" && (
                <Box>
                  <Controller
                    name={`references.${idx}.text`}
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextField label="Text" fullWidth {...field} />
                    )}
                  />
                </Box>
              )}
              {type === "link" && (
                <Box sx={{ display: "grid", gap: "0.5rem" }}>
                  <Controller
                    name={`references.${idx}.text`}
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextField label="Text" fullWidth {...field} />
                    )}
                  />
                  <Controller
                    name={`references.${idx}.url`}
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextField label="URL" fullWidth {...field} />
                    )}
                  />
                </Box>
              )}

              {type === "youtube" && (
                <Box
                  sx={{
                    display: "grid",
                    gap: "0.5rem",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  <Controller
                    name={`references.${idx}.text`}
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextField label="Text" fullWidth {...field} />
                    )}
                  />
                  <Controller
                    name={`references.${idx}.url`}
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextField label="URL" fullWidth {...field} />
                    )}
                  />
                  <Controller
                    name={`references.${idx}.videoTimestamp`}
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextField label="Video Timestamp" fullWidth {...field} />
                    )}
                  />
                </Box>
              )}
              <Box>
                <IconButton size="small" onClick={() => remove(idx)}>
                  <DeleteRounded />
                </IconButton>
              </Box>
            </>
          </Box>
        );
      })}
    </Box>
  );
}
