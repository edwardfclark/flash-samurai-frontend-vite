import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { useDeleteTag } from '../../hooks/Tag/useDeleteTag';

interface ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  groupId?: string;
  tagId: string;
}

export function DeleteTag({ isOpen, onClose, groupId, tagId }: ComponentProps) {
  const { mutate, isLoading } = useDeleteTag({ groupId, successCallback: onClose, tagId });
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Really delete tag?"
      description="This action cannot be undone!"
      onConfirm={() => mutate()}
      isLoading={isLoading}
    />
  );
}
