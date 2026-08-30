# Asset pipeline

Two things run on their own, and one needs a person.

## Automatic — images

`npm run build` runs `optimise-images.mjs` first and `check-weight.mjs` after,
so nothing needs remembering:

- **Deck panels** (`00.jpg`, `01.png`, … in a `public/projects/<slug>/` folder)
  become WebP and the original is removed. Typically halves their weight.
- **Thumbnails** (`thumb.jpg`) stay JPEG, because they double as the preview
  card when a page is shared and not every social scraper reads WebP. They are
  re-encoded if heavier than they need to be.
- **Anything wider than 2304px** is scaled down. Nothing is displayed larger,
  so those pixels were never visible.

Drop artwork straight out of a design export or off a phone; the build handles
it. To run it without building: `npm run optimise`.

## Automatic — the safety net

`check-weight.mjs` prints what every page weighs and **fails the build** if a
single file exceeds 1.5MB or a page exceeds 3MB. It exists to catch the mistake
that actually happens: a full-resolution photo or an untouched phone video
quietly shipping to visitors. The build stops and names the file rather than the
site just becoming slow.

If the site legitimately outgrows a budget, raise it at the top of that file —
but check it is not a stray export first.

## Manual — video

Video is not automated. Encoding takes minutes, needs ffmpeg, and the two
choices that matter are judgement calls a script cannot make: **which eight
seconds** to loop, and **which frame** to leave sitting there. Both decide
whether anyone hovers at all.

A tile clip is a short, silent, 4:5 loop that costs nothing until hovered.
From a full reel:

```sh
SRC=reel.mp4          # the original export
OUT=public/projects/<slug>/<name>
START=6.5             # where the loop begins — pick this deliberately
VF="crop=iw:iw*5/4,scale=720:900:flags=lanczos"

# Poster: the frame the loop starts on, so hovering doesn't jump
ffmpeg -ss $START -i $SRC -frames:v 1 -vf "$VF" -q:v 2 $OUT.jpg

# VP9 for Chrome and Firefox — usually the smaller of the two
ffmpeg -ss $START -t 8 -i $SRC -vf "$VF" -an -c:v libvpx-vp9 \
  -crf 46 -b:v 0 -row-mt 1 -cpu-used 4 -pix_fmt yuv420p $OUT.webm

# H.264 for Safari and iOS
ffmpeg -ss $START -t 8 -i $SRC -vf "$VF" -an -c:v libx264 -profile:v high \
  -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart $OUT.mp4
```

Then in `lib/content.ts`, give the post a `cover` and a `video` — the `video`
path carries **no extension**, since both encodes are offered from it:

```ts
{
  url: "https://www.instagram.com/reel/…/",
  type: "reel",
  caption: "Manufacturing, but make it Whiplash",
  cover: "/projects/adorn-silver/manufacturing-whiplash.jpg",
  video: "/projects/adorn-silver/manufacturing-whiplash",
}
```

A 30–70 second reel lands around 450–650KB this way, and `preload="none"` means
even that is not fetched until a visitor hovers the tile. Touch devices, having
no hover, keep the still and let the tap open Instagram instead.

Keep the original full-length export out of the repo. The full reel already
lives on Instagram, which is where the tile links.
