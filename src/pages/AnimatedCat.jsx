import React from 'react';
import './AnimatedCat.css';

export const AnimatedCat = () => {
  
  return (
  <div className="cat-head">
  <div className="cat-ears">
    <div className="cat-left-ear">
      <div className="cat-left-inner-ear"></div>
    </div>
    <div className="cat-right-ear">
      <div className="cat-right-inner-ear"></div>
    </div>
  </div>

  <div className="cat-eyes">
    <div className="cat-left-eye">
      <div className="cat-left-inner-eye"></div>
    </div>
    <div className="cat-right-eye">
      <div className="cat-right-inner-eye"></div>
    </div>
  </div>
  
  <div className="cat-nose"></div>

  <div className="cat-mouth">
    <div className="cat-mouth-line-left"></div>
    <div className="cat-mouth-line-right"></div>
  </div>

  <div className="cat-whiskers">
    <div className="cat-whiskers-left">
      <div className="cat-whisker-left-top"></div>
      <div className="cat-whisker-left-middle"></div>
      <div className="cat-whisker-left-bottom"></div>
    </div>
    <div className="cat-whiskers-right">
      <div className="cat-whisker-right-top"></div>
      <div className="cat-whisker-right-middle"></div>
      <div className="cat-whisker-right-bottom"></div>
    </div>
  </div>
  <div className="purring purring--1">Prr</div>
      <div className="purring purring--2">Prr</div>
      <div className="purring purring--3">Prr</div>
</div>
  )

};





