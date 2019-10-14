/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { CardContent, Fade } from '@material-ui/core';
import {
  Container,
  HeaderTitle,
  HeaderSubtitle,
  StyledCard,
  BoldText,
  LightText
} from '../components/StyledBase';
import {
  JumboHeader,
  JumboHeaderOverlay,
  GuidePassageBoxFAB
} from '../components/StyledHome';

class Login extends React.Component {
  constructor(props) {
    super(props);
    Cookies.remove('loggedIn');
  }

  handleLogin = () => {
    Cookies.set('loggedIn', true);
    Router.push('/');
  };

  render() {
    return (
      <div>
        <Container>
          <HeaderTitle marginTop="110px">Freedom Life</HeaderTitle>
          <HeaderSubtitle>Aplikasi panduan baca Alkitab setahun</HeaderSubtitle>
          <div style={{ marginTop: 40 }}>
            <StyledCard>
              <CardContent>
                <BoldText variant="h5" myfontsize="20pt" myprimary="true">
                  Masuk
                </BoldText>
                <LightText
                  variant="subtitle1"
                  mylineheight="1.2"
                  myprimary="true"
                >
                  Silakan masuk terlebih dahulu
                </LightText>
                <br />
                <GuidePassageBoxFAB
                  size="small"
                  variant="extended"
                  color="secondary"
                  component="a"
                  href={`http://api-freedomlife.herokuapp.com/api/auth/google`}
                  onClick={this.handleLogin}
                >
                  <i className="fab fa-google" style={{ marginRight: 10 }} />
                  Masuk dengan Google
                </GuidePassageBoxFAB>
                {/* <GuidePassageBoxFAB
                    size="small"
                    variant="extended"
                    component="a"
                    href="//localhost:4000/api/auth/facebook"
                    mymargin="20px 0 0 0"
                    mybackcolor="#3b5998"
                    mycolor="#fff"
                    onClick={this.loggedIn}
                  >
                    <i
                      className="fab fa-facebook-f"
                      style={{ marginRight: 10 }}
                    />
                    Masuk dengan Facebook
                  </GuidePassageBoxFAB> */}
              </CardContent>
            </StyledCard>
          </div>
        </Container>
      </div>
    );
  }
}

export default Login;
