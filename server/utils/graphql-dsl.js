const GRAPHQL_SERVER = 'http://localhost:3000/api/graphql';

export default function gfetch(query) {
  const config = {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({query}),
  };

  return fetch(GRAPHQL_SERVER, config)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });
}
