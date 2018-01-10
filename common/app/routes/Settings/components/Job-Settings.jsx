import PropTypes from 'prop-types';
import React from 'react';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { userSelector } from '../../../redux/index';
import {
  toggleUserFlag,
  updateUserBackend
} from '../../../entities/user';

const mapStateToProps = createSelector(
  userSelector,
  ({ isAvailableForHire }) => ({ isAvailableForHire })
);

function mapDistachToProps(dispatch) {
  return bindActionCreators({
    toggleUserFlag,
    updateUserBackend
  }, dispatch);
}

const propTypes = {
  isAvailableForHire: PropTypes.bool,
  updateUserBackend: PropTypes.func.isRequired
};

function JobSettings({
  isAvailableForHire,
  updateUserBackend
}) {
  const className = classnames({
    active: isAvailableForHire,
    'btn-toggle': true
  });
  const toggleHireState = () => updateUserBackend({
    isAvailableForHire: !isAvailableForHire
  });
  return (
    <Row>
      <Col xs={ 9 }>
        <p className='large-p'>
          Available for hire?
        </p>
      </Col>
      <Col xs={ 3 }>
        <Button
          block={ true }
          bsSize='lg'
          bsStyle='primary'
          className={ className }
          onClick={ toggleHireState }
          >
          { isAvailableForHire ? 'Yes' : 'No' }
        </Button>
      </Col>
    </Row>
  );
}

JobSettings.displayName = 'JobSettings';
JobSettings.propTypes = propTypes;

export default connect(mapStateToProps, mapDistachToProps)(JobSettings);
