import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Link as MuiLink
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function AppbarWithDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // サイドバーのメニュー項目と、対応するパスのリストだぷ
  const menuItems = [
    { text: 'ホーム', path: '/' },
    { text: 'プロフィール', path: '/setting' },
    { text: 'フレンド', path: '/friendships' },
    { text: 'FAM', path: '/fam' },
    { text: 'LUM', path: '/lum' }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <MuiLink 
            component={RouterLink}
            to="/" 
            color="inherit" 
            underline="none"
            variant="h6"
            noWrap 
            sx={{ flexGrow: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            Ryokatsu Channel
          </MuiLink>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                {/* ListItemButtonをRouterLinkでラップするぷ */}
                <ListItemButton 
                  component={RouterLink} 
                  to={item.path}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}