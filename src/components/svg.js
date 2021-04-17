import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({ width, height, viewBox, path }) => (
  <svg width={width} height={height} viewBox={viewBox}>
    <path d={path} />
  </svg>
);

Svg.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  path: PropTypes.string,
};

export default Svg;
