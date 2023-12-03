import { Link } from 'gatsby';
import React, { useState } from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';

import GreenNotCompleted from '../../../assets/icons/green-not-completed';
import GreenPass from '../../../assets/icons/green-pass';
import { executeGA } from '../../../redux/actions';
import { SuperBlocks } from '../../../../../shared/config/superblocks';
import { ChallengeWithCompletedNode } from '../../../redux/prop-types';
import { isNewJsCert, isNewRespCert } from '../../../utils/is-a-cert';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ executeGA }, dispatch);

const getUniqueTags = (challenges: ChallengeWithCompletedNode[]) => {
  const tagNames = challenges.map(challenge => challenge.tags).flat(1);
  const uniqueTagNames = [...new Set(tagNames)];
  const uniqueTags = uniqueTagNames.map(
    (name, idx) => ({ name, id: idx, active: false }) as Tag
  );
  return uniqueTags;
};

interface Challenges {
  challengesWithCompleted: ChallengeWithCompletedNode[];
  isProjectBlock: boolean;
  superBlock: SuperBlocks;
  blockTitle?: string | null;
}

interface Tag {
  name: string;
  active: boolean;
  id: number;
}

const CheckMark = ({ isCompleted }: { isCompleted: boolean }) =>
  isCompleted ? <GreenPass /> : <GreenNotCompleted />;

function Challenges({
  challengesWithCompleted,
  isProjectBlock,
  superBlock,
  blockTitle
}: Challenges): JSX.Element {
  const { t } = useTranslation();

  const isGridMap = isNewRespCert(superBlock) || isNewJsCert(superBlock);

  const firstIncompleteChallenge = challengesWithCompleted.find(
    challenge => !challenge.isCompleted
  );

  const isChallengeStarted = !!challengesWithCompleted.find(
    challenge => challenge.isCompleted
  );

  const [tags, updateTags] = useState(getUniqueTags(challengesWithCompleted));

  function setTagStatus(id: number, status: boolean) {
    updateTags(tags => {
      const updateTag = tags.at(id);
      if (!updateTag) return tags;
      updateTag.active = status;
      return [...tags.slice(0, id), updateTag, ...tags.slice(id + 1)];
    });
  }

  return isGridMap ? (
    <>
      {/* TODO: REMOVE */}
      <>
        <>{tags.map(tag => tag.name)}</>
        <button onClick={() => setTagStatus(0, true)}></button>
      </>
      {firstIncompleteChallenge && (
        <div className='challenge-jump-link'>
          <Link
            className='btn btn-primary'
            to={firstIncompleteChallenge.fields.slug}
          >
            {!isChallengeStarted
              ? t('buttons.start-project')
              : t('buttons.resume-project')}{' '}
            {blockTitle && <span className='sr-only'>{blockTitle}</span>}
          </Link>
        </div>
      )}
      <nav
        aria-label={
          blockTitle ? t('aria.steps-for', { blockTitle }) : t('aria.steps')
        }
      >
        <ul className={`map-challenges-ul map-challenges-grid `}>
          {challengesWithCompleted.map((challenge, i) => (
            <li
              className={`map-challenge-title map-challenge-title-grid ${
                isProjectBlock ? 'map-project-wrap' : 'map-challenge-wrap'
              }`}
              id={challenge.dashedName}
              key={`map-challenge ${challenge.fields.slug}`}
            >
              {!isProjectBlock ? (
                <Link
                  to={challenge.fields.slug}
                  className={`map-grid-item ${
                    +challenge.isCompleted ? 'challenge-completed' : ''
                  }`}
                >
                  <span className='sr-only'>{t('aria.step')}</span>
                  <span>{i + 1}</span>
                  <span className='sr-only'>
                    {challenge.isCompleted
                      ? t('icons.passed')
                      : t('icons.not-passed')}
                  </span>
                </Link>
              ) : (
                <Link to={challenge.fields.slug}>
                  {challenge.title}
                  <span className=' badge map-badge map-project-checkmark'>
                    <CheckMark isCompleted={challenge.isCompleted} />
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  ) : (
    <ul className={`map-challenges-ul`}>
      {challengesWithCompleted.map(challenge => (
        <li
          className={`map-challenge-title ${
            isProjectBlock ? 'map-project-wrap' : 'map-challenge-wrap'
          }`}
          id={challenge.dashedName}
          key={'map-challenge' + challenge.fields.slug}
        >
          {!isProjectBlock ? (
            <Link to={challenge.fields.slug}>
              <span className='badge map-badge'>
                <CheckMark isCompleted={challenge.isCompleted} />
              </span>
              {challenge.title}
            </Link>
          ) : (
            <Link to={challenge.fields.slug}>
              {challenge.title}
              <span className='badge map-badge map-project-checkmark'>
                <CheckMark isCompleted={challenge.isCompleted} />
              </span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

Challenges.displayName = 'Challenges';

export default connect(null, mapDispatchToProps)(withTranslation()(Challenges));
