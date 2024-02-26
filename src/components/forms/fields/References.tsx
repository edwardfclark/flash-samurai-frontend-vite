import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Box, Select, MenuItem, Button, TextField } from "@mui/material";

export function References() {
  const { watch, control } = useFormContext();
  const { fields, append } = useFieldArray({ name: "references" });

  return (
    <Box sx={{ mb: "1rem" }}>
      {fields.map((_, idx) => (
        <Box sx={{ mb: "0.5rem", display: "grid" }} key={idx}>
          {/* TODO use something else */}
          <Controller
            name={`references[${idx}].type`}
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                select
                label="Reference Type"
                data-testid={`card-form-references-${idx}-type`}
                {...field}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="link">Link</MenuItem>
                <MenuItem value="youtube">YouTube Video</MenuItem>
              </TextField>
            )}
          ></Controller>
        </Box>
      ))}
      <Button onClick={() => append({ type: "text", text: "" })}>
        Add Reference
      </Button>
    </Box>
  );
}
