// get json data
let data = fetch('https://api.myjson.com/bins/152f9j')
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err)
  });

const mainDiv = document.getElementById('main');
let postsOnPage = 9;
let mainData;
let sortedPosts;
let postsToShow;
let addPosts = postsOnPage;

// main logic

data.then(posts => {
  mainData = posts.data;
  sortedPosts = sortPostsByDate(mainData);
  postsToShow = sortedPosts.slice(0, postsOnPage);
  if (localStorage.getItem('tags')) {
    let tags = localStorage.getItem('tags').split(',');
    for(let tag of tags) {
      tag = tag.toLowerCase();
      let oldTag = document.getElementById(tag);
      oldTag.className = 'checked'
    }
    sortByTag(tags, sortedPosts);
  } else {
    showPosts(postsToShow);
  }

// search

  let searchInput = document.getElementById('search');
  searchInput.addEventListener('keyup', () => {
    sortedPosts = search(mainData, searchInput.value);
    if (sortedPosts.length > 0) {
      removeAllPosts(mainDiv);
      postsToShow = sortedPosts.slice(0, postsOnPage);
      showPosts(postsToShow);
    } else if (!searchInput.value) {
      removeAllPosts(mainDiv);
      showPosts(postsToShow);
    } else {
      let notFound = document.createElement('h2');
      notFound.innerText = `"${searchInput.value}" not found`;
      removeAllPosts(mainDiv);
      mainDiv.appendChild(notFound);
    }
  });

// infinity loop

  document.addEventListener('scroll', () => showMore(sortedPosts));

// choose by tags

  let theParent = document.getElementById("parent-list");
  theParent.addEventListener("click", element => {
    let target = element.target;
    if(target.tagName === "LI") {
      target.classList.toggle("checked");
    }
    let choosedTags = document.querySelectorAll('.chooseTag li.checked');
    let tags = [];
    if (choosedTags.length) {
      for (tag of choosedTags) {
        tags.push(tag.innerText);
        localStorage.setItem('tags', tags)
      }
      sortByTag(tags, mainData)
    } else {
      removeAllPosts(mainDiv);
      sortedPosts = sortPostsByDate(mainData);
      postsToShow = sortedPosts.slice(0, postsOnPage);
      showPosts(postsToShow);
      localStorage.clear()
    }
  });

// delete posts

  let main = document.getElementById('main');
  main.addEventListener('click', elem => {
    deletePost(elem, mainData);
    let footer = document.getElementsByClassName('page__footer')[0];
    if(isAppearOnScreen(footer)){
      showMore(sortedPosts)
    }
  })

});

function showPosts(posts) {
  for (post of posts) {
    mainDiv.appendChild(itemCreate(post));
  }
}

function removeAllPosts(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

function sortByTag(choosedTags, data) {
    sortedPosts = data.filter(post => tagsContain(choosedTags, post.tags));
    removeAllPosts(mainDiv);
    if (sortedPosts.length) {
      let postsToShow = sortedPosts.slice(0, postsOnPage);
      showPosts(postsToShow);
    } else {
      let notFound = document.createElement('h2');
      notFound.innerText = `Such tags not found`;
      mainDiv.appendChild(notFound);
    }
}

function sortPostsByDate(data) {
  return data.sort(sortByDate);
}

function sortByDate(post1, post2) {
  return new Date(post2['createdAt']) - new Date(post1['createdAt']);
}

function search(data, text) {
  let regular = new RegExp(text, 'i');
  return data.filter(post => post.title.search(regular) !== -1);
}

function showMore(posts) {
  let footer = document.getElementsByClassName('page__footer')[0];
  let tags = document.getElementsByClassName('chooseTag')[0];
  if (isAppearOnScreen(footer)) {
    addPosts += postsOnPage;
    postsToShow = posts.slice(0, addPosts);
    removeAllPosts(mainDiv);
    showPosts(postsToShow);
  } else if (isAppearOnScreen(tags)){
    addPosts = 9;
  }
}

function isAppearOnScreen(elem) {
  let shape = elem.getBoundingClientRect();
  let html = document.documentElement;
  return (
    shape.top >= 0 &&
    shape.left >= 0 &&
    shape.bottom <= (window.innerHeight || html.clientHeight) &&
    shape.right <= (window.innerWidth || html.clientWidth)
  );
}

// function for creating single post

let itemCreate = item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'news__item';

    const image = document.createElement('img');
    image.src = item.image;
    image.alt = 'image';

    const title = document.createElement('h4');
    title.innerHTML = item.title;

    const description = document.createElement('p');
    description.innerHTML = item.description;

    const createdAt = document.createElement('span');
    const date = new Date(item.createdAt);
    createdAt.innerHTML = date.toDateString();

    const deleteButton = document.createElement('i');
    deleteButton.className = 'fa fa-times';
    itemDiv.appendChild(deleteButton);
    itemDiv.appendChild(image);
    itemDiv.appendChild(title);
    itemDiv.appendChild(description);

    const tags = document.createElement('ul');
    for (let tagIndex = 0; tagIndex < item.tags.length; tagIndex++) {
      const tag = document.createElement('li');
      tag.innerHTML = item.tags[tagIndex];
      tags.appendChild(tag);
    }
    itemDiv.appendChild(tags);
    itemDiv.appendChild(createdAt);
    return itemDiv;
};

function deletePost(elem, data) {
  if (elem.target.nodeName === 'I') {
    let main = document.getElementById('main');
    main.removeChild(elem.target.parentNode);
    let title = elem.target.parentNode.childNodes[2].innerText;
    let findPost = data.filter(post => post.title === title);
    let postIndex = data.indexOf(findPost[0]);
    data.splice(postIndex, 1);
    sortedPosts.splice(postIndex, 1);
  }
}

function tagsContain(choosedTags, tags) {
  let res;
  for (tag of choosedTags) {
    res = (tags.includes(tag)) ? true : false;
    if (!res) {
      return res
    }
  }
  return res
}

