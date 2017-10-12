import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import '../style/Search.css';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      isFocused: false,
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
    if(e.type === "focus") {
      this.setState(() => ({ isFocused: true }));
    } else {
      this.setState(() => ({ isFocused: false }));
    }
  }

  render() {
    //temporary console to see that search field val goes to the state
    console.log(this.state.search)

    const inputStyle = {
      width: this.state.isFocused ? '280px' : '140px',
      transition: 'width .6s ease-in-out'
    }

    const wrapperStyle = {
      width: this.state.isFocused ? '300px' : '160px',
    }

    const iconStyle = {
      color: this.state.isFocused ? '#2F80ED' : 'black',
    }

    return (
      <div className="search" style={wrapperStyle}>
        <i className="fa fa-search" aria-hidden="true" style={iconStyle}></i>
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
