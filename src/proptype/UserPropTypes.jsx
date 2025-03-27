import PropTypes from "prop-types";
export const UserPropTypes = PropTypes.shape({
  user_id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profile_avatar: PropTypes.string.isRequired,
  follower_amount: PropTypes.number.isRequired,
  is_friend_with_actor: PropTypes.bool.isRequired,
});
