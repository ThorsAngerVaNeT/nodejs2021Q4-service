# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/).

## Downloading

```
git clone https://github.com/ThorsAngerVaNeT/nodejs2021Q4-service
```

## Switch branch

```
git checkout -q task10-nestjs
```

## Running application in Docker

Run command to build images for application and PostgreSQL, and to create and run containers.

```
docker-compose up
```

You can edit the `.env` file before running the command to set the environment settings you like.

Docker composer also create two volumes ('logs' and 'database') at your Docker's volume default folder (``\\wsl$\docker-desktop-data\version-pack-data\community\docker\volumes`` on Windows, ``/var/lib/docker/volumes/`` on Linux), you also can see volumes at "Volumes" page in Docker Desktop app.

You can edit files in the `src` folder while the container is running, after that the application will be automatically restarted inside the container.

After containers are up you can use the application as usual.

To check volumes you can use in terminal:

```
docker volume ls
```

To check networks you can use in terminal:

```
docker network ls
```

## Testing inside Docker

After containers running open new terminal and enter:

```
docker exec -it vanet-trello_node_1 npm run test:auth
```

You could also run test from you localhost, but you need install NPM modules first and then run testing as described in [Testing](#testing)

## Running application without Docker
### Installing NPM modules

```
npm install
```

### Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Postman Collection

You can import [collection](Trello-API.postman_collection.json) to Postman for easier testing and checking API. Token and entities' ids have been put at collection variables after you logging and creating entities to automate request data filling.

## Routes Description
  * `Login`
    * `POST /login` - login user, return JWT
  * `User` (`/users` route)
    * `GET /users` - get all users
    * `GET /users/:userId` - get the user by id (ex. "/users/fec629cb-b440-419a-b479-b374127f477a")
    * `POST /users` - create user
    * `PUT /users/:userId` - update user
    * `DELETE /users/:userId` - delete user
  * `Board` (`/boards` route)
    * `GET /boards` - get all boards
    * `GET /boards/:boardId` - get the board by id
    * `POST /boards` - create board
    * `PUT /boards/:boardId` - update board
    * `DELETE /boards/:boardId` - delete board
  * `Task` (`/boards/:boardId/tasks` route)
    * `GET /boards/:boardId/tasks` - get all tasks
    * `GET /boards/:boardId/tasks/:taskId` - get the task by id
    * `POST /boards/:boardId/tasks` - create task
    * `PUT /boards/:boardId/tasks/:taskId` - update task
    * `DELETE /boards/:boardId/tasks/:taskId` - delete task
  * `Column` (`/boards/:boardId/columns` route)
    * `GET /boards/:boardId/columns` - get all columns
    * `GET /boards/:boardId/columns/:columnId` - get the column by id
    * `POST /boards/:boardId/columns` - create column
    * `PUT /boards/:boardId/columns/:columnId` - update column
    * `DELETE /boards/:boardId/columns/:columnId` - delete column
  * `File` (`/file` route)
    * `POST /file` - send field `file` with file attached to upload to server
    * `GET /file/:fileName` - download file by fileName

## Load Testing
### Express
|                |                                  |                                                                      |
|----------------|----------------------------------|----------------------------------------------------------------------|
| Requests       | [total, rate]                    | 20400, 125/sec                                                       |
| Session Length | [min, mean, 50, 90, 95, 99, max] | 3ms, 6429ms, 122.7ms, 5168ms, 5944.6ms                               |
| Response Time  | [min, mean, 50, 90, 95, 99, max] | 266.4ms, 12175.8ms, 4492.8ms, 11734.2ms, 11971.2ms                   |
| Success        | [ratio]                          | 100.00%                                                              |
| Status Codes   | [code:count]                     | 200:12240, 201:4080, 204:4080                                        |

[Express HTML report](load-testing/artillery-users-test_express.json.html)

[Express CLI Text report](load-testing/Express.txt)

### Fastify
|                |                                  |                                                                      |
|----------------|----------------------------------|----------------------------------------------------------------------|
| Requests       | [total, rate]                    | 20224, 125/sec                                                       |
| Session Length | [min, mean, 50, 90, 95, 99, max] | 3ms, 5482ms, 82.3ms, 4403.8ms, 5168ms                                |
| Response Time  | [min, mean, 50, 90, 95, 99, max] | 273.5ms, 10770.1ms, 3605.5ms, 10201.2ms, 10617.5ms                   |
| Success        | [ratio]                          | 100.00%                                                              |
| Status Codes   | [code:count]                     | 200:12130, 201:4037, 204:4035                                        |

[Fastify HTML report](load-testing/artillery-users-test_fastify.json.html)

[Fastify CLI Text report](load-testing/Fastify.txt)