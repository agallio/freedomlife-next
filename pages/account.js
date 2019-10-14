import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { auth } from '../utils/auth';
import {
  Container,
  HeaderTitle,
  HeaderSubtitle
} from '../components/StyledBase';
import { GuidePassageBoxFAB } from '../components/StyledHome';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { fetchCurrentUser } from '../store';

class Account extends Component {
  state = {
    loading: true
  };

  componentDidMount = () => {
    this.props.fetchCurrentUser().then(() => this.setState({ loading: false }));
  };

  handleLogout = () => {
    Cookies.remove('loggedIn');
    window.location.reload();
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div>
        {this.state.loading && <LinearProgress color="secondary" />}
        <Fade in>
          <Container>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={16}
            >
              <Grid item sm={2}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#9163e0',
                    borderRadius: '50%',
                    marginTop: 95
                  }}
                >
                  {currentUser.photo !== undefined && (
                    <img
                      src={currentUser.photo}
                      width="50"
                      height="50"
                      style={{ borderRadius: '50%' }}
                      alt="profile-img"
                    />
                  )}
                </div>
              </Grid>
              <Grid item sm={10}>
                <HeaderTitle marginTop="110px">Halo,</HeaderTitle>
                <HeaderSubtitle>{currentUser.name || 'Guest'}</HeaderSubtitle>
              </Grid>
            </Grid>

            {/* <div style={{ marginTop: 40 }}>
              {currentUser.photo !== undefined ? (
                <GuidePassageBoxFAB
                  size="medium"
                  variant="extended"
                  color="secondary"
                  onClick={this.handleLogout}
                >
                  Keluar
                </GuidePassageBoxFAB>
              ) : (
                <GuidePassageBoxFAB
                  size="medium"
                  variant="extended"
                  color="secondary"
                  component="a"
                  href=""
                >
                  Masuk
                </GuidePassageBoxFAB>
              )}
            </div> */}
          </Container>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const mapDispatchToProps = dispatch => {
  return { fetchCurrentUser: () => dispatch(fetchCurrentUser()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
