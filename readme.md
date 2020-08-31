# Desired setup for TypeScript project references

This app is a todo app made up of 3 projects

client - react app  
server - express app  
shared - common code between the client and server app

## Tools

### WebPack

Uses ts-loader

### Jest

Uses ts-jest

## Fresh Clone Issues

Run `git clean -dfx && yarn` to get back into this state (ensure you don't have any pending changes)

### ts-loader relative paths issue

[server] ERROR in ./shared/dist/index.js
[server] Module not found: Error: Can't resolve './app' in '/Users/jakeginnivan/\_code/ts-project-references/shared/dist'
[server] @ ./shared/dist/index.js 7:14-30
[server] @ ./server/src/app.ts
[server] @ ./server/src/index.ts
[server] @ multi ./server/src/index.t

./app should be resolved from `./server/src/` not `shared/dist`

#### Resolution

Add `"module": "src/index.ts",` to shared/package.json

### Jest does not trigger compilation of project references

server/src/app.test.ts
Cannot find module 'shared' from 'app.ts'

Note: After initial build, changes are picked up fine

--watch also picks up shared changes in server project

### First change to react project takes a very long time to compile

Edit client/src/index.tsx, with `hot: true` it will not report finishing compilation

Without hot: true, it just takes a long time, subsiquent changes work well
