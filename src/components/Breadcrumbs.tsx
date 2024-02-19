import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Breadcrumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  const navigate = useNavigate();
  if (!breadcrumbs || breadcrumbs.length === 0) return null;
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return isLast ? (
          <Typography
            key={breadcrumb.name}
            color="text.primary"
            data-testid={`breadcrumbs-item-${index}`}
          >
            {breadcrumb.name}
          </Typography>
        ) : (
          <Link
            key={breadcrumb.name}
            color="inherit"
            onClick={() => navigate(breadcrumb.path)}
            sx={{ cursor: "pointer" }}
            data-testid={`breadcrumbs-item-${index}`}
          >
            {breadcrumb.name}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}
