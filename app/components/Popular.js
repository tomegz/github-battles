import React from "react";

class Popular extends React.Component {
  constructor() {
    super();
  }
  render() {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"]
    return (
      <ul className="languages">
        {languages.map(language => <li>{language}</li> )}
      </ul>
    );
  }
}

export default Popular;