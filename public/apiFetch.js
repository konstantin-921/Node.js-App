const ApiFetch = (function() {
  const token = localStorage.getItem('token.id');
  
  function ApiFetch() {
    this.token = token;
    this.get = function(url, options) {
      var options = options || {};
      options.headers = options.headers || {};
      options.headers["Authorization"] = "bearer " + this.token;
      return fetch(url, options);
    }
  }

  if (!!token) {
    return new ApiFetch;
  } 
  else {
    if (window.location.pathname !== '/') {
      window.location.replace('/');
    }
    return ApiFetch;
  }
}) ()

