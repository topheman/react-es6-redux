import React from 'react';

const Tr = ({label, value, type, display}) => {
  let _value = value;
  if (typeof _value !== 'undefined' && !!_value) {
    if (_value instanceof Date) {
      _value = _value.toString().split(' ').slice(0, 4).join(' ');// ok I took a very simple way ;-)
    }
    if (type === 'link') {
      _value = <a href={_value}>{_value}</a>;
    }

    if (display !== 'colspan') {
      return (
        <tr>
          <td>{label}</td>
          <td>{_value}</td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan="2">{_value}</td>
      </tr>
    );
  }
  // won't return <noscript/> if so, getting following : Warning: validateDOMNesting(...): <noscript> cannot appear as a child of <tbody>. See Profile > tbody > Tr > noscript.
  return <tr/>;
};

Tr.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.any,
  type: React.PropTypes.string,
  display: React.PropTypes.string
};

export default Tr;
