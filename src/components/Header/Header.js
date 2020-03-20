import { Spacing, Title } from '@sicredi/react';
import PropTypes from 'prop-types';
import React from 'react';
import './Header.css';

function Header({ title, subtitle, textAlign, children }) {
  return (
    <>
      <div id="mainHeader" style={{ textAlign }}>
        <Title as="h4" className="title-principal">
          {title}
        </Title>
        {subtitle && (
          <Title as="h6" className="subtitle">
            {subtitle}
          </Title>
        )}

        {children}
      </div>
      <Spacing appearance="large" />
    </>
  );
}

Header.defaultProps = {
  title: '',
  subtitle: '',
  textAlign: '',
  children: null,
};

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  textAlign: PropTypes.string,
  children: PropTypes.shape({}),
};

export default Header;
