import { AppBar, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/styles";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReactRouter from "use-react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => {
  //console.log(theme);
  return {
    root: {
      display: "flex",
      height: "100%"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36,
      marginLeft: -20,
      [theme.breakpoints.down("xs")]: {
        marginLeft: -12
      }
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1
      /*  [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1
      } */
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: 0,
      display: "flex",
      flexDirection: "column"
    },
    activeLink: {
      backgroundColor: theme.palette.action.hover
    }
  };
});

const DrawerLink: React.FC<any> = ({ children, LinkIcon, to }) => {
  const { history, location } = useReactRouter();
  const current = location.pathname !== to;
  const classes = useStyles();
  const press = useCallback(() => {
    current && history.push(to);
  }, [current]);
  return (
    <ListItem
      className={!current ? classes.activeLink : ""}
      button
      onClick={press}
    >
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText primary={children} />
    </ListItem>
  );
};

function buildListItems(
  linksArray: (string & {
    text: string;
    icon?: React.ComponentType<SvgIconProps>;
    to: string;
  })[]
) {
  const result: React.ReactElement[] = [];
  let tmp: React.ReactElement[] = [];
  let groupIndex = 0;
  linksArray.forEach((row, index) => {
    switch (typeof row) {
      case "string":
        switch (row) {
          case "<->":
            tmp.length > 0 &&
              result.push(
                <List key={groupIndex++}>{tmp}</List>,
                <Divider key={groupIndex++} />
              );
            tmp = [];
            break;
          case "-":
            tmp.push(<Divider key={index} />);
        }
        break;
      case "object":
        tmp.push(
          <DrawerLink
            to={row.to}
            key={index}
            LinkIcon={row.icon ? row.icon : MenuIcon}
          >
            {row.text}
          </DrawerLink>
        );
    }
  });
  if (tmp.length > 0) {
    result.push(<List key={groupIndex++}>{tmp}</List>);
  }
  return result;
}

const LayoutDrawer: React.FC<any> = ({ children, links }) => {
  const classes: any = useStyles();
  const theme: any = useTheme();
  const [open, setOpen] = React.useState(false);
  const drawerLinks = useMemo(() => buildListItems(links), [links]);
  const dispatch: any = useDispatch();
  const state: any = useSelector(state => state);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ flexGrow: 1 }} variant="h6" noWrap>
            App
          </Typography>
          <Button
            onClick={() => {
              dispatch({ type: "changeColor" });
            }}
            color="inherit"
          >
            {state.color}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          onClick: (e: any) => {
            e.target.classList.contains("MuiPaper-root") &&
              setOpen(prev => !prev);
          },
          style: { overflow: "hidden" }
        }}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {drawerLinks}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default LayoutDrawer;
