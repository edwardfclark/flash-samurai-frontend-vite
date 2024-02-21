import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import { useState } from "react";

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
    <Box
      sx={{ display: "flex", flexDirection: "row-reverse", width: "100%" }}
      data-testid="row-actions-menu-wrapper"
    >
      <IconButton
        size="small"
        onClick={handleActionsOpen}
        data-testid="row-actions-menu-button"
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="menu-appbar"
        data-testid="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleActionsClose}
      >
        {options.map((item, idx) => (
          <MenuItem
            key={item.name}
            onClick={item.action}
            data-testid={`row-actions-menu-item${idx}`}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
