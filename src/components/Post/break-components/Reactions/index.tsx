import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faLaugh, faSadCry, faAngry } from '@fortawesome/free-solid-svg-icons';

import { Post } from '../../../../global/types';

interface Props {
  reactions: Post['reactions'];
  handleClick: (reaction?: string, type?: string) => void;
  type: string;
}

const Reactions: React.FC<Props> = ({ reactions, handleClick, type }) => {
  const handleRender = (reaction: string): Post['reactions'] => {
    const filteredReactions: Post['reactions'] = [];
    reactions.forEach(reactionObj => {
      if (reactionObj.reaction === reaction) {
        filteredReactions.push(reactionObj);
      }
    });
    return filteredReactions;
  };

  return (
    <>
      <li onClick={() => handleClick('like', type)}>
        <div>
          <FontAwesomeIcon color="blue" size="2x" icon={faThumbsUp} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('like');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
      <li onClick={() => handleClick('heart', type)}>
        <div>
          <FontAwesomeIcon color="red" size="2x" icon={faHeart} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('heart');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
      <li onClick={() => handleClick('smile', type)}>
        <div>
          <FontAwesomeIcon color="yellow" size="2x" icon={faLaugh} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('smile');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
      <li onClick={() => handleClick('cry', type)}>
        <div>
          <FontAwesomeIcon color="yellow" size="2x" icon={faSadCry} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('cry');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
      <li onClick={() => handleClick('angry', type)}>
        <div>
          <FontAwesomeIcon color="red" size="2x" icon={faAngry} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('angry');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
    </>
  );
};

export default Reactions;
