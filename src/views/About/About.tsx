import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useRef } from "react";
import { useStore } from "../../store/Store";

const useStyles = makeStyles({
  button: {
    margin: "0 5px"
  },
  store: {
    paddingBottom: 10
  }
});

const About: React.FC<any> = ({ history }) => {
  const { state, dispatch } = useStore();
  const classes = useStyles();
  const timeoutRef: any = useRef();

  const changeTest = useCallback(() => { //?
    timeoutRef.current && clearTimeout(timeoutRef.current);
    new Promise(
      resolve => (timeoutRef.current = setTimeout(() => resolve(), 2000))
    ).then(() => {
      dispatch({ type: "showChange" });
    });
  }, [state]);
  return (
    <div style={{ height: 2000 }}>
      <div className={classes.store}>{"store: " + JSON.stringify(state)}</div>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => dispatch({ type: "showChange" })}
      >
        change
      </Button>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={changeTest}
      >
        async
      </Button>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => history.push("/")}
      >
        home
      </Button>
    </div>
  );
};

export default About;
