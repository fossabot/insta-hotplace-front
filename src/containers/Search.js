import React, { Component } from 'react';
import SearchField from './../components/header/SearchField';
import { SearchSuggest } from './SearchSuggest';
import { withRouter } from 'react-router-dom';

class Search extends Component {

  constructor(props) {
    super(props);
    this.suggestHover = false;
    this.state = {
      inputFocus: false,
    };
  }

  // 검색실행시 검색창에 입력된 값을 url주소로 표시한다
  returnSearch = e => {
    console.log('Search > returnSearch');
    e.preventDefault();
    this.setState({ inputFocus: false });
    var keyword = e.target.firstChild.childNodes[2].lastChild.value;
    this.props.history.push(`/search/${keyword}`);
  };

  // input FocusOn일때 자동완성 키워드 목록 보이기
  suggestHandle = e => {
    if (this.suggestHover === false) {
      console.log('Search > suggestHandle');
      this.setState({ inputFocus: e.type === 'focus' ? true : false });
    }
  };
  // 자동완성 클릭했을 때 자동완성 박스가 사라지지 않는 문제 해결
  suggestHoverListen = e => {
    console.log('Search > suggestHoverListen');
    this.suggestHover = e.type === 'mouseenter' ? true : false;
  };

  // 자동완성 키워드 클릭시 검색창 값 채우고 검색실행
  autoComp = (e, keyword) => {
    console.log('Search > autoComp');
    e.preventDefault();
    this.setState({ inputFocus: false });
    this.props.history.push(`/search/${keyword}`);
    this.props.onClickSgt(keyword);
  };

  render() {
    if (this.props.blind !== 'blind') {
      console.log('render (Search)');
      var { blind, query, onChange, inputClear } = this.props;

      return (
        <div className={'search ' + blind}>
          <form onSubmit={this.returnSearch} method="get" autoComplete="off">
            <SearchField
              query={query}
              onChange={onChange}
              inputClear={inputClear}
              onFocus={this.suggestHandle}
            />
            <SearchSuggest
              blind={this.state.inputFocus ? '' : ' blind'}
              autoComp={this.autoComp}
              onMouse={this.suggestHoverListen}
            />
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(Search);
