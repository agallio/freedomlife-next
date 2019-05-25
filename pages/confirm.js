import React, { Component } from 'react';
import Router from 'next/router';
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

import { fetchCurrentUser } from '../store';

class Account extends Component {
  static async getInitialProps(ctx) {
    const loggedIn = auth(ctx);

    return { loggedIn };
  }

  componentWillMount = () => {
    this.props.fetchCurrentUser();
  };

  componentDidMount = () => {
    if (this.props.status === 401) {
      Cookies.remove('loggedIn');
      window.location.reload();
    }
  };

  handleLogout = () => {
    Cookies.remove('loggedIn');
    window.location.reload();
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div>
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

            <div style={{ marginTop: 40 }}>
              <GuidePassageBoxFAB
                size="medium"
                variant="extended"
                color="primary"
                onClick={() => Router.push('/bible')}
              >
                Kembali Baca
              </GuidePassageBoxFAB>
              <GuidePassageBoxFAB
                size="medium"
                variant="extended"
                color="secondary"
                style={{ marginTop: 20 }}
                onClick={this.handleLogout}
              >
                Keluar
              </GuidePassageBoxFAB>
            </div>
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
