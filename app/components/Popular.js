import React from "react";
import PropTypes from "prop-types";
import SelectLanguage from "./SelectLanguage";

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.state = {
      selectedLanguage: "All"
    };
  }
  updateLanguage(lang) {
    this.setState(() => { 
      return { selectedLanguage: lang };
    });
  }
  render() {
    return (
      <div>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage}
                        onSelect={this.updateLanguage} />
      </div>
    );
  }
}

export default Popular;