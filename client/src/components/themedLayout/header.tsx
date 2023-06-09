import React from "react";
import {
  useGetIdentity,
  useActiveAuthProvider,
  pickNotDeprecated,
} from "@refinedev/core";
import { HamburgerMenu } from "./hamburgerMenu";
import { AppBar, Stack, Toolbar, Typography, Avatar } from "@mui/material";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const prefferedSticky = pickNotDeprecated(sticky, isSticky) ?? true;

  return (
    <AppBar
      position={prefferedSticky ? "sticky" : "relative"}
      sx={{ background: "#fcfcfc" }}
    >
      <Toolbar>
        <HamburgerMenu />
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
                color: "#808191",
              }}
              variant="subtitle2"
            >
              {user?.name}
            </Typography>
            <Avatar src={user?.avatar} alt={user?.name} />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
