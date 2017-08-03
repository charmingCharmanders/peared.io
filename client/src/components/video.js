import React from 'react';

class Video extends React.Component {
  constructor(props) {
    super(props);
  }

  renderIframe() {
    const hostname = window.location.hostname;
    if (hostname === '127.0.0.1' || hostname === 'localhost') {
      return <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=f9ef23c6-1579-4b77-9f1f-8380c10fcbc0&room=${this.props.roomId}&iframe=true`} frameBorder='0'></iframe>;
    } else {
      return <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=4808bf20-edc1-4fdd-8d6c-358c7c73c64a&room=${this.props.roomId}&iframe=true`} frameBorder='0'></iframe>;
    }
  }

  render() {
    return (
      <div className="video-container">
        <div className="video-wrapper">
          {this.renderIframe()}
        </div>
      </div>
    );
  }
}

export default Video;
