import PropTypes from "prop-types";
export const PostPropTypes = PropTypes.shape({
    post_id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    is_private: PropTypes.bool.isRequired,
    is_hidden: PropTypes.bool.isRequired,
    like_amount: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profile_avatar: PropTypes.string.isRequired,
    attachment:PropTypes.string,
  });