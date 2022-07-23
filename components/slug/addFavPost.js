import { singleBlog, listRelated, addFavorite, removeFavorite } from "../../actions/blog";


const addToFavorite = (
 { auth,
  postId,
  postTitle,
  mainphoto,
  postauthor,
  postslug,
  setIsFavored,
  token}
) => {
  const user_id = auth;
  const post_id = postId;
  const post_title = postTitle;
  const mainPhoto = mainphoto;
  const postAuthor = postauthor;
  const slug = postslug;

  addFavorite(
    user_id,
    post_id,
    post_title,
    mainPhoto,
    postAuthor,
    slug,
    token
  ).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log("addded");
      setIsFavored(true);
    }
  });
};

export default addToFavorite;
