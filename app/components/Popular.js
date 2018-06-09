import React from "react";
import PropTypes from "prop-types";
import SelectLanguage from "./SelectLanguage";
import RepoGrid from "./RepoGrid";
import { fetchPopularRepos } from "../utils/api";
import Loading from "./Loading";

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
      return { selectedLanguage: lang, repos: null };
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
        {!this.state.repos ? <Loading /> : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}

export default Popular;