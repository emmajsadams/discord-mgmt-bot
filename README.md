Discord bot written in TypeScript for a Node.js environment. The goal of this project is to create bot which will eventually be made generic for any server and configured entirely via json files rather than web interfaces or discord commands like many other bots. It should also provide a nice reusable set of single purpose functions which will be distributed as a library.

Note current build is not quite working due to some recent refactors. I will be fixing it soon. If you need a working build restore to this commit https://gitlab.com/EmmaJCline/discord-mgmt-bot/-/commit/f3f2585eadf5c304d7b7a2754a0ebcda29efab63

## TODO:

- reevaluate all the todos in light of finishing this project and polishing it off (yeet music?)
- move config and types folder out of src?
- Move all types to types folder
- Move all config to config folder
- Say how long someone was in the server when they leave
- Separate nsfw logs into a different channel
- Create hydrabot alternative https://discord.js.org/#/docs/main/stable/topics/voice
- Warn for new accounts under a certain age joining and creating invites (if account less than X days post to high priority low spam monitored channel)
- Create logging channel keeping track of all emmabot actions (that are not represented in auditlog)
- Hall of fame board for posts that get a certain number of reacts :ThanosOkay:
- Create help command
- Basic statistics on how often channels and bots are used
- Make this code guild agnostic and able to be imported/configured by other servers (all config in separate folder, names not specific to friends server)
- Add unit tests

# TODO: low priority stuff

- Setup feature to post in channel on new react (for enby post)
- Feature to create voice/text channel on demand then delete after people leave
- Store all gpt2 questions somewhere for training later
- Export all logs and audit logs to SQL database for querying
- Create a ban feature for users that are not part of the server (have json file for the bans because server maintainer can just update that and have bot react on guildMemberJoin)
- Make separate command for different temperatures in gpt2
- Enforce unique set of roles on all users? (acquantince/friend/homie)
- Sticky roles?
- Upload backups to s3 also?
- Automatically upload files to s3 if server does not support attachments that large

## TODO Low priority dev environment stuff

- look into https://asdf-vm.com/#/
- Investigate using https://github.com/denoland/deno
- Upload .env file to private github gist or notes (maybe automated way to do this)
- Create docker file and deploy using hashicorp somewhere else besides digitalocean (maybe GCE credits)
- Investigate this project https://github.com/dandv/typescript-modern-project#import-your-own-modules-without-specifying-an-extension
- Consider converting to tabs for accessiblity
- Setup https://editorconfig.org/
- Make Typescript type settings strict with no allowed js (Use discord.js types like snowflake consistently, etc..)
- Create a test mode that will log when create/delete/update actions are taken instead of doing them rather than a full disable of feature for testing
- Structure this readme in a more thoughtful way
- Document environment files and .dotenv
- Add automated tests
- look into https://www.npmjs.com/package/ts-node

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

# Typescript

https://stackoverflow.com/questions/61305578/what-typescript-configuration-produces-output-closest-to-node-js-14-capabilities
https://fireship.io/snippets/hot-reload-node-typescript-server/
Migration tool https://github.com/airbnb/ts-migrate/tree/master/packages/ts-migrate

# discord schema notes

// Message schema - https://discord.com/developers/docs/resources/channel#message-object
