import { Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import QuestionIcon from "@material-ui/icons/NotListedLocation";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import useReactRouter from "use-react-router";
import LayoutDraver from "../../components/Drawer";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "50px 1fr",
    height: "100%"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: "0 5px"
    }
  },
  active: {
    color: "red"
  }
});

const LayoutLink: React.FC<NavLinkProps> = ({ children, ...props }) => (
  <NavLink exact activeClassName="Layout-selected-route" to="/" {...props}>
    {children}
  </NavLink>
);

const LayoutButton: React.FC<any> = ({
  children,
  to,
  activeStyle,
  activeClassName = "Layout-selected-route",
  ...props
}) => {
  const classes = useStyles();
  const { history, location } = useReactRouter();
  const current = location.pathname !== to;
  const press = useCallback(() => {
    current && history.push(to);
  }, [current]);
  return (
    <Button
      className={!current ? classes.active : ""}
      style={{ ...(!current && activeStyle) }}
      onClick={press}
      {...props}
    >
      {children}
    </Button>
  );
};

const links = [
  {
    text: "Home",
    icon: HomeIcon,
    to: "/"
  },
  "-",
  {
    text: "About",
    icon: QuestionIcon,
    to: "/about"
  },
  "-"
];

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  return <LayoutDraver links={links}>{children}</LayoutDraver>;
};

export default Layout;
