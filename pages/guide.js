import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { auth } from '../utils/auth';
import {
  Container,
  ContainerFluid,
  HeaderTitle,
  HeaderSubtitle,
  StyledFluidCard
} from '../components/StyledBase';
import {
  GuideBox,
  GuideBoxDayText,
  GuideBoxDateText,
  GuideBoxPassageText
} from '../components/StyledGuide';
import Fade from '@material-ui/core/Fade';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import 'moment/locale/id';

import { fetchCurrentUser, fetchGuideByMonth } from '../store';

class Guide extends Component {
  static async getInitialProps(ctx) {
    const loggedIn = auth(ctx);

    return { loggedIn };
  }

  state = {
    loading: true
  };

  componentWillMount = () => {
    this.props.fetchCurrentUser();
  };

  componentDidMount = () => {
    if (this.props.status === 401) {
      Cookies.remove('loggedIn');
      window.location.reload();
    }

    this.props
      .fetchGuideByMonth(moment().format('MM'), moment().format('YYYY'))
      .then(() => this.setState({ loading: false }));
  };

  render() {
    const { guideByMonth } = this.props;

    // console.log(guideByMonth);

    return (
      <Fade in>
        <div>
          <Container mypaddingbottom="30px">
            <HeaderTitle marginTop="70px">
              Panduan Baca
              <br /> Bulan Ini
            </HeaderTitle>
            <HeaderSubtitle>
              {moment().format('MMMM')} {moment().format('YYYY')}
            </HeaderSubtitle>
          </Container>
          <ContainerFluid mypaddingbottom="50px">
            <StyledFluidCard>
              <CardContent
                style={{
                  padding: '16px 10%',
                  height: this.state.loading && '80vh',
                  textAlign: this.state.loading && 'center',
                  paddingTop: this.state.loading && '20vh'
                }}
              >
                {this.state.loading ? (
                  <CircularProgress />
                ) : (
                  guideByMonth.map((item, index) => (
                    <Grid
                      key={index}
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                      spacing={16}
                    >
                      <Grid item sm={4} md={4}>
                        <GuideBox>
                          <GuideBoxDayText>{item.day}</GuideBoxDayText>
                          <GuideBoxDateText>
                            {item.date.split('-')[0]}
                          </GuideBoxDateText>
                        </GuideBox>
                      </Grid>
                      <Grid item sm={8} md={8}>
                        <GuideBoxPassageText>
                          {item.pl_name}
                        </GuideBoxPassageText>
                        <GuideBoxPassageText>
                          {item.pb1_name}
                        </GuideBoxPassageText>
                        <GuideBoxPassageText>
                          {item.pb2_name}
                        </GuideBoxPassageText>
                      </Grid>
                    </Grid>
                  ))
                )}
              </CardContent>
            </StyledFluidCard>
          </ContainerFluid>
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = state => {
  return { guideByMonth: state.guideByMonth };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    fetchGuideByMonth: (month, year) => dispatch(fetchGuideByMonth(month, year))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guide);
