import React from 'react';
import Search from './../containers/Search';

function Header(props) {
  return (
    <div className="header_container fullwidth key_color_bg">
      <header className="header">
        <div className='logo_area'>
          <h1>
            <a href="/">
              <span className="logo">핫플검색</span>
            </a>
          </h1>
        </div>
        <Search
          blind={props.blind}
          query={props.query}
          onChange={props.onChange}
          onClick={props.onClick}
        />
      </header>
    </div>
  );
}

export default Header;
