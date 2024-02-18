import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteGroup } from './DeleteGroup';
import { RowActionsMenu } from '../../components/RowActionsMenu';

interface ComponentProps {
  row: {
    id: string;
    name: string;
    description: string;
    owner: string;
  };
}

export function Actions({ row }: ComponentProps) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <RowActionsMenu
        options={[
          { name: 'Edit', action: () => navigate(`/groups/${row.id}/edit`) },
          { name: 'Delete', action: () => setModalOpen(true) },
          { name: 'Tags', action: () => navigate(`/groups/${row.id}/tags`) },
          { name: 'Cards', action: () => navigate(`/groups/${row.id}/cards`) },
          { name: 'Quiz', action: () => navigate(`/groups/${row.id}/quiz`) },
        ]}
      />
      <DeleteGroup isOpen={modalOpen} onClose={() => setModalOpen(false)} groupId={row.id} />
    </div>
  );
}
