const GRAPHQL_SERVER = 'http://localhost:3000/api/graphql';

export default function gfetch(query, variables) {
  const config = {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query, variables
    }),
  };

  return fetch(GRAPHQL_SERVER, config)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });
}
