import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../../components/helpers/index';

import { dasherize } from '../../../../../utils/slugs';
import './challenge-title.css';
import GreenPass from '../../../assets/icons/GreenPass';
import { generateIconComponent } from '../../../assets/icons';

const propTypes = {
  block: PropTypes.string,
  children: PropTypes.string,
  isCompleted: PropTypes.bool,
  superBlock: PropTypes.string
};

function ChallengeTitle({ block, children, isCompleted, superBlock }) {
  return (
    <div className='challenge-title-wrap'>
      <div className='challenge-title-breadcrumbs'>
        <Link
          className='breadcrumb-left'
          to={`/learn/${dasherize(superBlock)}`}
        >
          <span>{generateIconComponent(superBlock, 'breadcrumb-icon')}</span>
        </Link>
        <div className='breadcrumb-center'>
          <span>{'>>'}</span>
        </div>
        <Link
          className='breadcrumb-right'
          state={{ breadcrumbBlockClick: block }}
          to={`/learn/${dasherize(superBlock)}`}
        >
          {block}
        </Link>
      </div>
      <b>{children}</b>
      {isCompleted ? (
        <GreenPass
          style={{ height: '15px', width: '15px', marginLeft: '7px' }}
        />
      ) : null}
    </div>
  );
}

ChallengeTitle.displayName = 'ChallengeTitle';
ChallengeTitle.propTypes = propTypes;

export default ChallengeTitle;
