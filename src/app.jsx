import React from 'react'
import {connect} from 'react-redux'
import {createMuiTheme} from '@material-ui/core/styles'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText  from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import MenuIcon from '@material-ui/icons/Menu'
import theme from './theme.js'
import {fetchChilds} from './actions/childs.js'


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

const ListLink = ({href, text}) => (
  <ListItem button component="a" href={href}>
    <ListItemText primary={text} />
  </ListItem>
)

const App = function({fetchChilds}) {
  fetchChilds()
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
          <List component="nav">
            <ListLink text="Live2D Viewer" href="./live2d/" />
            <ListLink text="Modding Wiki (nsfw)" href="http://wiki.anime-sharing.com/hgames/index.php?title=Destiny_Child/Mods" />
            <ListLink text="GitHub Sourcecode" href="https://github.com/LokiCoder/destiny-child-tools" />
            <ListLink text="Original PCK files (outdated?)" href="https://drive.google.com/drive/u/0/folders/1ZgUD3gnXgyb5Vtu-3yD5pb0kM2ZUTugT" />
          </List>
        </ThemeProvider>
      </CssBaseline>
  )
}

export default connect(
  null,
  {fetchChilds}
)(App)
