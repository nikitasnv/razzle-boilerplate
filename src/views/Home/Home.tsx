import { withStyles } from "@material-ui/styles";
import React from "react";
const logo = require("../../react.svg") as string;

const useStyles: any = {
  "@keyframes Home-logo-spin": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    }
  },
  Home: { textAlign: "center" },
  Home_logo: {
    animation: "$Home-logo-spin infinite 20s linear",
    height: "80px"
  },
  Home_header: {
    backgroundColor: "#222",
    height: "150px",
    padding: "20px",
    color: "white"
  },
  Home_intro: { fontSize: "large" },
  Home_resources: {
    listStyle: "none",
    "& > li": {
      display: "inline-block",
      padding: "1rem"
    }
  }
};

class Home extends React.Component<{ classes: { [key: string]: string } }> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes["Home"]}>
        <div className={classes["Home_header"]}>
          <img src={logo} className={classes["Home_logo"]} alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className={classes["Home_intro"]}>
          To get started, edit <code>src/App.js</code> or{" "}
          <code>src/Home.js</code> and save to reload.
        </p>
        <ul className={classes["Home_resources"]}>
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
          <li>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </li>
          <li>
            <a href="https://palmer.chat">Community Slack</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default withStyles(useStyles)(Home);
