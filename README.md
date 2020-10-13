# emmabot

Discord bot used to manage the http://discord.com/frens written in TypeScript for a Node.js environment. The goal of this project is to create bot which will eventually be made generic for any server and configured entirely via json files rather than web interfaces or discord commands like many other bots. It should also provide a nice reusable set of single purpose functions which will be distributed as a library.

## TODO:

- TODO: add command to lookup user by id (maybe just link to 325088597286060044)
- TODO: look into access denied for presigned url (consider surrounding link in code blocks or using link syntax?)
- TODO: warn for new accounts under a certain age joining and creating invites (if account less than X days post to high priority low spam monitored channel)
- TODO: create logging channel keeping track of all emmabot actions (that are not in audit log, this might)
- TODO: confirm audit log is backed up (probably is but if not note it in the search channel)
- TODO: Hall of fame board for posts that get a certain number of reacts :ThanosOkay:
- TODO: statistics on how often channels and bots are used
- TODO: create hydrabot alternative https://discord.js.org/#/docs/main/stable/topics/voice
- TODO: store all gpt2 questions somewhere for training later
- TODO: setup feature to post in channel on new react (for enby post)

# TODO: low priority stuff

- TODO: figure out some way to represent diff? maybe sepparate message? or uploaded file??
- TODO: add command to list out all commands
- TODO: add feature to create new vc and text chat when they become full
- TODO: figure out how to handle attachments for backup and messageDelete logs
  - ideally I can get them off the deleted message object, if not save the attachments when it is created.. use hash table attachment)
- TODO: pull out all configuration into a separate folder to begin the process of making the bot generic
- TODO: delete backups older than a week? or maybe month?
- TODO: Make this code guild agnostic
- TODO: Create a tool to export custom logs and audit logs to json for data processing (maybe import into progress) then allow a cli/bot to search.
- TODO: create a ban feature for users that are not part of the server (have json file for the bans because server maintainer can just update that and have bot react on guildMemberJoin)
- TODO: automatically disconnect afk people
- TODO: Consider adding sticky roles?
- TODO: create an invite webapp that keeps track of both sides the invite https://discord.js.org/#/docs/main/stable/class/Invite?scrollTo=targetUser (likely just wait for an api discord)
  - have a link to create invites oauth2
  - generate link for person to join
  - potentially use some sort of staging area, allow them join
- TODO: add a yes no feature
- TODO: make separate command for different temperatures in gpt2
- TODO: create a unique role set

## Low priority dev environment stuff

- TODO: convert to tabs
- TODO: setup https://editorconfig.org/
- TODO: setup https://www.npmjs.com/package/tsconfig.js and convert tsconfig.js to json
- TODO: move to allow and deny lists
- TODO: Consolidate ignore files somehow??
- TODO: just use lodash foreach and stop posting cringe on main
- TODO: change ids to snowflakes
- TODO: create docker file and migrate to google cloud (with a custom domain name) then shutdown digital ocean instance
- TODO: make tsconfig settings as strict as possible (avoid any, do not allow js, add types for everything)
- TODO: structure this readme in a more thoughtful way
- TODO: create a dev/test mode that avoids making changes and just logs them instead
- TODO: document environment files and .dotenv
- TODO: configure githooks to prevent errors before commit (vscode mostly does this ) https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
- TODO: add tests

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

https://fireship.io/snippets/hot-reload-node-typescript-server/
Migration tool https://github.com/airbnb/ts-migrate/tree/master/packages/ts-migrate

# discord schema notes

// Message schema - https://discord.com/developers/docs/resources/channel#message-object
