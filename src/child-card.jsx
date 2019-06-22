import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Stars from './stars.jsx'
import TypeIcon from './type-icon.jsx'
import ElementIcon from './element-icon.jsx'
import {Censor} from './censorship.jsx'

const useStyles = makeStyles({
  card: {
    width: 350,
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
              {child.get('name')} ({child.get('id')})
            </Typography>
            <Stars child={child} />
            <div>
              <ElementIcon child={child} />
              {' '}
              <TypeIcon child={child} />
            </div>
            <Box mt={2}>
              {child.get('tierPVE') && <div>
                Tier PVE: {child.get('tierPVE')} (
                <Link href="http://destiny.us-east-2.elasticbeanstalk.com/" target="_blank">
                  RiceMine
                </Link>
                )
              </div>}
              {child.get('tierPVP') && <div>
                Tier PVP: {child.get('tierPVP')} (
                <Link href="http://destiny.us-east-2.elasticbeanstalk.com/" target="_blank">
                  RiceMine
                </Link>
                )
              </div>}
              {child.get('tierRaid') && <div>
                Tier Raid: {child.get('tierRaid')} (
                <Link href="http://destiny.us-east-2.elasticbeanstalk.com/" target="_blank">
                  RiceMine
                </Link>
                )
              </div>}
              {child.get('tierBoss') && <div>
                Tier Boss: {child.get('tierBoss')} (
                <Link href="http://destiny.us-east-2.elasticbeanstalk.com/" target="_blank">
                  RiceMine
                </Link>
                )
              </div>}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ChildCard
