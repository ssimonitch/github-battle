const React = require('react');
const PropTypes = require('prop-types');

const api = require('../utils/api');
const Loading = require('./Loading');

// RENDERS LIST OF LANGUAGES
function SelectLanguage (props) {
  let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang => {
        return <li
          style={lang === props.selectedLanguage ? { color: '#d0021b'} : null}
          onClick={props.onSelect.bind(null, lang)}
          key={lang}>
          {lang}
        </li>
      })}
    </ul>
  )
}

// RENDERS REPO GRID
function RepoGrid (props) {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

// CHECK PROP TYPES
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

// POPULAR CONTAINER
class Popular extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };

    // binds the `this` keyword of `updateLanguage()` to the keyword passed in
    // now `updateLanguage` will always be called with the correct `this` keyword
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(repos => this.setState(() => {
        return {
          repos: repos
        }
      }));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

module.exports = Popular;
