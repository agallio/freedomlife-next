import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContainerBible, BoldText, LightText } from '../components/StyledBase';
import BibleLayout from '../components/BibleLayout';
import Loading from '../components/Loading';

import { fetchChapter, fetchChapterExclude, fetchTodayGuide } from '../store';

class Bible extends Component {
  state = {
    loading: true,
    passage: 'pl-1',
    todayChapters: [],
    highlighted: [],
    highlightedData: []
  };

  componentDidMount = () => {
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
        if (plDashSplit.length === 3) {
          let list = [];
          for (i = plDashSplit[0]; i <= plDashSplit[1]; i++) {
            list.push(i);
            list.map((item, index) =>
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
      if (pb2SpaceSplit[0] === 'kis') {
        let pb2ColonSplit = pb2SpaceSplit[1].split(':');
        if (pb2ColonSplit.length > 1) {
          pb2DashSplit = pb2ColonSplit[0].split('-');
          this.props
            .fetchChapterExclude(
              'tb',
              'Kis',
              pb2ColonSplit[0],
              pb2DashSplit[0],
              pb2DashSplit[1]
            )
            .then(() => {
              currState.push({ value: 'pb2', data: this.props.chapters });
              this.setState({ currState, loading: false });
            });
        } else {
          this.props.fetchChapter('tb', 'Kis', pb2ColonSplit[0]).then(() => {
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

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div style={{ backgroundColor: '#351d5f' }}>
        <BibleLayout
          passage={this.state.passage}
          // highlighted={this.state.highlighted}
          backPassage={this.backPassage}
          nextPassage={this.nextPassage}
          // clearSelected={this.clearSelected}
          // openModal={this.openModal}
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
                        marginTop: 10
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
                      myfontsize="15px"
                      mycolor="white"
                      // onClick={() => onSelect(data.verse, data.content, index)}
                      // mycolor={
                      //   highlighted !== undefined &&
                      //   highlighted.includes(data.verse)
                      //     ? '#fff'
                      //     : undefined
                      // }
                      // style={{
                      //   backgroundColor:
                      //     highlighted !== undefined &&
                      //     highlighted.includes(data.verse)
                      //       ? '#673ab7'
                      //       : undefined
                      // }}
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
    fetchTodayGuide: () => dispatch(fetchTodayGuide()),
    fetchChapter: (ver, book, chap) => dispatch(fetchChapter(ver, book, chap)),
    fetchChapterExclude: (ver, book, chap, min, max) =>
      dispatch(fetchChapterExclude(ver, book, chap, min, max))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bible);
