import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { auth } from '../utils/auth';
import { ContainerBible, BoldText, LightText } from '../components/StyledBase';
import BibleLayout from '../components/BibleLayout';
import Loading from '../components/Loading';
import { removeArrayItem, removeArrayObject } from '../utils/array';

import {
  fetchCurrentUser,
  fetchChapter,
  fetchChapterExclude,
  fetchTodayGuide,
  createHighlight
} from '../store';

class Bible extends Component {
  // static async getInitialProps(ctx) {
  //   const loggedIn = auth(ctx);

  //   return { loggedIn };
  // }

  state = {
    loading: true,
    passage: 'pl-1',
    todayChapters: [],
    highlighted: [],
    highlightedData: [],
    modalLogin: false
  };

  componentWillMount = () => {
    this.props.fetchCurrentUser();
  };

  componentDidMount = () => {
    if (this.props.status === 401) {
      Cookies.remove('loggedIn');
      window.location.reload();
    }

    this.props.fetchTodayGuide().then(() => {
      const { guideToday } = this.props;
      const { pl, pb1, pb2 } = guideToday;

      const plSpaceSplit = pl.split(' ');
      const pb1SpaceSplit = pb1.split(' ');
      const pb2SpaceSplit = pb2.split(' ');

      let plDashSplit;
      let pb1DashSplit;
      let pb2DashSplit;

      let currState = this.state.todayChapters;
      let i;

      // PL
      plDashSplit = plSpaceSplit[1].split('-');
      if (plDashSplit.length > 1) {
        let list = [];
        for (i = Number(plDashSplit[0]); i <= plDashSplit[1]; i++) {
          list.push(i);
        }
        if (list.length === 3) {
          list.map((item, index) =>
            this.props.fetchChapter('tb', plSpaceSplit[0], item).then(() => {
              currState.push({
                value: `pl-${index + 1}`,
                data: this.props.chapters
              });
              this.setState({ currState });
            })
          );
        } else {
          plDashSplit.map((item, index) =>
            this.props.fetchChapter('tb', plSpaceSplit[0], item).then(() => {
              currState.push({
                value: `pl-${index + 1}`,
                data: this.props.chapters
              });
              this.setState({ currState });
            })
          );
        }
      } else {
        this.props
          .fetchChapter('tb', plSpaceSplit[0], plSpaceSplit[1])
          .then(() => {
            currState.push({
              value: `pl-1`,
              data: this.props.chapters
            });
            this.setState({ currState });
          });
      }

      // PB1
      pb1DashSplit = pb1SpaceSplit[1].split('-');
      if (pb1DashSplit.length > 1) {
        let list = [];
        for (i = pb1DashSplit[0]; i <= pb1DashSplit[1]; i++) {
          list.push(i);
        }

        list.map((item, index) =>
          this.props.fetchChapter('tb', pb1SpaceSplit[0], item).then(() => {
            currState.push({
              value: `pb1-${index + 1}`,
              data: this.props.chapters
            });
            this.setState({ currState });
          })
        );
      } else {
        this.props
          .fetchChapter('tb', pb1SpaceSplit[0], pb1SpaceSplit[1])
          .then(() => {
            currState.push({
              value: `pb1`,
              data: this.props.chapters
            });
            this.setState({ currState });
          });
      }

      // PB2
      if (pb2SpaceSplit[0] === 'kis' || pb2SpaceSplit[0] === 'why') {
        let pb2ColonSplit = pb2SpaceSplit[1].split(':');
        if (pb2ColonSplit.length > 1) {
          pb2DashSplit = pb2ColonSplit[1].split('-');
          this.props
            .fetchChapterExclude(
              'tb',
              pb2SpaceSplit[0],
              pb2ColonSplit[0],
              pb2DashSplit[0],
              pb2DashSplit[1]
            )
            .then(() => {
              currState.push({ value: 'pb2', data: this.props.chapters });
              this.setState({ currState, loading: false });
            });
        } else {
          this.props
            .fetchChapter('tb', pb2SpaceSplit[0], pb2ColonSplit[0])
            .then(() => {
              currState.push({ value: 'pb2', data: this.props.chapters });
              this.setState({ currState, loading: false });
            });
        }
      } else {
        this.props
          .fetchChapter('tb', pb2SpaceSplit[0], pb2SpaceSplit[1])
          .then(() => {
            currState.push({
              value: `pb2`,
              data: this.props.chapters
            });
            this.setState({ currState, loading: false });
          });
      }
    });
  };

