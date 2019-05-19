/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { auth } from '../utils/auth';
import {
  Container,
  HeaderTitle,
  HeaderSubtitle,
  StyledCard,
  BoldText,
  LightText
} from '../components/StyledBase';
import {
  GuidePassageBox,
  GuidePassageBoxText,
  GuidePassageBoxFAB
} from '../components/StyledHome';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import 'moment/locale/id';

import { fetchCurrentUser, fetchTodayGuide } from '../store';

class Index extends Component {
  static async getInitialProps(ctx) {
    const loggedIn = auth(ctx);

    return { loggedIn };
  }

  componentWillMount = () => {
    this.props.fetchCurrentUser();
    this.props.fetchTodayGuide();
  };

  componentDidMount = () => {
    if (this.props.status === 401) {
      Cookies.remove('loggedIn');
      window.location.reload();
    }
  };

  toBible = () => Router.push('/bible');

  render() {
    const { guideToday } = this.props;

    return (
      <div>
        <Container>
          <HeaderTitle marginTop="110px">Freedom Life</HeaderTitle>
          <HeaderSubtitle>Aplikasi panduan baca Alkitab setahun</HeaderSubtitle>

          <div style={{ marginTop: 40 }}>
            <StyledCard>
              <CardContent>
                <BoldText variant="h5" myfontsize="20pt" myprimary="true">
                  Panduan Hari Ini
                </BoldText>
                <LightText
                  variant="subtitle1"
                  mylineheight="1.2"
                  myprimary="true"
                >
                  {moment().format('dddd, LL')}
                </LightText>

                <br />
                {['PL', 'PB1', 'PB2'].map(item => (
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    key={item}
                    spacing={16}
                  >
                    <Grid item xs={3} sm={2} md={2}>
                      <GuidePassageBox>
                        <GuidePassageBoxText>{item}</GuidePassageBoxText>
                      </GuidePassageBox>
                    </Grid>
                    <Grid item xs={9} sm={10} md={10}>
                      <BoldText variant="h6" myfontsize="17px" myprimary="true">
                        {item === 'PL'
                          ? 'Perjanjian Lama'
                          : item === 'PB1'
                          ? 'Perjanjian Baru 1'
                          : item === 'PB2'
                          ? 'Perjanjian Baru 2'
                          : ''}
                      </BoldText>
                      <LightText
                        variant="subtitle1"
                        myfontsize="15px"
                        myprimary="true"
                      >
                        {item === 'PL'
                          ? guideToday.pl_name
                          : item === 'PB1'
                          ? guideToday.pb1_name
                          : item === 'PB2'
                          ? guideToday.pb2_name
                          : 'Tidak ada data'}
                      </LightText>
                    </Grid>
                  </Grid>
                ))}

                <br />
                <GuidePassageBoxFAB
                  size="small"
                  variant="extended"
                  color="primary"
                  disabled={
                    guideToday.pl === undefined &&
                    guideToday.pb1 === undefined &&
                    guideToday.pb2 === undefined
                  }
                  onClick={this.toBible}
                >
                  Baca
                </GuidePassageBoxFAB>
              </CardContent>
            </StyledCard>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { status: state.status, guideToday: state.guideToday };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    fetchTodayGuide: () => dispatch(fetchTodayGuide())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
