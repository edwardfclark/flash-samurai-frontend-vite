import { TextField, Button, Stack, Box } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IGroupForm } from '../../types/Groups';

interface GroupFormProps {
  defaultValues?: IGroupForm;
  onCancel: () => void;
  isLoading: boolean;
  onSubmit: (data: IGroupForm) => void;
}

export function GroupForm({ defaultValues, onCancel, isLoading, onSubmit: externalOnSubmit }: GroupFormProps) {
  const { handleSubmit, control } = useForm<IGroupForm>({ defaultValues });

  const onSubmit: SubmitHandler<IGroupForm> = (data: IGroupForm) => externalOnSubmit(data);

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
