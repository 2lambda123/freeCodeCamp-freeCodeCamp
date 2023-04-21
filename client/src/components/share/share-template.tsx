import React from 'react';
import { useTranslation } from 'react-i18next';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShareRedirectProps } from './types';

export const ShareTemplate: React.ComponentType<ShareRedirectProps> = ({
  redirectURL
}) => {
  const { t } = useTranslation();
  return (
    <a
      title='Share on Twitter'
      data-testid='ShareTemplateWrapperTestID'
      className='btn fade-in'
      href={redirectURL}
      target='_blank'
      rel='noreferrer'
    >
      <span className='sr-only'>opens in new window</span>
      <span className='sr-only'>{t('share-on-twitter')}</span>
      <FontAwesomeIcon
        icon={faTwitter}
        size='1x'
        aria-label='twitterIcon'
        aria-hidden='true'
      />
    </a>
  );
};
