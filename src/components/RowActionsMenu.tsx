import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import { useState } from 'react';

interface ComponentProps {
  options: {
    name: string;
    action: () => void;
  }[];
}

export function RowActionsMenu({ options }: ComponentProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  function handleActionsOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleActionsClose() {
    setAnchorElNav(null);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
      <IconButton size="small" onClick={handleActionsOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleActionsClose}
      >
        {options.map((item) => (
          <MenuItem key={item.name} onClick={item.action}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
