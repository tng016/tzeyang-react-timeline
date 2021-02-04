import React from "react";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: false,
      toggle: false
    };
    this.rotatingDone = this.rotatingDone.bind(this);
  }
  componentDidMount() {
    const elm = this.image;
    elm.addEventListener("animationend", this.rotatingDone);
  }
  componentWillUnmount() {
    const elm = this.image;
    elm.removeEventListener("animationend", this.rotatingDone);
  }

  rotatingDone() {
    this.setState(function(state) {
      return {
        toggle: !state.toggle,
        rotate: false
      };
    });
  }
  render() {
    const { rotate, toggle } = this.state;

    return (
      <img
        src={
          toggle
            ? "https://video-react.js.org/assets/logo.png"
            : "https://www.shareicon.net/data/128x128/2016/08/01/640324_logo_512x512.png"
        }
        ref={elm => {
          this.image = elm;
        }}
        onClick={() => this.setState({ rotate: true })}
        className={rotate ? "rotate" : ""}
      />
    );
  }
}

ReactDOM.render(<Image />, document.getElementById("container"));
