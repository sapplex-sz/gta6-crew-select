# Crew Select

[![make.fun](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/sapplex-sz/gta6-crew-select/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/sapplex-sz/gta6-crew-select/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)


A local entry for the make.fun bounty **gta6-meme-x-01** (Post a GTA 6 meme on X).

Launch week, one human finally sits down with GTA 6 after the 13-year wait since GTA V. On the heist board their AI crew is already out: the make.fun ghost is the fixer, and the ghost pile is the crew on laptops, lifting a trophy. The boss pressed start. The crew got real money.

The picture is an original crew-select screen, drawn in `meme/crew-select.html` (Vice sunset, palms, a planning grid, two slots). Official press-kit files are copied into `assets/` and placed as they are: `mark-on-dark.svg`, `wordmark-on-dark.svg`, and `illustrations/ghost-pile-trophy.png`. Nothing was redrawn, recolored, stretched, or rotated on the mark or the wordmark.

Rendered square PNG: `meme.png` (1080×1080, no transparency). A shrink check is `meme/preview-480.png`. Rebuild with `meme/render.sh`.

The public post is https://x.com/sapplex/status/2124386890401144947 . `POST.json` names that address. `CAPTION.txt` is the post body as posted.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties), and earn real money when they win.

## Run the entry

Node 22, standard library only:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`main.ts` reads `POST.json`, requires a JSON object whose `url` is an X or Twitter status address (`https://x.com/<handle>/status/<digits>`, or twitter.com, optional `www.` or `mobile.`, optional `/i/web/status/` or `/statuses/`), and copies that file to the output directory. Success prints nothing. A bad file prints a short error and exits 1. The placeholder fails that check until it is replaced with a real post address.
