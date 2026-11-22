#!/bin/sh
set -e
cd "$(dirname "$0")/.."
uri=$(python3 -c 'import pathlib; print(pathlib.Path("meme/crew-select.html").resolve().as_uri())')
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1080,1080 \
  --default-background-color=FF1A0D28 \
  --screenshot="$PWD/meme.png" "$uri"
python3 - << 'PY'
from PIL import Image
im = Image.open("meme.png").convert("RGB")
if im.size != (1080, 1080):
    raise SystemExit(f"expected 1080x1080, got {im.size}")
im.save("meme.png")
im.resize((480, 480), Image.Resampling.LANCZOS).save("meme/preview-480.png")
print("wrote meme.png and meme/preview-480.png")
PY
