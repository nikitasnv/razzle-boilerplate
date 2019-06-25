import brown from "@material-ui/core/colors/brown";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = ({ primary }) =>
  createMuiTheme({
    palette: {
      primary: {
        main: primary || purple[700]
      },
      secondary: {
        main: brown[900]
      },
      error: {
        main: red.A400
      },
      background: {
        default: "#fff"
      }
    }
  });

export default theme;
