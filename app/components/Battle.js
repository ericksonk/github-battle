var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var value = event.target.value;

    this.setState(() => {
      return {
        userName: value
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.userName
    );
  }
  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="userName">{this.props.label}</label>
        <input
          id="userName"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.userName}>
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImg: null,
      playerTwoImg: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, userName) {
    this.setState(function() {
      var newState = {};
      newState[id + 'Name'] = userName;
      newState[id + 'Img'] = 'https://github.com/' + userName + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(() => {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    })
  }

  render() {
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImg = this.state.playerOneImg;
    var playerTwoImg = this.state.playerTwoImg;

    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />}

          {playerOneImg !== null &&
            <PlayerPreview
              avatar={playerOneImg}
              userName={playerOneName}>
              <button className="reset" onClick={this.handleReset.bind(null, 'playerTwo')}>
                Reset
              </button>
            </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />}

            {playerTwoImg !== null &&
              <PlayerPreview
                avatar={playerTwoImg}
                userName={playerTwoName}>
                  <button className="reset" onClick={this.handleReset.bind(null, 'playerOne')}>
                    Reset
                  </button>
              </PlayerPreview>}
        </div>

        {playerOneImg && playerTwoImg &&
          <Link
            className="button"
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Battle
          </Link>}

      </div>
    );
  }
}

module.exports = Battle;
