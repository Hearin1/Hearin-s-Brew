#!/usr/bin/env python3
"""Build public, optimized sketchbook assets from a local private-repository checkout.

Usage:
  python -m pip install Pillow
  python tools/migrate_sketchbook.py --source ../HearinsBrewRep
"""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageOps, UnidentifiedImageError

FOLDERS = ("Good Artworks", "Comic Strips", "Doodles")
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
MAX_EDGE = 1400
QUALITY = 76

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True, help="Local checkout of private HearinsBrewRep")
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1], help="Public website checkout")
    args = parser.parse_args()
    source = args.source.expanduser().resolve()
    output = args.output.expanduser().resolve()
    destination = output / "assets" / "sketchbook"
    destination.mkdir(parents=True, exist_ok=True)
    manifest = []
    failed = []
    for folder in FOLDERS:
        root = source / folder
        if not root.is_dir():
            parser.error(f"Missing source folder: {root}")
        for file in sorted(root.rglob("*")):
            if not file.is_file() or file.suffix.lower() not in EXTENSIONS:
                continue
            relative = file.relative_to(source).with_suffix(".webp")
            target = destination / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            try:
                with Image.open(file) as original:
                    # Sketchbook is a still-image viewer; use first frame for animated files.
                    original.seek(0)
                    image = ImageOps.exif_transpose(original)
                    image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
                    if image.mode not in ("RGB", "RGBA"):
                        image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
                    image.save(target, "WEBP", quality=QUALITY, method=6)
                manifest.append(target.relative_to(output).as_posix())
            except (OSError, ValueError, UnidentifiedImageError) as exc:
                failed.append(f"{file}: {exc}")
    # Include the original book and background as optimized, local copies.
    for name, dest in (("Book.png", "book.webp"), ("background blank.png", "background.webp")):
        file = source / "Drawings I made" / name
        if not file.is_file():
            parser.error(f"Missing required image: {file}")
        with Image.open(file) as original:
            image = ImageOps.exif_transpose(original)
            image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
            image.save(destination / dest, "WEBP", quality=85, method=6)
    (destination / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Exported {len(manifest)} artwork images to {destination}")
    print(f"Output size: {sum(f.stat().st_size for f in destination.rglob('*') if f.is_file()) / 1024**2:.1f} MiB")
    if failed:
        print("FAILED IMAGES:")
        print("\n".join(failed))
        raise SystemExit(1)

if __name__ == "__main__":
    main()
