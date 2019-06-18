import React, { Component } from 'react';
import Router from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import ChevronBackIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronNextIcon from '@material-ui/icons/ChevronRightRounded';
// import HighlightIcon from '@material-ui/icons/ColorizeRounded';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Cookies from 'js-cookie';

class BibleLayout extends Component {
  render() {
    const {
      guideToday,
      passage,
      // highlighted,
      backPassage,
      nextPassage
      // clearSelected,
      // toggleModal,
      // modalLogin,
      // onHighlight
    } = this.props;

    const plSpaceSplit = guideToday.pl_name.split(' ');
    const plDashSplit =
      plSpaceSplit.length === 3
        ? plSpaceSplit[2].split('-')
        : plSpaceSplit[1].split('-');
    let list = [];
    for (var i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
      list.push(i);
    }

    return (
      <div>
        {/* {highlighted.length > 0 ? (
          <AppBar
            position="fixed"
            style={{
              flexGrow: 1,
              backgroundColor: '#8e62db',
              transition: '.3s ease',
              boxShadow: 'none'
            }}
          >
            <Toolbar style={{ margin: '0 auto', width: 340 }}>
              <IconButton
                color="inherit"
                aria-label="Home"
                style={{
                  marginLeft: -10,
                  marginRight: 20
                }}
                onClick={clearSelected}
              >
                <BackIcon />
              </IconButton>
              <div style={{ flexGrow: 1 }} />
              {Cookies.get('loggedIn') ? (
                <IconButton
                  color="inherit"
                  aria-label="Highlight"
                  onClick={onHighlight}
                >
                  <HighlightIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="Highlight"
                  onClick={() => toggleModal('modalLogin', true)}
                >
                  <HighlightIcon />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
        ) : ( */}
        <AppBar
          position="fixed"
          style={{ flexGrow: 1, transition: '.3s ease', boxShadow: 'none' }}
        >
          <Toolbar style={{ margin: '0 auto' }}>
            <IconButton
              color="inherit"
              aria-label="Home"
              onClick={() => Router.push('/')}
              style={{ marginLeft: -10 }}
            >
              <BackIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Back" onClick={backPassage}>
              <ChevronBackIcon />
            </IconButton>
            <Button
              style={{
                fontFamily: 'SF Text',
                fontWeight: 700,
                width: 180,
                color: 'white'
              }}
            >
              {passage === 'pl-1'
                ? plSpaceSplit.length === 3
                  ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                      list.length === 0 ? plSpaceSplit[2] : list[0]
                    }`
                  : `${plSpaceSplit[0]} ${
                      list.length === 0 ? plSpaceSplit[1] : list[0]
                    }`
                : passage === 'pl-2'
                ? plSpaceSplit.length === 3
                  ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[1]}`
                  : `${plSpaceSplit[0]} ${list[1]}`
                : passage === 'pl-3'
                ? plSpaceSplit.length === 3
                  ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[2]}`
                  : `${plSpaceSplit[0]} ${list[2]}`
                : passage === 'pb1'
                ? guideToday.pb1_name
                : passage === 'pb2'
                ? guideToday.pb2_name
                : ''}
            </Button>
            <IconButton color="inherit" aria-label="Next" onClick={nextPassage}>
              <ChevronNextIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* )} */}

        {/* Modal Login */}
        {/* <Dialog
          open={modalLogin}
          onClose={() => toggleModal('modalLogin', false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Masuk</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Anda belum masuk ke aplikasi, data marka Anda hanya tersimpan jika
              Anda masuk ke aplikasi
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => toggleModal('modalLogin', false)}
              color="primary"
            >
              Batalkan
            </Button>
            <Button
              component="a"
              href={`http://localhost:4000/api/auth/google`}
              color="primary"
              onClick={() => {
                toggleModal('modalLogin', false);
                Cookies.set('loggedIn', true);
              }}
              autoFocus
            >
              Masuk
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    );
  }
}

export default BibleLayout;
