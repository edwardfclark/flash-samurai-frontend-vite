import { Typography, Button, Box, CircularProgress, Autocomplete, TextField, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGroup } from '../../hooks/Group/useGetGroup';
import { useGetTags } from '../../hooks/Tag/useGetTags';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useGenerateQuizCard } from '../../hooks/Quiz/useGenerateQuizCard';
import { ICard } from '../../types/Cards';
import { ITag } from '../../types/Tags';
import { FetchedCard } from './FetchedCard';

export function GroupQuiz() {
  const params = useParams();
  const groupId = params?.groupId;
  const [fetchedCard, setFetchedCard] = useState<ICard | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const { data: group } = useGetGroup({ groupId });
  const { data: fetchedTags } = useGetTags({ groupId });
  const [tagNames, setTagNames] = useState<string[]>([]);
  const { mutate, isLoading } = useGenerateQuizCard({
    groupId,
    tagNames,
    successCallback: (card) => {
      setFetchedCard(card?.data);
      setIsAnswerRevealed(false);
    },
  });

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Card Groups', path: '/' },
          { name: 'Quiz', path: `/groups/${groupId}/quiz` },
        ]}
      />
      <Typography variant="h2" sx={{ margin: '0 0 1rem' }}>{`${group?.name ?? 'Group'} Quiz`}</Typography>
      <Autocomplete
        multiple
        options={fetchedTags?.data?.map((tag: ITag) => tag.name) ?? []}
        renderInput={(params) => <TextField {...params} label="Tags" sx={{ margin: '0 0 1rem' }} />}
        value={tagNames}
        onChange={(event, newValue) => {
          setTagNames(newValue);
        }}
      />
      <Card variant="outlined" sx={{ margin: '0 0 1rem' }}>
        <CardContent sx={{ position: 'relative' }}>
          {fetchedCard ? (
            <>
              <FetchedCard
                fetchedCard={fetchedCard}
                isAnswerRevealed={isAnswerRevealed}
                setIsAnswerRevealed={setIsAnswerRevealed}
              />
            </>
          ) : (
            <>
              <Typography variant="body1">
                Fetch a card by clicking the 'Get Card' button below. You can limit the fetched cards to specific tags
                by using the Autocomplete above. If left blank, no limits will be placed on the allowed cards.
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button variant="contained" onClick={() => mutate()}>
          {isLoading && <CircularProgress />}
          {!isLoading && <>{fetchedCard ? 'Next Card' : 'Get Card'}</>}
        </Button>
      </Box>
    </>
  );
}
