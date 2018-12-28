const serialize = (json) => {
  return (json)
    ? '?' + Object.keys(json).map(key => {
      if (json[key] !== '' && json[key] !== null && typeof json[key] !== 'undefined')
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }).join('&')
    : '';
};

export default serialize;
