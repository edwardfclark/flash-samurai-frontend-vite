import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Breadcrumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  const navigate = useNavigate();
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return isLast ? (
          <Typography key={breadcrumb.name} color="text.primary">
            {breadcrumb.name}
          </Typography>
        ) : (
          <Link
            key={breadcrumb.name}
            color="inherit"
            onClick={() => navigate(breadcrumb.path)}
            sx={{ cursor: 'pointer' }}
          >
            {breadcrumb.name}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}
