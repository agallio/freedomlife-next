import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import { fetchGuideByMonth } from '../store';

class Guide extends Component {
  state = {
    loading: true
  };

  componentDidMount = () => {
    this.props
      .fetchGuideByMonth(moment().format('MM'), moment().format('YYYY'))
      .then(() => this.setState({ loading: false }));
  };

  render() {
    const { guideByMonth } = this.props;

    return (
      <Fade in>
        <div>
          {this.state.loading && <LinearProgress color="secondary" />}
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
                        <GuideBox
                          today={moment().format('DD-MM-YYYY') === item.date}
                        >
                          <GuideBoxDayText
                            today={moment().format('DD-MM-YYYY') === item.date}
                          >
                            {moment(item.date, 'DD-MM-YYYY').format('dddd')}
                          </GuideBoxDayText>
                          <GuideBoxDateText
                            today={moment().format('DD-MM-YYYY') === item.date}
                          >
                            {item.date.split('-')[0]}
                          </GuideBoxDateText>
                        </GuideBox>
                      </Grid>
                      <Grid item sm={8} md={8}>
                        <GuideBoxPassageText
                          today={moment().format('DD-MM-YYYY') === item.date}
                        >
                          {item.pl_name}
                        </GuideBoxPassageText>
                        <GuideBoxPassageText
                          today={moment().format('DD-MM-YYYY') === item.date}
                        >
                          {item.pb1_name}
                        </GuideBoxPassageText>
                        <GuideBoxPassageText
                          today={moment().format('DD-MM-YYYY') === item.date}
                        >
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
    fetchGuideByMonth: (month, year) => dispatch(fetchGuideByMonth(month, year))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Guide);
