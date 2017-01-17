import React from 'react';

export default ({ value, clickHandler }) => {
  return (
    <div className="ttt-cell" onClick={ clickHandler }>
      { value }
    </div>
  )
}