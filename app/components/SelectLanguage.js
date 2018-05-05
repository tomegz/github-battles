import React from "react";
import PropTypes from "prop-types";

const SelectLanguage = (props) => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="languages">
      {languages.map(lang => {
        const selectedClass = lang === props.selectedLanguage ? "selected" : "";
        return (
          <li className={selectedClass}
              key={lang} 
              onClick={() => props.onSelect(lang)}>{lang}
          </li>
        );
      })}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default SelectLanguage;