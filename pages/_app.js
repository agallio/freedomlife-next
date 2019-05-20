import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import nextCookie from 'next-cookies';

import Fade from '@material-ui/core/Fade';
import HomeIcon from '@material-ui/icons/HomeRounded';
import BookIcon from '@material-ui/icons/BookRounded';
import PersonIcon from '@material-ui/icons/PersonRounded';

import {
  StyledBottomNav,
  StyledBottomNavAction
} from '../components/StyledBase';
import { JumboHeader, JumboHeaderOverlay } from '../components/StyledHome';
import { initStore } from '../store';
import getPageContext from '../src/getPageContext';
import '../styles/fonts.scss';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();

    this.state = {
      path: props.pathname
    };
  }

  static async getInitialProps({ Component, ctx }) {
    const { loggedIn } = nextCookie(ctx);
    const pathname = ctx.pathname;
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
      loggedIn,
      pathname
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  navOnChange = (e, value) => {
    this.setState({ path: value });
    Router.push(`${value}`);
  };

  render() {
    const { Component, pageProps, store } = this.props;
    const { path } = this.state;
    const locSplit = path.split('/');

    return (
      <Container>
        <Head>
          <title>FreedomLife</title>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossOrigin="anonymous"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <Provider store={store}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
              <Fade in>
                {this.props.pathname === '/bible' ? (
                  <Component pageContext={this.pageContext} {...pageProps} />
                ) : (
                  <JumboHeader>
                    <JumboHeaderOverlay />
                    <Component pageContext={this.pageContext} {...pageProps} />

                    {pageProps.loggedIn !== undefined && pageProps.loggedIn && (
                      <StyledBottomNav
                        value={`/${locSplit[1]}`}
                        onChange={this.navOnChange}
                      >
                        <StyledBottomNavAction
                          label="Panduan"
                          value="/guide"
                          icon={<BookIcon />}
                        />
                        <StyledBottomNavAction
                          label="Beranda"
                          value="/"
                          icon={<HomeIcon />}
                        />
                        <StyledBottomNavAction
                          label="Akun"
                          value="/account"
                          icon={<PersonIcon />}
                        />
                      </StyledBottomNav>
                    )}
                  </JumboHeader>
                )}
              </Fade>
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
