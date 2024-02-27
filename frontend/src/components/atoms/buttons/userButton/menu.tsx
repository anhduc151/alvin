import React, { useState } from "react";
import { useAuth } from "api/auth";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Modal,
  Box,
  Avatar,
} from "@mui/material";
import { Translator } from "components/i18n";
import { projectSettingsState } from "state/project";
import { settingsState } from "state/settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import cover from "../../../../assets/cover_images.png";
import UserIcon from "assets/user";

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const styleUser = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 600,
  width: 600,
  bgcolor: "background.paper",
  color: "text.primary",
  border: "1px solid #2b2a2a",
  boxShadow: 24,
  borderRadius: 2,
  padding: "0 20px 0",
  overflow: "auto",
};

export default function UserMenu({ anchorEl, open, handleClose }: Props) {
  const { user, logout } = useAuth();
  const pSettings = useRecoilValue(projectSettingsState);
  const setAppSettings = useSetRecoilState(settingsState);
  const requiredKeys = !!pSettings?.userEnv?.length;

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () => setIsUserModalOpen(false);

  const userNameItem = user && (
    <MenuItem key="user-name" onClick={openUserModal}>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      {/* <ListItemText>
        <Typography width="100%" fontSize="14px" fontWeight={700}>
          {user.id}
        </Typography>
        <Typography width="100%" fontSize="13px" fontWeight={400}>
          {user.identifier}
        </Typography>
      </ListItemText> */}
      <Typography>Account</Typography>
    </MenuItem>
  );

  const settingsItem = (
    <MenuItem
      key="settings"
      onClick={() => {
        setAppSettings((old) => ({ ...old, open: true }));
        handleClose();
      }}
    >
      <ListItemIcon>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
        <Translator path="components.atoms.buttons.userButton.menu.settings" />
      </ListItemText>
      <Typography variant="body2" color="text.secondary">
        <Translator path="components.atoms.buttons.userButton.menu.settingsKey" />
      </Typography>
    </MenuItem>
  );

  const apiKeysItem = requiredKeys && (
    <MenuItem key="env" component={Link} to="/env">
      <ListItemIcon>
        <KeyIcon fontSize="small" />
      </ListItemIcon>
      <Translator path="components.atoms.buttons.userButton.menu.APIKeys" />
    </MenuItem>
  );

  const logoutItem = user && (
    <MenuItem
      key="logout"
      onClick={() => {
        logout();
        handleClose();
      }}
    >
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      <Translator path="components.atoms.buttons.userButton.menu.logout" />
    </MenuItem>
  );

  const menuItems = [
    userNameItem,
    settingsItem,
    apiKeysItem,
    logoutItem,
  ].filter((i) => !!i);

  const itemsWithDivider = menuItems.reduce((acc, curr, i) => {
    if (i === menuItems.length - 1) {
      return [...acc, curr];
    }
    return [...acc, curr, <Divider sx={{ my: 1 }} key={`divider-${i}`} />];
  }, [] as React.ReactNode[]);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 220,
            overflow: "visible",
            mt: 1.5,
            backgroundImage: "none",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0px 2px 4px 0px #0000000D"
                : "0px 10px 10px 0px #0000000D",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.default",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {itemsWithDivider}
      </Menu>
      <Modal
        open={isUserModalOpen}
        onClose={closeUserModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={styleUser}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={cover}
              alt=""
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                position: "relative",
                top: -20,
              }}
            >
              <UserIcon sx={{ width: 20 }} />
            </Avatar>
          </Box>

          {user && (
            <ListItemText>
              <Typography>{user.id}</Typography>

              <Typography sx={{ textAlign: "center" }}>
                {user.identifier}
              </Typography>
            </ListItemText>
          )}
        </Box>
      </Modal>
    </>
  );
}
