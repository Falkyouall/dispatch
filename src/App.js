import './App.css';
import Dashboard from "./Dashboard";
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";

export const palette = {
  orange: {
    500: '#ef5927',
    700: '#d23e13',
    800: '#c3310a'

  },
  blue: {
    500: '#00BCD4',
    600: '#00acc1',
    800: '#00838f'
  }
};
export const theme = createTheme({
  palette: createPalette({
    primary: {
      light: palette.orange['700'],
      main: palette.orange['500'],
      dark: palette.orange['800'],
      contrastText: '#fff'
    },
    secondary: {
      light: palette.blue['500'],
      main: palette.blue['600'],
      dark: palette.blue['800'],
      contrastText: '#fff'
    }
  })
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Dashboard/>
         </div>
      </ThemeProvider>
  );
}

export default App;
