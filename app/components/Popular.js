import React from "react";

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
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
    return (
      <ul className="languages">
        {languages.map(lang => {
          const selectedClass = lang === this.state.selectedLanguage ? "selected" : "";
          return (
            <li className={selectedClass}
                key={lang} 
                onClick={() => this.updateLanguage(lang)}>{lang}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Popular;