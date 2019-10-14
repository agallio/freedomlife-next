import React from 'react';
import { HeaderTitle, HeaderSubtitle } from '../components/StyledBase';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <div>
        {this.props.statusCode ? (
          <div>
            <HeaderTitle marginTop="110px">{this.props.statusCode}</HeaderTitle>
            <HeaderSubtitle>An error occurred on server</HeaderSubtitle>
          </div>
        ) : (
          <div>
            <HeaderTitle marginTop="110px">Error</HeaderTitle>
            <HeaderSubtitle>An error occurred on Client</HeaderSubtitle>
          </div>
        )}
      </div>
    );
  }
}

export default Error;
