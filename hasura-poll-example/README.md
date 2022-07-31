# hasura-realtime-poll

A demo application to showcase real-time capabilities of [Hasura GraphQL
Engine](https://github.com/hasura/graphql-engine).

[![Edit realtime-poll](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/hasura/graphql-engine/tree/master/community/sample-apps/realtime-poll?fontsize=14)

The Realtime Poll application is built using React and is powered by Hasura
GraphQL Engine over Postgres. It has an interface for users to cast vote on a
poll and the results are updated in the on-screen bar chart, in real-time.

The application makes use of Hasura GraphQL Engine's real-time capabilities
using `subscription`. There is no backend code involved. The application is
hosted on GitHub pages and the Postgres+GraphQL Engine is running on Postgres.

- Checkout the [live app](https://realtime-poll.demo.hasura.app/).
- Explore the backend using [Hasura
  Console](https://realtime-poll.hasura.app/console).

# Running the app yourself

- Deploy GraphQL Engine on Hasura Cloud and setup PostgreSQL via Heroku:

  [![Deploy to Hasura Cloud](https://graphql-engine-cdn.hasura.io/img/deploy_to_hasura.png)](https://cloud.hasura.io/signup)

- Get the Hasura app URL (say `realtime-poll.hasura.app`)
> 샘플 백엔드 url입니다.
- Clone this repo:
  ```bash
  git clone https://github.com/dong5854/hasura-poll-example.git
  ```
>
- [Install Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html)
> 설치할 필요 없습니다
- Goto `hasura/` and edit `config.yaml`:
  ```yaml
  endpoint: https://realtime-poll.hasura.app
  ```
  > 바꿀 필요 없습니다. 우리는 로컬환경에서 우리가 세팅한 백엔드로 실행할 것입니다.
- Apply the migrations:
  ```bash
  hasura metadata apply
  hasura migrate apply
  hasura metadata reload
  ```
  > 저번에 멘토님이랑 데이터를 전부 넣었기 때문에 할 필요 없습니다.
- Edit `GRAPHQL_ENDPOINT` in `src/apollo.js` and set it to the
  Hasura app URL:
  ```js
  export const GRAPHQL_ENDPOINT = "realtime-poll.hasura.app";
  ```
  > 우리는  `const GRAPHQL_ENDPOINT = "0.0.0.0:8080";` 이렇게 설정해줘야 합니다.
- Run the app (go the root of repo):
  ```bash
  npm install
  npm start
  ```
  > npm install 시에 unable to resolve dependency tree 에러가 뜨면 `npm install --force`또는 `npm install --legacy-peer-deps`를 사용해 설치해 주세요. 해당 옵션들이 필요한 이유는 [해당 링크](https://velog.io/@yonyas/Fix-the-upstream-dependency-conflict-installing-NPM-packages-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EA%B8%B0)를 참조해주세요.