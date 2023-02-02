// https://youtu.be/4K33w-0-p2c

//const getBtn = document.getElementById('get-btn');
//const postBtn = document.getElementById('post-btn');

export let leaderboardData;

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

export const getLeaderboardData = () => {
  sendHttpRequest('GET', 'https://bns-knex-leaderboard-1.onrender.com/').then(responseData => {
    console.log(responseData);
    leaderboardData = responseData;
  });
};

export const sendLeaderboardData = () => {
  sendHttpRequest('POST', 'https://bns-knex-leaderboard-1.onrender.com/', {
      data:
          {
              name: "Billy",
              score: 1700
          }
  })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err);
    });
};

// getBtn.addEventListener('click', getData);
// postBtn.addEventListener('click', sendData);