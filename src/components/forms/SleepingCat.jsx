import React from 'react';
import './SleepingCat.css';

export const SleepingCat = () => {
  return (
    <div className="main">
      <span className="stand"></span>
      
      <div className="cat">
        
        <div className="body">
        {/* <div>PRR</div> */}
        {/* <div className='snooze snooze--1'>PRR</div>
  <div className='snooze snooze--2'>prr</div>
  <div className='snooze snooze--3'>prr</div> */}
        </div>
        <div className="head">
            
          <div className="ear"></div>
          <div className="ear"></div>
        </div>
        <div className="face">
          <div className="nose"></div>
          <div className="whisker-container">
            <div className="whisker"></div>
            <div className="whisker"></div>
          </div>
          <div className="whisker-container">
            <div className="whisker"></div>
            <div className="whisker"></div>
          </div>
        </div>
        <div className="tail-container">
          <div className="tail">
            <div className="tail">
              <div className="tail">
                <div className="tail">
                  <div className="tail">
                    <div className="tail">
                      <div className="tail"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

