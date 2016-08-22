# Brianclements.net

This repository is the source for my personal [site and blog].

[site and blog]: http://brianclements.net

## Build/Deploy

All management tools can be found in the `blox` (**BL**og toolb**OX**) bash script.

```
./blox -h
Usage: "blox" [<subcommands>] [<switches>] [<options>]

My BLog management toolbOX.

Builds by default.

Subcommands:
    new             Creates a new post. File path, filename, and date parity
                    between posts, hrefs within the post, and the location of
                    images in the static folder gets tedious when doing
                    manually.

        -l          Store in local drafts folder '/src/drafts', which is
                    invisible to git and frog. Otherise, it goes in
                    '/src/frog/posts'

        --date      Date of post

        --title     Title of post

        --image     Image(s) to include. Call for each image. Will prepend
                    --title to picture name and create appropriate folder
                    structure based on --date within the 'img' static assets
                    folder.

Switches:
    -d              Development mode. Symlinks CSS, Images, and JS folders
                    instead of copying them for quicker editing and shorter
                    build time.

    -i              Ignore posts in local drafts folder when building. Otherwise
                    any files in '/src/drafts/posts' and '/src/drafts/img' as
                    created by `blox new` command will be folded into their
                    respective locations in '/src/frog/ and '/src/static/img'.

    -s              Serves site after build using frogs internal server. See
                    --serve-root.


Options:
    --deploy        Deploy to Github after build. Assumes a working and
                    properly configured local git and ssh configuration. This
                    script is meant to be run from your development
                    workstation, not drones or other build tools. This decision
                    was so that I could reuse existing credentials and keys as
                    when I commit/ssh manually.

    --reset         Cleans build dir and deletes frog internal cache.

    --serve-root    Directory to serve when using -s switch. Uses build
                    directory by default, not project root.

    -v|--version    Version

    -h|--help       This help

Requirements:


racket: frog, markdown
github account, ssh, git

Version:

blox version: 0.1.0
Last modifed on: 2016.08.17-10:13
```
