import { Typography, CardActions, Button, Box, Chip, Tooltip } from '@mui/material';
import { ICard } from '../../types/Cards';

interface ComponentProps {
  fetchedCard: ICard;
  isAnswerRevealed: boolean;
  setIsAnswerRevealed: (isAnswerRevealed: boolean) => void;
}

export function FetchedCard({ fetchedCard, isAnswerRevealed, setIsAnswerRevealed }: ComponentProps) {
  return (
    <>
      <Typography variant="h5" sx={{ margin: '0 0 1rem' }}>
        Question:
      </Typography>
      <Typography variant="body1" sx={{ margin: '0 0 1rem', whiteSpace: 'pre-line' }}>
        {fetchedCard.question}
      </Typography>
      {!isAnswerRevealed && (
        <CardActions>
          <Button onClick={() => setIsAnswerRevealed(true)}>Reveal Answer</Button>
        </CardActions>
      )}
      {!!isAnswerRevealed && (
        <>
          <Typography variant="h5" sx={{ margin: '0 0 1rem' }}>
            Answer:
          </Typography>
          <Typography variant="body1" sx={{ margin: '0 0 1rem', whiteSpace: 'pre-line' }}>
            {fetchedCard.answer}
          </Typography>
          {!!fetchedCard?.reference && <Typography variant="caption">{fetchedCard.reference}</Typography>}
        </>
      )}
      {!!fetchedCard?.tags?.length && fetchedCard?.tags?.length > 0 && (
        <Box sx={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.25rem' }}>
          {fetchedCard.tags.map((tag) => (
            <Tooltip title={tag?.description} arrow>
              <Chip label={tag.name} size="small" />
            </Tooltip>
          ))}
        </Box>
      )}
    </>
  );
}
