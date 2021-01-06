import React, { Component } from 'react';
import './Page.css'

class Page extends Component {

  render() {

    const { leftContent, rightContent, inverse } = this.props;

    return (
      <div className="page">
        <div className={
          inverse != null?
          "left-content inverse":
          "left-content" 
        }>
          {leftContent}
        </div>
        <div className="right-content">
          {rightContent}
        </div>
      </div>
    );
  }
}

export default Page;