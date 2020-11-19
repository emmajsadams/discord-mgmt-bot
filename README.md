Discord bot written in TypeScript for a Node.js environment. The goal of this project is to create bot which will eventually be made generic for any server and configured entirely via json files rather than web interfaces or discord commands like many other bots. It should also provide a nice reusable set of single purpose functions which will be distributed as a library.

Note current build is not quite working due to some recent refactors. I will be fixing it soon. If you need a working build restore to this commit https://gitlab.com/EmmaJCline/discord-mgmt-bot/-/commit/f3f2585eadf5c304d7b7a2754a0ebcda29efab63

# Setup

- Configure a .env file using the template included. (for developers use this private snippet Emma can give you access to https://gitlab.com/-/snippets/2041403)
- Build docker file and deploy to kubernetes

# Deployment

GCE kubernetes cluster

# Directory structure

https://gist.github.com/tracker1/59f2c13044315f88bee9

# linting

eslint is the preferred linter https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

# node vesrsion target mapping

https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping

# Typescript

https://stackoverflow.com/questions/61305578/what-typescript-configuration-produces-output-closest-to-node-js-14-capabilities
https://fireship.io/snippets/hot-reload-node-typescript-server/
Migration tool https://github.com/airbnb/ts-migrate/tree/master/packages/ts-migrate

# discord schema notes

// Message schema - https://discord.com/developers/docs/resources/channel#message-object
