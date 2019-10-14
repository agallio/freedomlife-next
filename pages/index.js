/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import 'moment/locale/id';

import { fetchTodayGuide } from '../store';

class Index extends Component {
  state = {
    loading: true,
    maintenance: true
  };

  componentDidMount = () => {
    if (this.state.maintenance) {
      Router.push('/maintenance');
    }
    this.props.fetchTodayGuide().then(() => this.setState({ loading: false }));
  };

  toBible = () => Router.push('/bible');

  render() {
    const { guideToday } = this.props;

    return (
      <div>
        {this.state.loading && <LinearProgress color="secondary" />}
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
                      {this.state.loading ? (
                        <LinearProgress />
                      ) : (
                        <BoldText
                          variant="h6"
                          myfontsize="17px"
                          myprimary="true"
                        >
                          {item === 'PL'
                            ? guideToday.pl_name
                            : item === 'PB1'
                            ? guideToday.pb1_name
                            : item === 'PB2'
                            ? guideToday.pb2_name
                            : 'Tidak ada data'}
                        </BoldText>
                      )}
                      <LightText
                        variant="subtitle1"
                        myfontsize="15px"
                        myprimary="true"
                      >
                        {item === 'PL'
                          ? 'Perjanjian Lama'
                          : item === 'PB1'
                          ? 'Perjanjian Baru 1'
                          : item === 'PB2'
                          ? 'Perjanjian Baru 2'
                          : ''}
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
  return { guideToday: state.guideToday };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodayGuide: () => dispatch(fetchTodayGuide())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
