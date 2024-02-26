import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Box, MenuItem, Button, TextField } from "@mui/material";
import { ICardForm } from "../../../types/Cards";

export function References() {
  const { watch, control } = useFormContext<ICardForm>();
  const { fields, append } = useFieldArray({ name: "references" });

  console.log(fields);

  return (
    <Box sx={{ mb: "1rem" }}>
      {fields.map((field, idx) => {
        const current = watch(`references.${idx}`);
        const { type } = current;

        return (
          <Box
            sx={{
              mb: "0.5rem",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
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
                  label="Reference Type"
                  data-testid={`card-form-references-${idx}-type`}
                  {...field}
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="link">Link</MenuItem>
                  <MenuItem value="youtube">YouTube Video</MenuItem>
                </TextField>
              )}
            />
            <Box>
              {type === "text" && "text"}
              {type === "link" && "link"}
              {type === "youtube" && "youtube"}
            </Box>
          </Box>
        );
      })}
      <Button onClick={() => append({ type: "text", text: "" })}>
        Add Reference
      </Button>
    </Box>
  );
}
