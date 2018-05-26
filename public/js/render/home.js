const Home = (function() {

  function Home() {

    while(document.body.lastChild){
      document.body.removeChild(document.body.lastChild);
    }

    this.container = document.createElement('div');
    this.container.className = 'container';
    this.title = document.createElement('h1');
    this.title.textContent = 'My App';
    this.input = document.createElement('input');
    this.input.id = 'findFriends';
    this.input.className = 'find-friends';
    this.input.type = 'text';
    this.input.placeholder = 'Search';
    this.userBox = document.createElement('div');
    this.userBox.className = 'user-box';
    this.userBox.id = 'userBox';
    this.container.appendChild(this.title);
    this.container.appendChild(this.input);
    this.container.appendChild(this.userBox);


    this.containerBlock = document.createElement('div');
    this.containerBlock.className = 'container-block';

    this.blockLeft = document.createElement('div');
    this.blockLeft.className = 'block block-left';
    this.blockRight = document.createElement('div');
    this.blockRight.className = 'block block-right';
    this.blockRight.id = 'block-right';

    this.buttonMypost = document.createElement('button');
    this.buttonMypost.className = 'btn mypost-btn';
    this.buttonMypost.id = 'mypostBtn';
    this.buttonMypost.textContent = 'My posts';

    this.buttonAddpost = document.createElement('button');
    this.buttonAddpost.className = 'btn addpost-btn';
    this.buttonAddpost.id = 'addpostBtn';
    this.buttonAddpost.textContent = 'Add new post';

    this.buttonPosts = document.createElement('button');
    this.buttonPosts.className = 'btn posts-btn';
    this.buttonPosts.id = 'postsBtn';
    this.buttonPosts.textContent = 'Posts friends';

    this.blockLeft.appendChild(this.buttonMypost);
    this.blockLeft.appendChild(this.buttonAddpost);
    this.blockLeft.appendChild(this.buttonPosts);
    this.containerBlock.appendChild(this.blockLeft);
    this.containerBlock.appendChild(this.blockRight);

    this.container.appendChild(this.containerBlock);

  }

  return Home;

}) ()