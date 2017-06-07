const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;

const PlayerPreview = require('./PlayerPreview');

// PLAYER INPUT COMPONENT
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;

    this.setState(() => {
      return {
        username: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }
  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

// PlayerInput.defaultProps = {
//   label: 'Username',
// }

// MAIN COMPONENT
class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(() => {
      let newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = `http://github.com/${username}.png?size=200`;
      return newState;
    });
  }

  handleReset(id) {
    this.setState(() => {
      let newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }

  render() {
    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        {/* Have UI dynamically render depending on state */}
        <div className="row">
          {/* if playerOneName does not exist, render input */}
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

          {/* if playerOneImage exists (happens after input), render preview */}
          {
            playerOneImage !== null &&
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
                {/* this will be picked up by PlayerPreview as this.props.children */}
                <button className='reset' onClick={this.handleReset.bind(null, 'playerOne')}>Reset</button>
            </PlayerPreview>
            }

          {/* if playerTwoName does not exist, render input */}
          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

          {/* if playerTwoImage exists (happens after input), render preview */}
          {
            playerTwoImage !== null &&
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              {/* this will be picked up by PlayerPreview as this.props.children */}
              <button className='reset' onClick={this.handleReset.bind(null, 'playerTwo')}>Reset</button>
            </PlayerPreview>
            }
        </div>

        {/* if both player images are not null, render button to new route */}
        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            // links to current route + results route
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
              Battle
          </Link>}
      </div>
    )
  }
}

module.exports = Battle;