  backPassage = () => {
    const whatPassage = [];
    this.state.todayChapters.map(item => whatPassage.push(item.value));
    whatPassage.forEach(item => {
      if (this.state.passage === 'pl-2' && item.includes(this.state.passage)) {
        this.setState({ passage: 'pl-1' });
      } else if (
        this.state.passage === 'pl-3' &&
        item.includes(this.state.passage)
      ) {
        this.setState({ passage: 'pl-2' });
      } else if (
        this.state.passage === 'pb1' &&
        item.includes(this.state.passage)
      ) {
        if (whatPassage.includes('pl-3')) {
          this.setState({ passage: 'pl-3' });
        } else if (whatPassage.includes('pl-2')) {
          this.setState({ passage: 'pl-2' });
        } else {
          this.setState({ passage: 'pl-1' });
        }
      } else if (
        this.state.passage === 'pb2' &&
        item.includes(this.state.passage)
      ) {
        this.setState({ passage: 'pb1' });
      }
    });
  };

  nextPassage = () => {
    const whatPassage = [];
    this.state.todayChapters.map(item => whatPassage.push(item.value));
    whatPassage.forEach(item => {
      if (this.state.passage === 'pl-1' && item.includes(this.state.passage)) {
        this.setState({ passage: 'pl-2' });
      } else if (
        this.state.passage === 'pl-2' &&
        item.includes(this.state.passage)
      ) {
        if (whatPassage.includes('pl-3')) {
          this.setState({ passage: 'pl-3' });
        } else {
          this.setState({ passage: 'pb1' });
        }
      } else if (
        this.state.passage === 'pl-3' &&
        item.includes(this.state.passage)
      ) {
        this.setState({ passage: 'pb1' });
      } else if (
        this.state.passage === 'pb1' &&
        item.includes(this.state.passage)
      ) {
        this.setState({ passage: 'pb2' });
      }
    });
  };

  onSelect = (verse, verse_content, index) => {
    let currState = this.state.highlighted;
    let currData = this.state.highlightedData;
    const { guideToday } = this.props;
    const { passage } = this.state;

    const plSpaceSplit = guideToday.pl_name.split(' ');
    const pb1SpaceSplit = guideToday.pb1_name.split(' ');
    const pb2SpaceSplit = guideToday.pb2_name.split(' ');
    const plDashSplit =
      plSpaceSplit.length === 3
        ? plSpaceSplit[2].split('-')
        : plSpaceSplit[1].split('-');
    let list = [];
    for (var i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
      list.push(i);
    }

    if (currState.includes(verse)) {
      removeArrayItem(currState, verse);
      removeArrayObject(currData, verse);
    } else {
      currState.push(verse);
      if (passage === 'pl-1') {
        if (plSpaceSplit.length === 3) {
          currData.push({
            passage: `${plSpaceSplit[0]} ${plSpaceSplit[1]}`,
            chapter: list[0],
            verse: verse,
            verse_content: verse_content
          });
        } else {
          currData.push({
            passage: plSpaceSplit[0],
            chapter: list[0],
            verse: verse,
            verse_content: verse_content
          });
        }
      } else if (passage === 'pl-2') {
        if (plSpaceSplit.length === 3) {
          currData.push({
            passage: `${plSpaceSplit[0]} ${plSpaceSplit[1]}`,
            chapter: list[1],
            verse: verse,
            verse_content: verse_content
          });
        } else {
          currData.push({
            passage: plSpaceSplit[0],
            chapter: list[1],
            verse: verse,
            verse_content: verse_content
          });
        }
      } else if (passage === 'pl-3') {
        if (plSpaceSplit.length === 3) {
          currData.push({
            passage: `${plSpaceSplit[0]} ${plSpaceSplit[1]}`,
            chapter: list[2],
            verse: verse,
            verse_content: verse_content
          });
        } else {
          currData.push({
            passage: plSpaceSplit[0],
            chapter: list[2],
            verse: verse,
            verse_content: verse_content
          });
        }
      } else if (passage === 'pb1') {
        if (pb1SpaceSplit.length === 3) {
          currData.push({
            passage: `${pb1SpaceSplit[0]} ${pb1SpaceSplit[1]}`,
            chapter: pb1SpaceSplit[2],
            verse: verse,
            verse_content: verse_content
          });
        } else {
          currData.push({
            passage: pb1SpaceSplit[0],
            chapter: pb1SpaceSplit[1],
            verse: verse,
            verse_content: verse_content
          });
        }
      } else if (passage === 'pb2') {
        if (pb2SpaceSplit.length === 3) {
          currData.push({
            passage: `${pb2SpaceSplit[0]} ${pb2SpaceSplit[1]}`,
            chapter: pb2SpaceSplit[2],
            verse: verse,
            verse_content: verse_content
          });
        } else {
          currData.push({
            passage: pb2SpaceSplit[0],
            chapter: pb2SpaceSplit[1],
            verse: verse,
            verse_content: verse_content
          });
        }
      }
    }
    this.setState({ currState, currData });
  };

