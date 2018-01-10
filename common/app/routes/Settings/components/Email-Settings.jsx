import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  Row,
  ToggleButton,
  ToggleButtonGroup
} from 'react-bootstrap';
import classnames from 'classnames';

import { onRouteUpdateEmail } from '../redux';
import { Link } from '../../../Router';
import { userSelector } from '../../../redux';
import {
  updateUserBackend
} from '../../../entities/user';

const mapStateToProps = createSelector(
  userSelector,
  ({
    email,
    isPublicEmail,
    sendMonthlyEmail,
    sendNotificationEmail,
    sendQuincyEmail
  }) => ({
    email,
    initialValues: { email },
    isPublicEmail,
    sendMonthlyEmail,
    sendNotificationEmail,
    sendQuincyEmail
  })
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUserBackend
  }, dispatch);
}

const propTypes = {
  email: PropTypes.string,
  fields: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  handleSubmit: PropTypes.func.isRequired,
  isPublicEmail: PropTypes.bool,
  sendMonthlyEmail: PropTypes.bool,
  sendNotificationEmail: PropTypes.bool,
  sendQuincyEmail: PropTypes.bool,
  updateUserBackend: PropTypes.func.isRequired
};

export function UpdateEmailButton() {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={ onRouteUpdateEmail() }
      >
      <Button
        block={ true }
        bsSize='lg'
        bsStyle='primary'
        className='btn-link-social'
        >
        Edit
      </Button>
    </Link>
  );
}

class EmailSettings extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.updateUserBackend(values);
  }

  renderToggleOptions(options) {
    const { updateUserBackend } = this.props;
    return options.map(option => {
      const id = _.kebabCase(option.label);
      return (
        <Row className='inline-form' key={ id }>
          <Col sm={ 8 }>
            <ControlLabel htmlFor={ id }>
              { option.label }
            </ControlLabel>
          </Col>
          <Col sm={ 4 }>
            <ToggleButtonGroup
              className='toggle-btn-group'
              id={ id }
              name='monthly-email'
              onChange={ () => updateUserBackend({ [option.flag]: !option.bool }) }
              type='radio'
              >
              <ToggleButton
                bsSize='lg'
                bsStyle='primary'
                className={
                  classnames(
                    { active: option.bool },
                    'btn-toggle'
                  )
                }
                disabled={ option.bool }
                type='radio'
                value='On'
                >
                On
              </ToggleButton>
              <ToggleButton
                bsSize='lg'
                bsStyle='primary'
                className={
                  classnames(
                    { active: !option.bool },
                    'btn-toggle'
                  )
                }
                disabled={ !option.bool }
                type='radio'
                value='Off'
                >
                Off
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      );
    });
  }

  render() {
    const {
      email,
      fields: { email: { value, onChange } },
      handleSubmit,
      isPublicEmail = false,
      sendMonthlyEmail,
      sendNotificationEmail,
      sendQuincyEmail
    } = this.props;
    if (!email) {
      return (
        <div>
          <Row>
            <p className='large-p text-center'>
              You do not have an email associated with this account.
            </p>
          </Row>
          <Row>
            <UpdateEmailButton />
          </Row>
        </div>
      );
    }
    const options = [
      {
        flag: 'isPublicEmail',
        label: 'Allow people to send me email',
        bool: isPublicEmail
      },
      {
        flag: 'sendMonthlyEmail',
        label: 'Send me announcement emails',
        bool: sendMonthlyEmail
      },
      {
        flag: 'sendNotificationEmail',
        label: 'Send me notification emails',
        bool: sendNotificationEmail
      },
      {
        flag: 'sendQuincyEmail',
        label: 'Send me Quincy\'s weekly email',
        bool: sendQuincyEmail
      }
    ];
    return (
      <div className='email-settings'>
        <Row>
          <form
            className='inline-form'
            id='update-email'
            onSubmit={ handleSubmit(this.handleSubmit) }
            >
            <Col sm={ 6 } xs={ 12 }>
              <ControlLabel htmlFor='email'>
                Email
              </ControlLabel>
            </Col>
            <Col sm={ 5 } xs={ 12 }>
              <FormControl
                bsSize='sm'
                id='email'
                name='email'
                onChange={ onChange }
                placeholder='email'
                required={ true }
                type='email'
                value={ value }
              />
            </Col>
            <Col sm={ 1 } xs={ 12 }>
              <Button
                bsSize='lg'
                bsStyle='primary'
                type='submit'
                >
                Save
              </Button>
            </Col>
          </form>
        </Row>
        { this.renderToggleOptions(options) }
      </div>
    );
  }
}

EmailSettings.displayName = 'EmailSettings';
EmailSettings.propTypes = propTypes;

export default reduxForm(
  {
    form: 'email-settings',
    fields: [ 'email' ]
  },
  mapStateToProps,
  mapDispatchToProps
)(EmailSettings);
