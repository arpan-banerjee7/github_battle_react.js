import React from "react";
function LangaugesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "Css", "Python"];
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            onClick={() => {
              console.log(this);
              onUpdateLanguage(language);
            }}
            className="btn-clear nav-link"
            style={
              language === selected ? { color: "rgb(187, 46, 37) " } : null
            }
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}
export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.displaythis = this.displaythis.bind(this);
  }
  displaythis() {
    console.log(this);
  }

  updateLanguage(selectedLanguage) {
    console.log(this);
    this.setState({
      selectedLanguage,
    });
  }
  render() {
    const { selectedLanguage } = this.state;

    return (
      <React.Fragment>
        <LangaugesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        ></LangaugesNav>
      </React.Fragment>
    );
  }
}
