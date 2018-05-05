import React from "react";
import PropTypes from "prop-types";
import SelectLanguage from "./SelectLanguage";
import { fetchPopularRepos } from "../utils/api";
class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.state = {
      selectedLanguage: "All",
      repos: null
    };
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(lang) {
    this.setState(() => { 
      return { selectedLanguage: lang };
    });
    fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => {
          return { repos };
        });
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