import React, { Component } from 'react';
import Router from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import ChevronBackIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronNextIcon from '@material-ui/icons/ChevronRightRounded';
import HighlightIcon from '@material-ui/icons/ColorizeRounded';

class BibleLayout extends Component {
  render() {
    const {
      guideToday,
      passage,
      // highlighted,
      backPassage,
      nextPassage
      // clearSelected
      // openModal
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
      <AppBar
        position="fixed"
        style={{
          flexGrow: 1,
          transition: '.3s ease',
          boxShadow: 'none'
        }}
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
                ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[0]}`
                : `${plSpaceSplit[0]} ${list[0]}`
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
    );
  }
}

export default BibleLayout;
