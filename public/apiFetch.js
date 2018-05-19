const ApiFetch = (function() {
  const token = localStorage.getItem('token.id');
  
  function ApiFetch() {
    this.get = function(url, options) {
      var options = options || {};
      options.headers = options.headers || {};
      options.headers["Authorization"] = "bearer " + localStorage.getItem('token.id');
      return fetch(url, options);
    }
  }

    if (!token && window.location.pathname !== '/') {
      window.location.replace('/');
    }

  return new ApiFetch;

}) ()

