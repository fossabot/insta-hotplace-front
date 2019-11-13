import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BoxItem, Loading } from './../components/BoxItems';
import * as service from './../services/GetSearch';

class SearchResult extends Component {
  // 키워드 검색결과 가져와서 state에 담기
  fetchSearch = async keyword => {
    this.setState({ fetching: true });
    const searchRequest = await service.getSearch(keyword);
    const searchList = searchRequest.data;
    this.setState({
      searchCount: searchList.length,
      searchList,
      fetching: false,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      searchCount: null,
      fetching: false,
      searchList: [],
      itemsPerPage: 12,
      loadPage: 1,
      indexStart: 0,
      keyword: this.props.keyword,
    };
  }

  // render()다음 데이터를 호출한다
  componentDidMount() {
    this.fetchSearch(this.props.match.params.query);
    window.addEventListener('scroll', this.nextPage);
  }

  // 업데이트 될 때 실행됨
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.keyword !== prevState.keyword) {
      return { keyword: nextProps.keyword };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.submitCheck !== this.props.submitCheck) {
      this.fetchSearch(this.props.keyword);
    }
  }

  // 무한스크롤
  nextPage = () => {
    var { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollHeight === scrollTop + clientHeight) {
      this.setState({ loadPage: this.state.loadPage + 1 });
    }
  };

  viewDetail = (e, num) => {
    e.preventDefault();
    this.props.history.push(`/detail/${num}`);
  };

  render() {
    var {
      searchCount,
      searchList,
      loadPage,
      itemsPerPage,
      indexStart,
    } = this.state;

      // 검색결과가 있으면 로드한 데이터를 12개씩 보여준다
      var indexEnd = itemsPerPage * loadPage;
      var searchListSlice = searchList.slice(indexStart, indexEnd);
      var boxItems = searchListSlice.map((searchList, i) => {
        return (
          <BoxItem
            searchList={searchList}
            key={i}
            onClick={e => {this.viewDetail(e, 1);}}
          />
        );
      });

      return (
        <div className="main_container fullwidth">
          <main className="main search_result">
            <p className="search_count">검색결과 : {searchCount} 건</p>
            <ul className="box_container">{boxItems}</ul>
            {/* ajax로 데이터를 가져오는 동안 Loading을 보여준다 */}
            <Loading blind={this.state.fetching ? '' : 'blind'} />
          </main>
        </div>
      );
    }
  }


export default withRouter(SearchResult);
