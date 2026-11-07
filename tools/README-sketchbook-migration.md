# Private artwork to public website migration

The original sketchbook collection in `Hearin1/HearinsBrewRep` is approximately 1.2 GB. Do **not** publish the original private repository or use a public GitHub token to access it.

This script builds **optimized public copies** of all supported images in `Good Artworks`, `Comic Strips`, and `Doodles`, plus the sketchbook's book/background artwork. It writes `assets/sketchbook/manifest.json` for the website's random-page viewer.

## Run locally

1. Clone both repositories into sibling directories using your own GitHub authentication:
   `git clone git@github.com:Hearin1/Hearin-s-Brew.git`
   `git clone git@github.com:Hearin1/HearinsBrewRep.git`
2. From `Hearin-s-Brew`, install Pillow: `python -m pip install Pillow`
3. Run `python tools/migrate_sketchbook.py --source ../HearinsBrewRep`.
4. Inspect the total output size and image quality. If the output exceeds the GitHub Pages publishing source size limit (1 GB), lower `MAX_EDGE` or `QUALITY` in the script and rerun.
5. Commit the generated `assets/sketchbook/` files to the website repository. Only the optimized copies become public.

**Important:** This preparation pull request does not yet switch the live sketchbook away from Cloudinary. First commit the generated images and manifest, then update `my-sketch-book.html` to fetch `assets/sketchbook/manifest.json` and use `assets/sketchbook/book.webp`, and update `skecthBook.css` to use `assets/sketchbook/background.webp`. This order prevents broken images.

The original private repo stays private. The exported artwork is publicly accessible by design. GIFs in these three source folders are converted to still WebP images.