  clearSelected = () => this.setState({ highlighted: [], highlightedData: [] });

  toggleModal = (name, value) => this.setState({ [name]: value });

  onHighlight = () => {
    // this.state.highlightedData.map(item => this.props.createHighlight(item)).then(() => )
  };

  render() {
    // console.log(this.state.highlighted, this.state.highlightedData);
    // console.log(this.state.todayChapters);

    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div style={{ backgroundColor: '#351d5f' }}>
        <BibleLayout
          passage={this.state.passage}
          highlighted={this.state.highlighted}
          backPassage={this.backPassage}
          nextPassage={this.nextPassage}
          clearSelected={this.clearSelected}
          modalLogin={this.state.modalLogin}
          toggleModal={this.toggleModal}
          onHighlight={this.onHighlight}
          {...this.props}
        />
        <ContainerBible>
          {this.state.todayChapters
            .filter(i => i.value === this.state.passage)
            .map(item =>
              item.data.map((data, index) => {
                if (data.type === 'title') {
                  return (
                    <BoldText
                      key={index}
                      myfontsize="16px"
                      style={{
                        textAlign: 'center',
                        marginBottom: 10,
                        marginTop: 10,
                        padding: '0 10px'
                      }}
                      mycolor="white"
                    >
                      {data.content}
                    </BoldText>
                  );
                } else {
                  return (
                    <LightText
                      key={index}
                      myfontsize="16px"
                      mycolor="white"
                      // onClick={() =>
                      //   this.onSelect(data.verse, data.content, index)
                      // }
                      // mycolor={
                      //   highlighted !== undefined &&
                      //   highlighted.includes(data.verse)
                      //     ? '#fff'
                      //     : undefined
                      // }
                      style={{
                        padding: '0 10px'
                        // backgroundColor:
                        //   this.state.highlighted !== undefined &&
                        //   this.state.highlighted.includes(data.verse)
                        //     ? '#673ab7'
                        //     : undefined
                      }}
                    >
                      <sup
                        style={{
                          fontSize: 10,
                          marginRight: 15,
                          color: '#ffa726'
                          // color:
                          //   highlighted !== undefined &&
                          //   highlighted.includes(data.verse)
                          //     ? '#fff'
                          //     : '#673ab7'
                        }}
                      >
                        {data.verse}
                      </sup>
                      {data.content}
                    </LightText>
                  );
                }
              })
            )}
        </ContainerBible>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { guideToday: state.guideToday, chapters: state.chapters };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    fetchTodayGuide: () => dispatch(fetchTodayGuide()),
    fetchChapter: (ver, book, chap) => dispatch(fetchChapter(ver, book, chap)),
    fetchChapterExclude: (ver, book, chap, min, max) =>
      dispatch(fetchChapterExclude(ver, book, chap, min, max)),
    createHighlight: data => dispatch(createHighlight(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bible);
