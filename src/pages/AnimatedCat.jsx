import React from 'react';
import './AnimatedCat.css';

export const AnimatedCat = () => {
  
  return (
  <div class="cat-head">
  <div class="cat-ears">
    <div class="cat-left-ear">
      <div class="cat-left-inner-ear"></div>
    </div>
    <div class="cat-right-ear">
      <div class="cat-right-inner-ear"></div>
    </div>
  </div>

  <div class="cat-eyes">
    <div class="cat-left-eye">
      <div class="cat-left-inner-eye"></div>
    </div>
    <div class="cat-right-eye">
      <div class="cat-right-inner-eye"></div>
    </div>
  </div>
  
  <div class="cat-nose"></div>

  <div class="cat-mouth">
    <div class="cat-mouth-line-left"></div>
    <div class="cat-mouth-line-right"></div>
  </div>

  <div class="cat-whiskers">
    <div class="cat-whiskers-left">
      <div class="cat-whisker-left-top"></div>
      <div class="cat-whisker-left-middle"></div>
      <div class="cat-whisker-left-bottom"></div>
    </div>
    <div class="cat-whiskers-right">
      <div class="cat-whisker-right-top"></div>
      <div class="cat-whisker-right-middle"></div>
      <div class="cat-whisker-right-bottom"></div>
    </div>
  </div>
  <div className="purring purring--1">Prr</div>
      <div className="purring purring--2">Prr</div>
      <div className="purring purring--3">Prr</div>
</div>
  )

};





