import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import '../style/Search.css';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      searchWidth: 150,
    }

    this.handleChange = this.handleChange.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
  }

  handleChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  changeWidth(e) {
    const search = document.querySelector('.search');
    const icon = document.querySelector('.search i');

    const draw = (timePassed, expanding) => {
      this.setState((prevState) => {
        const direction = expanding ? prevState.searchWidth + 9 : prevState.searchWidth - 9;
        return {
          searchWidth: direction
         };
      });
      let searchDivWidth = this.state.searchWidth + 20;
      search.style.width = `${searchDivWidth}px`;
    }

    const animator = (expanding) => {
      let start = Date.now();

      let timer = setInterval(function() {
        let timePassed = Date.now() - start;

        if (timePassed >= 500) {
          clearInterval(timer);
          return;
        }

        draw(timePassed, expanding);
      }, 25);
    }

    if(e.type === "focus") {
      const expanding = true;
      if(this.state.searchWidth === 150) {
        animator(expanding);
        icon.style.color = '#2F80ED';
      }

    } else {
      const expanding = false;
      if(this.state.searchWidth > 250) {
        animator(expanding);
        icon.style.color = 'black';
      }
    }
  }

  render() {
    //temporary console to show that search field is active
    console.log(this.state.search)

    const inputStyle = {
      width: this.state.searchWidth
    }

    return (
      <div className="search">
        <i className="fa fa-search" aria-hidden="true"></i>
        <TextField
          id="search"
          value={this.state.search}
          onChange={this.handleChange}
          onFocus={this.changeWidth}
          onBlur={this.changeWidth}
          style={inputStyle}
          hintText="Search"
        />
      </div>
    );
  }

}

export default Search;
