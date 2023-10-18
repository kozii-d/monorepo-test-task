## System requirements

For local application starting (for development) make sure that you have locally installed next applications:
- [Docker](https://www.docker.com/get-started) (Last version recommended)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/)

## Development requirements

For correct application work (for development) make sure that you have locally installed next applications:
- [Node.js 18+](https://nodejs.org/)

## Fast application starting

Just execute into your terminal next commands:

```bash
$ cp packages/backend/.env.example packages/backend/.env
$ make deploy-dev
```

## Makefile Command Description

### `deploy-dev`
- Starts the database, installs all dependencies, builds all projects, and starts the server in development mode.

### `deploy-prod`
- Starts the database, installs all dependencies, builds all projects, and starts the server in production mode.

### `install`
- Navigates to each sub-directory of the projects (`frontend`, `backend`, `ui-kit`) and installs dependencies using `pnpm install`.
- Also performs a database migration using Prisma in the `backend` directory.

### `build`
- Navigates to each sub-directory of the projects (`frontend`, `backend`, `ui-kit`) and builds the projects using `pnpm build`.

### `start-dev`
- Starts the server in development mode using the command `pnpm dev` in the `backend` directory.

### `start-prod`
- Starts the server in production mode using the command `pnpm prod` in the `backend` directory.

### `db`
- Starts the database using the command `pnpm docker-up`.

