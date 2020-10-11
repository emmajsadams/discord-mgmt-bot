# emmabot

TODO: Logging (with channel exclusions)
TODO: Figure out how to handle logs (backup to gdrive???)
TODO: Switch over to typescript and tslint https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
TODO: add retries for any network operation
TODO: create a ban feature for users that are not part of the server (have json file for the bans because server maintainer can just update that and have bot react on guildMemberJoin)

## Low priority stuff

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
