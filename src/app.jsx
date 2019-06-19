import React from 'react'
import {createMuiTheme} from '@material-ui/core/styles'
import {makeStyles} from '@material-ui/core/styles'
import {CssBaseline, Toolbar, AppBar, Typography, IconButton} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu'
import theme from './theme.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Destiny Child Tools
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    </CssBaseline>
  )
}
