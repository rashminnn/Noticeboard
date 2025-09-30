import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function NavDrawer({ open,
  onClose
}) {

  const DrawerLink = ({
    href,
    name,
    iconComponent,
  }) => (
    <Link to={href} style={{ textDecoration: "none", color: "black" }}>
      <ListItem button key={name} onClick={onClose}>
        <ListItemIcon>{iconComponent}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  );
  return (
    <Drawer open={open} onClose={onClose}>
      <List sx={{ width: "20vw", pt: 5 }}>
        <DrawerLink
          href="/"
          name="DashBoard"
          iconComponent={<DashboardIcon />}
        />
        <DrawerLink
          href="/logs"
          name="Logs"
          iconComponent={<AssignmentIcon />}
        />
      </List>
    </Drawer>
  );
}
