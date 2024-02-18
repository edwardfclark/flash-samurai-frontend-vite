import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { useDeleteGroup } from '../../hooks/Group/useDeleteGroup';

interface ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
}

export function DeleteGroup({ isOpen, onClose, groupId }: ComponentProps) {
  const { mutate, isLoading } = useDeleteGroup({ groupId, successCallback: onClose });
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Really delete group?"
      description="This action cannot be undone!"
      onConfirm={() => mutate()}
      isLoading={isLoading}
    />
  );
}
