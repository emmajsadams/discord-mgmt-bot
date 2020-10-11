# emmabot

TODO: Logging (with channel exclusions)
TODO: create a ban feature for users that are not part of the server (have json file for the bans because server maintainer can just update that and have bot react on guildMemberJoin)
TODO: Switch over to typescript and tslint https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html https://github.com/TypeStrong/ts-node https://fireship.io/snippets/hot-reload-node-typescript-server/

## Low priority stuff

TODO: configure githooks to prevent errors before commit (vscode mostly does this ) https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
TODO: pull out all configuration into a separate folder to begin the process of making the bot generic
TODO: add feature to create new vc and text chat when they become full
TODO: create hydrabot alternative https://discord.js.org/#/docs/main/stable/topics/voice
TODO: create a dev/test mode that avoids making changes and just logs them instead
TODO: store all questions of jadebot somewhere for training later
TODO: add a yes no feature
TODO: document environment variables and set them up locally in my shell
TODO: setup alerts on new reaction to enby post
TODO: delete backups older than a week? or maybe month?
TODO: make separate command for different temperatures in gpt2
TODO: Make this code guild agnostic
TODO: add command to list out all commands
TODO: Consider adding sticky roles?

# Deployment

Automatically deployed to DigitalOcean on commit to master. https://cloud.digitalocean.com/apps/b8465d5b-8c18-49df-a0a2-08e1f73ede27/console/emmabot?i=3b43d1

https://emmabot-2n2rx.ondigitalocean.app/
https://emmabot-2n2rx.ondigitalocean.app/backup

# File storage

https://s3.console.aws.amazon.com/s3/buckets/emmabot/?region=us-west-2&tab=overview

# Directory structure

https://gist.github.com/tracker1/59f2c13044315f88bee9

# linting

eslint is the preferred linter https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

# node vesrsion target mapping

https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping
