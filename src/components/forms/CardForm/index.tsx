import {
  TextField,
  Button,
  Stack,
  Box,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import { ICardForm } from "../../../types/Cards";
import { useGetTags } from "../../../hooks/Tag/useGetTags";
import { useCreateTag } from "../../../hooks/Tag/useCreateTag";
import { ITag } from "../../../types/Tags";
import { TagForm } from "../TagForm";
import { References } from "./References";

interface CardFormProps {
  defaultValues?: ICardForm;
  onCancel: () => void;
  isLoading: boolean;
  onSubmit: (data: ICardForm) => void;
  groupId?: string;
}

export function CardForm({
  defaultValues,
  onCancel,
  isLoading,
  onSubmit: externalOnSubmit,
  groupId,
}: CardFormProps) {
  const [isTagFormOpen, setIsTagFormOpen] = useState(false);
  const { data: fetchedTags } = useGetTags({ groupId });
  const form = useForm<ICardForm>({
    defaultValues,
  });
  const { handleSubmit, control, watch, setValue } = form;
  const selectedTags = watch("tags");

  const onSubmit: SubmitHandler<ICardForm> = (data: ICardForm) =>
    externalOnSubmit(data);

  const { mutate, isPending: createTagLoading } = useCreateTag({
    groupId,
    successCallback: () => {
      setIsTagFormOpen(false);
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="question"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Question"
                data-testid="card-form-question"
                sx={{ margin: "0 0 1rem" }}
                multiline
                rows={3}
              />
            )}
          />
          <Controller
            name="answer"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Answer"
                data-testid="card-form-answer"
                sx={{ margin: "0 0 1rem" }}
                multiline
                rows={3}
              />
            )}
          />
          <Controller
            name="reference"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reference"
                data-testid="card-form-reference"
                sx={{ margin: "0 0 1rem" }}
              />
            )}
          />
          <References />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              margin: "0 0 1rem",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Autocomplete
                multiple
                options={fetchedTags?.data?.map((tag: ITag) => tag.name) ?? []}
                renderInput={(params) => <TextField {...params} label="Tags" />}
                value={selectedTags?.map((tag) => tag.name) ?? []}
                onChange={(_, values) => {
                  const tags =
                    fetchedTags?.data?.filter((tag: ITag) =>
                      values?.includes(tag.name),
                    ) ?? [];
                  setValue("tags", tags, { shouldDirty: true });
                }}
                data-testid="card-form-tags-autocomplete"
              />
            </Box>
            <Button endIcon={<Label />} onClick={() => setIsTagFormOpen(true)}>
              Add
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={onCancel}
              data-testid="card-form-cancel-button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              name="submit"
              variant="contained"
              disabled={isLoading}
              data-testid="card-form-submit-button"
            >
              Submit
            </Button>
          </Box>
        </Stack>
        <Dialog open={isTagFormOpen} onClose={() => setIsTagFormOpen(false)}>
          <DialogTitle>Add New Tag</DialogTitle>
          <DialogContent>
            <Box sx={{ minWidth: "300px", mt: "0.5rem" }}>
              <TagForm
                onSubmit={(data) => mutate({ ...data, groupId })}
                isLoading={createTagLoading}
                onCancel={() => setIsTagFormOpen(false)}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </form>
    </FormProvider>
  );
}
