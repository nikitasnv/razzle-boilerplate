import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Route } from "react-router-dom";
import AnimatingSwitch from "../../components/AnimatingSwitch";
import About from "../About/About";
import Home from "../Home/Home";
import Layout from "../Layout/Layout";

const useStyles = makeStyles({
  "@global": {
    html: {
      height: "100%",
      overflow: "hidden"
    },
    body: {
      height: "100%",
      overflow: "hidden",
      "& > div": {
        height: "100%",
        overflow: "hidden"
      }
    }
  }
} as any);

const App = () => {
  const classes = useStyles();
  return (
    <Layout>
      <AnimatingSwitch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route render={() => <div>404</div>} />
      </AnimatingSwitch>
    </Layout>
  );
};

export default App;
