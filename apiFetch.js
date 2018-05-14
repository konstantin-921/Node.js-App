var ApiFetch = (function() {

  function ApiFetch(token) {
    this.token = token;
    this.get = function(url, options) {
      var options = options || {};
      options.headers = options.headers || {};
      options.headers["Authorization"] = "bearer " + this.token;
      return fetch(url, options);
    }
  }

  return ApiFetch;

}) ()

export {ApiFetch};