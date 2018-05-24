const ApiFetch = (function() {
  const token = localStorage.getItem('token.id');
  
  function ApiFetch() {
    this.get = function(url, options) {
      var options = options || {};
      options.method = 'GET';
      options.headers = options.headers || {};
      options.headers["Authorization"] = "bearer " + localStorage.getItem('token.id');
      return fetch(url, options);
    }

    this.post = function(url, options) {
      var options = options || {};
      options.method = 'POST';
      options.headers = options.headers || {};
      options.headers["Authorization"] = "bearer " + localStorage.getItem('token.id');
      return fetch(url, options);
    }

    this.put = function(url, options) {
      var options = options || {};
      options.method = 'PUT';
      options.headers = options.headers || {};
      options.headers["Authorization"] = "bearer " + localStorage.getItem('token.id');
      return fetch(url, options);
    }

    this.delete = function(url, options) {
      var options = options || {};
      options.method = 'DELETE';
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

