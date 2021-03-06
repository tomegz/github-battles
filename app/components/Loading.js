import React from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    textAlign: "center",
    fontSize: "35px"
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    }
  }
  componentDidMount() {
    const props = this.props;
    const stopper = `${props.text}...`;
    this.interval = window.setInterval(function() {
      if(this.state.text === stopper) {
        this.setState(() => ({ text: props.text }));
      } else {
        this.setState((prevState) => ({ text: prevState.text + "." }));
      }
    }.bind(this), props.speed);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: "Loading",
  speed: 200
}

export default Loading;