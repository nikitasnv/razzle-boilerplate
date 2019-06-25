import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const useStyles: any = makeStyles({
  "fade-appear": {
    opacity: "0",
    zIndex: "1"
  },
  "fade-enter": {
    opacity: "0",
    zIndex: "1",
    "&.fade-enter-active": {
      opacity: "1",
      transition: "opacity 300ms linear 150ms"
    }
  },
  "fade-appear-active": {
    opacity: "1",
    transition: "opacity 300ms linear 150ms"
  },
  "fade-exit": {
    opacity: "1",
    "&.fade-exit-active": {
      opacity: "0",
      transition: "opacity 150ms linear"
    }
  },
  "Transition-Wrapper": ({ padding }: any) => ({
    position: "relative",
    flex: "1",
    padding: padding,
    overflowY: "auto",
    "& > *": {
      position: "absolute",
      width: `calc(100% - ${padding * 2}px)`
    }
  })
} as any);

const AnimatingSwitch: any = ({ children }: any) => {
  const classes = useStyles({ padding: 25 });
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup className={classes["Transition-Wrapper"]}>
          <CSSTransition
            key={location.key}
            timeout={450}
            classNames={{
              appear: classes["fade-appear"],
              appearActive: classes["fade-appear-active"],
              enter: classes["fade-enter"],
              enterActive: "fade-enter-active",
              exit: classes["fade-exit"],
              exitActive: "fade-exit-active"
            }}
          >
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default AnimatingSwitch;
