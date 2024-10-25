import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Col, Spacer } from '@freecodecamp/ui';
import BigCallToAction from '../components/landing/components/big-call-to-action';

interface FaqItem {
  question: string;
  answer: string[];
}

function FAQPage(): JSX.Element {
  const { t } = useTranslation();
  const faqItems = t<string, string & FaqItem[]>('landing.faqs');

  return (
    <>
      <Helmet title={`Frequently Asked Questions | freeCodeCamp.org`} />
      <Col
        md={8}
        mdOffset={2}
        sm={10}
        smOffset={1}
        xs={12}
        className='faq-section'
      >
        <h2 className='big-heading'>{t('landing.faq')}</h2>
        <Spacer size='s' />
        {faqItems.map((faq, i) => (
          <div
            data-test-label='landing-page-faq'
            data-playwright-test-label='landing-page-faq'
            key={i}
          >
            <h3 className='faq-question'>{faq.question}</h3>
            {faq.answer.map((answer, i) => (
              <p key={i}>{answer}</p>
            ))}
            <Spacer size='s' />
          </div>
        ))}
        <h2 className='landing-page-happy'>{t('learn.read-this.p12')}</h2>
        <Spacer size='m' />
        <BigCallToAction />
        <Spacer size='l' />
      </Col>
    </>
  );
}

FAQPage.displayName = 'FAQPage';

export default FAQPage;
