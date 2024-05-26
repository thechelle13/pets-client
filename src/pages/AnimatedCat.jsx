import React from 'react';
import './AnimatedCat.css';

export const AnimatedCat = () => {
  return (
    <div className="cat-container">
      <div className="cat">
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
        </div>
        <div className="cat-body"></div>
        <div className="cat-tail"></div>
      </div>
    </div>
  );
};

// import React from 'react';
// import './AnimatedCat.css';

// export const AnimatedCat = () => {
//   return (
//     <div className="sleeping-cat-container">
//       <div className="sleeping-cat">
//         <div className="head">
//           <div className="ear left-ear"></div>
//           <div className="ear right-ear"></div>
//           <div className="eye left-eye"></div>
//           <div className="eye right-eye"></div>
//           <div className="nose"></div>
//           <div className="whiskers left-whiskers">
//             <div className="whisker"></div>
//             <div className="whisker"></div>
//             <div className="whisker"></div>
//           </div>
//           <div className="whiskers right-whiskers">
//             <div className="whisker"></div>
//             <div className="whisker"></div>
//             <div className="whisker"></div>
//           </div>
//         </div>
//         <div className="body"></div>
//         <div className="tail"></div>
//       </div>
//     </div>
//   );
// };



