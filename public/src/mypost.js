const MyPost = (function() {

  function MyPost() {

    const buttonMypost = document.getElementById('mypostBtn');
    const blockRight = document.getElementById('block-right');
    const help = new Help();

      if(buttonMypost) {
        buttonMypost.addEventListener('click', function(event) {
          event.preventDefault();

          let data = {
            id: localStorage['user.id']
          }

          ApiFetch.get('/mypost', { 
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            redirect: 'follow'
          })
          .then(help.checkStatus)
          .then(help.parseJSON)
          .then(function(response) {

              const list = document.createElement('ul');
              list.id = 'list';
              list.className = 'list';

              for(var i = 0; i < response.length; i++){
                let content = response[i].content;
                let title = response[i].title;
                let date = response[i].date;
                var newPost = new Post(content, title, date);
                list.appendChild(newPost.elem);
              };
              
              while(blockRight.lastChild){
                blockRight.removeChild(blockRight.lastChild);
              }
              blockRight.appendChild(list);

          })
          .catch(function(error) {
            console.log(error);
          })
      })
    }
  }

  return MyPost;

}) ()