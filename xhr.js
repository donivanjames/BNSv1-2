// https://youtu.be/4K33w-0-p2c

export let leaderboardData = null;

//const { SERVER_LINK } = process.env;


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
  sendHttpRequest('GET', "https://bns-knex-leaderboard-1.onrender.com/").then(responseData => {
    console.log(responseData);
    leaderboardData = responseData;
  });
};

export const sendLeaderboardData = (name, score) => {
  sendHttpRequest('POST', "https://bns-knex-leaderboard-1.onrender.com/", {
      data:
          {
              name: name,
              score: score
          }
  })
    .then(responseData => {
      //console.log(responseData);
      getLeaderboardData()
    })
    .catch(err => {
      console.log(err);
    });
};