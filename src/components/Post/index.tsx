import React from 'react';

import { Container, Text, Image, Reactions, Input, Comments } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faThumbsUp,
  faHeart,
  faLaugh,
  faSadCry,
  faAngry,
} from '@fortawesome/free-solid-svg-icons';

import FakePost from '../../assets/mock-post.jpg';
import FakePicture from '../../assets/default-picture.png';

import { Post as PostType } from '../../global/types';

interface Props {
  post: PostType;
};

const Post: React.FC<Props> = ({ post }) => {
  const [value, setValue] = React.useState<string>('');

  return (
    <Container>
      <Text>
        <p>{post.content}</p>
      </Text>
      <Image>
        <img src={FakePost} alt="post" />
      </Image>
      <Reactions>
        <li>
          <FontAwesomeIcon color="blue" size="2x" icon={faThumbsUp} />
        </li>
        <li>
          <FontAwesomeIcon color="red" size="2x" icon={faHeart} />
        </li>
        <li>
          <FontAwesomeIcon color="yellow" size="2x" icon={faLaugh} />
        </li>
        <li>
          <FontAwesomeIcon color="yellow" size="2x" icon={faSadCry} />
        </li>
        <li>
          <FontAwesomeIcon color="red" size="2x" icon={faAngry} />
        </li>
      </Reactions>
      <Input>
        <input
          name="comment"
          placeholder="Leave a comment!"
          value={value}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setValue(event.currentTarget.value)
          }
        />
        <div>
          <FontAwesomeIcon color="purple" size="2x" icon={faPaperPlane} />
        </div>
      </Input>
      <Comments>
        {post.comments.map(comment => (
        <li key={comment.id}>
          <div>
            <div>
              <img src={FakePicture} alt="fake pic" />
            </div>
            <h3>{comment.author}</h3>
          </div>
          <div>
            <p>{comment.content}</p>
          </div>
        </li>
        ))}
      </Comments>
    </Container>
  );
};

export default Post;
