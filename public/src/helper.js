const Help = (function() {
  
  function Help() {
    
    this.checkStatus = function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

    this.parseJSON = function(response) {
      return response.json();
      }

    this.saveToken = function(response) {
      let token = response.token;
      localStorage['token.id'] = token;
      localStorage['user.id'] = response.userId;
      return response;
    }
  }

 

return Help;
 

}) ()