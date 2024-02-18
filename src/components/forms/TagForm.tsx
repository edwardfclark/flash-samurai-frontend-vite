import { TextField, Button, Stack, Box } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ITagForm } from '../../types/Tags';

interface TagFormProps {
  defaultValues?: ITagForm;
  onCancel: () => void;
  isLoading: boolean;
  onSubmit: (data: ITagForm) => void;
}

export function TagForm({ defaultValues, onCancel, isLoading, onSubmit: externalOnSubmit }: TagFormProps) {
  const { handleSubmit, control } = useForm<ITagForm>({ defaultValues });

  const onSubmit: SubmitHandler<ITagForm> = (data: ITagForm) => externalOnSubmit(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label="Name" sx={{ margin: '0 0 1rem' }} />}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <TextField {...field} label="Description" sx={{ margin: '0 0 1rem' }} multiline rows={3} />
          )}
        />
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            Submit
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
