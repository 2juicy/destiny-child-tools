import React from 'react'
import {connect} from 'react-redux'
import Link from 'redux-first-router-link'
import {fade} from '@material-ui/core/styles'
import {createMuiTheme} from '@material-ui/core/styles'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import MenuIcon from '@material-ui/icons/Menu'
import theme from './theme.js'
import {fetchChilds} from './actions/childs.js'
import Child from './child/index.jsx'
import Childs from './childs/index.jsx'
import Home from './home/index.jsx'
import NotFound from './not-found.jsx'
import SelectChild from './select-child.js'

const pages = {
  HOME: Home,
  CHILDS: Childs,
  CHILD: Child
}

const useStyles = makeStyles(theme => ({
  flexGrow: {
    flexGrow: 1,
  }
}))

const App = function({fetchChilds, page}) {
  fetchChilds()
  const classes = useStyles(),
        Page = pages[page] || NotFound
  return (
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <div className={classes.flexGrow}>
            <AppBar position="static">
              <Toolbar>
                <Box mr={2}>
                  <Link to="/">
                    <img src="./icon.png" height="32" />
                  </Link>
                </Box>
                <Typography variant="h6" className={classes.flexGrow}>
                  Destiny Child Tools
                </Typography>
                <SelectChild />
              </Toolbar>
            </AppBar>
          </div>
          <Box p={2}>
            <Page />
          </Box>
        </ThemeProvider>
      </CssBaseline>
  )
}

export default connect(
  ({page}) => ({page}),
  {fetchChilds}
)(App)
