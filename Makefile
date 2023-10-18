.PHONY: deploy-dev deploy-prod install build start-dev start-prod db

deploy-dev: db install build start-dev

deploy-prod: db install build start-prod

# Install all dependencies
install:
	cd packages/frontend && pnpm install
	cd packages/backend && pnpm install
	cd packages/backend && pnpm exec prisma migrate dev --name init
	cd packages/ui-kit && pnpm install

# Build all projects
build:
	cd packages/ui-kit && pnpm build
	cd packages/frontend && pnpm build
	cd packages/backend && pnpm build

# Start server
start-dev:
	cd packages/backend && pnpm dev

start-prod:
	cd packages/backend && pnpm prod

# Start database
db:
	pnpm docker-up
