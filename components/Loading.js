import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => (
  <div
    style={{
      position: 'fixed',
      height: '100%',
      width: '100%',
      background: '#fff'
    }}
  >
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: '100%' }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  </div>
);

export default Loading;
