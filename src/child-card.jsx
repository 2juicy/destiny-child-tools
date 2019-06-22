import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Stars from './stars.jsx'
import Tier from './tier.jsx'
import TypeIcon from './type-icon.jsx'
import ElementIcon from './element-icon.jsx'
import ChildName from './child-name.jsx'
import {Censor} from './censorship.jsx'

const useStyles = makeStyles({
  card: {
    width: 350,
    minHeight: 225,
    display: 'inline-block'
  },
  portrait: {
    float: 'left',
    marginRight: '1rem',
  },
  span: {
    whiteSpace: 'nowrap'
  }
})

const ChildCard = ({child}) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container>
          <Censor min={1}>
            <Grid item xs={4}>
              <img src={`./img/childs/portraits/${child.get('id')}_01.png`}
                height="250"
                alt={`${name} Portrait`}
                className={classes.portrait} />
            </Grid>
          </Censor>
          <Grid item xs={8}>
            <Typography gutterBottom variant="h6" component="h2">
              <ChildName child={child} /> ({child.get('id')})
            </Typography>
            <Stars child={child} />
            <div>
              <ElementIcon child={child} />
              {' '}
              <TypeIcon child={child} />
            </div>
            <Box mt={2}>
              {(typeof child.get('tierPVP') !== 'undefined' ||
                typeof child.get('tierPVE') !== 'undefined' ||
                typeof child.get('tierRaid') !== 'undefined' ||
                typeof child.get('tierBoss') !== 'undefined'
              ) &&
                <Typography gutterBottom variant="subtitle1" component="h3">
                  Tier Levels (from <Link href="http://destiny.us-east-2.elasticbeanstalk.com/" target="_blank">
                  RiceMine</Link>)
                </Typography>
              }
              <Box>
                <Tier child={child} type="PVP" />
              </Box>
              <Box>
                <Tier child={child} type="PVE" />
              </Box>
              <Box>
                <Tier child={child} type="Raid" />
              </Box>
              <Box>
                <Tier child={child} type="Boss" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ChildCard
