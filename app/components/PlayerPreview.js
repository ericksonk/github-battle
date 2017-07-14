var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
  return (
    <div>
      <div className="column">
        <img
          className="avatar"
          src={props.avatar}
          alt={'Avatar for ' + props.userName}
        />
        <h2 className="username">@{props.userName}</h2>
      </div>
      {props.children}
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onReset: PropTypes.func,
  id: PropTypes.string
};

module.exports = PlayerPreview;
