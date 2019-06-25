import React from "react";
import { useStore } from "../store/Store";
import theme from "../theme";
import { ThemeProvider } from "@material-ui/styles";

const ThemeedComponent: React.FC = ({ children }) => {
  const { state } = useStore();
  return (
    <ThemeProvider theme={theme({ primary: state.color })}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeedComponent;
