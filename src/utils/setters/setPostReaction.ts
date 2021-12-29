import { firestoredb } from '../../lib';
import handleError from '../general/handleError';

import { Post } from '../../global/types';

const setPostReaction = async (
  id: string,
  post: Post,
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  newReaction: string,
  pathSegment: string,
) => {
  try {
    const postsCopy = [...posts];
    const postIndex = postsCopy.findIndex(postCopy => postCopy.id === post.id);
    const reactionIndex = postsCopy[postIndex].reactions.findIndex(reaction => reaction.id === id);
    if (reactionIndex === -1) {
      postsCopy[postIndex].reactions.push({
        id,
        reaction: newReaction,
      });
    } else {
      postsCopy[postIndex].reactions[reactionIndex].reaction = newReaction;
    }
    const postRef = firestoredb.doc(firestoredb.db, `media/posts/${pathSegment}`, post.id);
    await firestoredb.updateDoc(postRef, {
      reactions: postsCopy[postIndex].reactions,
    });
    setPosts(postsCopy);
  } catch (err) {
    handleError(err, 'setting reaction in a post.');
  }
};

export default setPostReaction;
