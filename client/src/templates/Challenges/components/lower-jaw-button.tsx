import React from 'react';
import { Button } from '@freecodecamp/react-bootstrap';
import { apiLocation } from '../../../../../config/env.json';

interface LowerJawButtonProps {
  signed: boolean;
  buttonText: string;
  signInText: string;
  onClick: () => void;
  challengeIsCompleted: boolean;
  ref: React.RefObject<HTMLButtonElement>;
}

export const LowerJawButtons = ({
  signed,
  challengeIsCompleted,
  buttonText,
  signInText,
  onClick,
  ref
}: LowerJawButtonProps) => {
  return (
    <div id='action-buttons-container'>
      {!signed && challengeIsCompleted && (
        <Button block={true} href={`${apiLocation}/signin`} className='btn-cta'>
          {signInText}
        </Button>
      )}
      <button
        className={'btn-block btn'}
        id='lowerJaw-button'
        data-cy='lowerJaw-button'
        onClick={onClick}
        ref={ref}
      >
        {buttonText}
      </button>
    </div>
  );
};
