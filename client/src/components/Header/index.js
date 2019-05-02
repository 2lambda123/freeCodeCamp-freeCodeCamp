import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import FCCSearch from 'react-freecodecamp-search';

import NavLogo from './components/NavLogo';
import UserState from './components/UserState';
import { Link } from '../helpers';

import './header.css';

import {
  toggleDisplayMenu,
  displayMenuSelector
} from '../layouts/components/guide/redux';

const mapStateToProps = createSelector(
  displayMenuSelector,
  displayMenu => ({
    displayMenu
  })
);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleDisplayMenu }, dispatch);

const propTypes = {
  disableMenuButtonBehavior: PropTypes.bool,
  disableSettings: PropTypes.bool,
  displayMenu: PropTypes.bool,
  toggleDisplayMenu: PropTypes.func.isRequired
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.menuButtonRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (
      !this.props.disableMenuButtonBehavior &&
      this.props.displayMenu &&
      this.menuButtonRef.current &&
      !this.menuButtonRef.current.contains(event.target)
    ) {
      this.props.toggleDisplayMenu();
    }
  };

  render() {
    const {
      disableMenuButtonBehavior,
      disableSettings,
      displayMenu,
      toggleDisplayMenu
    } = this.props;
    // On the guide, the menu button behaves differently from the rest of the
    // site. disableMenuButtonBehavior=true is used for guide pages to make sure
    // that only menu button clicks toggle between side nav and article.
    return (
      <header>
        <nav id='top-nav'>
          <Link className='home-link' to='/'>
            <NavLogo />
          </Link>
          {disableSettings ? null : <FCCSearch />}
          <button
            aria-expanded={displayMenu}
            className={`menu-button${displayMenu ? ' menu-button-open' : ''}${
              disableMenuButtonBehavior ? ' menu-button-guide' : ''
            }`}
            key='menu-button'
            onClick={toggleDisplayMenu}
            ref={this.menuButtonRef}
          >
            Menu
          </button>
          <ul
            className={`${displayMenu ? ' nav-expanded' : ''}${
              disableMenuButtonBehavior ? ' nav-guide' : ''
            }`}
            id='top-right-nav'
            key='top-right-nav'
          >
            <li>
              <Link className='top-right-nav-link' to='/learn'>
                Learn
              </Link>
            </li>
            <li>
              <Link className='top-right-nav-link' external={true} to='/forum'>
                Forum
              </Link>
            </li>
            <li>
              <Link className='top-right-nav-link' external={true} to='/news'>
                News
              </Link>
            </li>
            <li>
              <UserState disableSettings={disableSettings} />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
