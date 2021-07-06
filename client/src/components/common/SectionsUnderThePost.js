import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const SectionsUnderThePost = ({
  like,
  unlike,
  addToPlaylist,
  makeComment,
  post,
  type,
}) => {
  const { userData } = useContext(UserContext);

  return (
    <div>
      {/* like / unlike */}
      <div className="likes">
        {userData.user ? (
          userData.user.role !== "user" ? (
            <span />
          ) : post?.likes.includes(userData.user.id) ? (
            <i
              class="fas fa-thumbs-down like"
              onClick={() => {
                unlike(
                  type === "video" ? post?._id : post?.id,
                  post?.numberOfViews
                );
              }}
            ></i>
          ) : (
            <i
              class="fas fa-thumbs-up like"
              onClick={() => {
                like(
                  type === "video" ? post?._id : post?.id,
                  post?.numberOfViews
                );
              }}
            ></i>
          )
        ) : (
          <span />
        )}
        <h6>
          {post?.likes.length} likes
          <br />
          <br />
          {post?.numberOfViews} views
        </h6>
      </div>

      {/* add to playlist */}
      {userData.user ? (
        userData.user.role !== "user" ? (
          <span />
        ) : type === "video" ? (
          <Link
            onClick={() =>
              addToPlaylist(
                post?._id,
                post?.title,
                post?.image,
                userData.user.id
              )
            }
            className="button edit"
          >
            Add to Playlist
          </Link>
        ) : (
          <Link
            onClick={() =>
              addToPlaylist(
                post?.id,
                post?.song,
                post?.singer,
                post?.image,
                userData.user.id
              )
            }
            className="button edit"
          >
            Add to Playlist
          </Link>
        )
      ) : (
        <span />
      )}

      {/* add a comment */}
      {userData.user ? (
        userData.user.role !== "user" ? (
          <span />
        ) : (
          <form
            id="comment-form"
            onSubmit={(e) => {
              e.preventDefault();
              makeComment(e.target[0].value, post?.id, userData.user.id);
            }}
            className="comment-form"
          >
            <textarea
              className="form-control"
              name="text"
              placeholder="Add a comment"
            ></textarea>
            <button id="submit">Submit</button>
          </form>
        )
      ) : (
        <span />
      )}

      {/* comments block */}
      <div className="comments">
        {post?.comments.map((comment, i) => (
          <div className="comment" key={i}>
            <div className="username">
              <strong>{comment.user}</strong>
            </div>
            <div className="text">{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsUnderThePost;
