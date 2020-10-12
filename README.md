# emmabot

Discord bot used to manage the http://discord.com/frens written in TypeScript for a Node.js environment. The goal of this project is to create bot which will eventually be made generic for any server and configured entirely via json files rather than web interfaces or discord commands like many other bots. It should also provide a nice reusable set of single purpose functions which will be distributed as a library.

## TODOS (need to sort through these)

- TODO: create a ban feature for users that are not part of the server (have json file for the bans because server maintainer can just update that and have bot react on guildMemberJoin)
- TODO: statistics on how often channels and bots are used
- TODO: automatically disconnect afk people
- TODO: I'm going to create a hall of fame board for posts that get a certain number of reacts :ThanosOkay:
- TODO: create an invite webapp that keeps track of both sides the invite https://discord.js.org/#/docs/main/stable/class/Invite?scrollTo=targetUser
  - have a link to create invites oauth2
  - generate link for person to join
  - potentially use some sort of staging area, allow them join
- TODO: create logging channel keeping track of all emmabot actions.
- TODO: pull out all configuration into a separate folder to begin the process of making the bot generic
- TODO: add feature to create new vc and text chat when they become full
- TODO: create hydrabot alternative https://discord.js.org/#/docs/main/stable/topics/voice
- TODO: store all gpt2 questions somewhere for training later
- TODO: add a yes no feature
- TODO: setup alerts on new reaction to enby post
- TODO: delete backups older than a week? or maybe month?
- TODO: make separate command for different temperatures in gpt2
- TODO: Make this code guild agnostic
- TODO: add command to list out all commands
- TODO: Consider adding sticky roles?
- TODO: Consolidate ignore files somehow??

## Low priority dev environment stuff

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
