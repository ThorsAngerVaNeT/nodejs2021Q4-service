# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/ThorsAngerVaNeT/nodejs2021Q4-service
```

## Switch branch

```
git checkout -q task7-docker
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
