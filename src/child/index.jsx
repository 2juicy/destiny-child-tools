import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import RouterLink from '../link.jsx'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles({
  box: {
    width: 350,
    display: 'inline-block'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const Child = ({child}) => {
  const classes = useStyles()
  if(!child) return <div>Loading ...</div>
  const name = child.get('name'),
        id = child.get('id'),
        variants = child.get('variants')
  return (
    <div>
      <Breadcrumbs aria-label="Breadcrumb">
        <Link component={RouterLink} to="/">Home</Link>
        <Link component={RouterLink} to="/childs">Childs</Link>
        <Typography color="textPrimary">{name} ({id})</Typography>
      </Breadcrumbs>
      <Box mt={2}>
        <Typography variant="h5">{name} Variants</Typography>
      </Box>
      {variants.toOrderedMap().sortBy((v, k) => k)
        .map((variant, variantId) => variant && variant.get &&
          <Box m={1} key={id + variantId} className={classes.box}>
            <Card>
              <CardContent>
                <Button
                      href={`./live2d/?model=${id}_${variantId}`}
                      target="_blank">
                  {variant.get('title')} {name} ({id}_{variantId})
                  <Box ml={2}><OpenInNewIcon /></Box>
                </Button>
                <iframe
                  style={{
                    width: '350px',
                    height: '350px',
                    maxWidth: '100%',
                    border: 'none',
                    overflow: 'hidden'
                  }}
                  scrolling="no"
                  seamless="seamless"
                  src={`./live2d/viewer.html?mN=${id}_${variantId}&size=500`} />
                </CardContent>
            </Card>
          </Box>
        ).toList()
      }
    </div>
  )
}

export default connect(
  state => ({
    child: state.get('childs').get(state.get('location').payload.id)
  })
)(Child )
