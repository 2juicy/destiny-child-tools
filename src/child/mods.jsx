import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import {Censor} from '../censorship.jsx'

const useStyles = makeStyles({
  card: {
    maxWidth: 420
  },
  box: {
    display: 'inline-block',
  },
  live2d: {
    minHeight: 275,
  }
})

const stringify = mod =>
  mod.get('child') + '_' +
  mod.get('variant') + '-' +
  mod.get('modder').toLowerCase().replace(/\s/g, '_') + '-' +
  mod.get('name').toLowerCase().replace(/\s/g, '_')

const Mods = ({child, mods}) => {
  const id = child.get('id'),
        classes = useStyles()
  return mods
    ? (
      <Box mt={2}>
        <Typography variant="h5">
          {child.get('name')} Mods
        </Typography>
        <Typography variant="body1">
          <Link href="http://wiki.anime-sharing.com/hgames/index.php?title=Destiny_Child/Modding" target="_blank">
            Installation instructions
          </Link>
        </Typography>
        {child.get('variants').map((_, variantId) =>
          mods.filter(mod => mod.get('variant') == variantId).map((mod, i) => {
            const modPath = stringify(mod)
            return (
              <Box m={1} className={classes.box} key={mod.get('modder') + mod.get('name') + i}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="subtitle1">
                      {child.get('id')}_{variantId} {mod.get('name')} by {mod.get('modder')} {' '}
                      <IconButton title="Download" href={`./live2d/assets/${modPath}/${id}_${variantId}.pck`}>
                        <DownloadIcon />
                      </IconButton>
                    </Typography>
                    <Grid container>
                      <Grid item xs={1}>
                        <Censor min={1}>
                          <img src={`./img/childs/portraits/${id}_${variantId}.png`}
                            width="100%" />
                        </Censor>
                      </Grid>
                      <Grid item xs={11}>
                        <Censor min={1}>
                          <iframe
                            style={{
                              width: '100%',
                              height: '330px',
                              maxWidth: '100%',
                              border: 'none',
                              overflow: 'hidden'
                            }}
                            className={classes.live2d}
                            scrolling="no"
                            seamless="seamless"
                            src={`./live2d/viewer.html?mN=${modPath}&size=400`} />
                        </Censor>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            )
          })
        ).toList()}
      </Box>
    )
    : null
}

export default connect(
  (state, {child}) => {
    return {
      mods: state.get('mods').filter(mod => mod.get('child') == child.get('id'))
    }
  }
)(Mods)
