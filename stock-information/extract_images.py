"""
Extract product images from the Roots Gallery stock sheet PDF.
Maps each image to its style number based on page/position order.
Saves as WebP in assets/products/winter-2026/
"""

import fitz
import os
from PIL import Image
import io

PDF_PATH = r"C:\Users\armet\.cursor\projects\c-Projects-Roots-Gallery\attachments\2d6a3ad6-96f0-4762-891a-496499b26465\Copy_of_Copy_of_Personal_Copy_with_costs_of_Roots_Stock_Sheet.xlsx__1_.pdf"

OUT_DIR = r"C:\Projects\Roots-Gallery\assets\products\winter-2026"

# Ordered product style numbers matching PDF order (page 1–5, 8 per page)
STYLE_ORDER = [
    # Page 1
    "tb01", "tb02", "tb03", "tb04", "tb05", "dn01", "dn02", "dn03",
    # Page 2
    "dn04", "dn05", "dn06", "dn07", "dn08", "dn09", "dn10", "dn11",
    # Page 3
    "dn12", "dn13", "dn14", "dn15", "dn16", "dn17", "dn18", "dn19",
    # Page 4
    "dn20", "dn21", "dn22", "dn23", "dn24", "dn25", "bt01", "bt02",
    # Page 5
    "bt03", "bt04", "w01", "w02", "w03", "w04", "z01", "z02",
]

TARGET_MAX_WIDTH  = 800
TARGET_MAX_HEIGHT = 1067   # ~3:4 aspect ratio cap
WEBP_QUALITY      = 85

os.makedirs(OUT_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
style_idx = 0

print("Extracting product images...\n")

for page_num in range(5):  # Pages 0–4 (PDF pages 1–5)
    page = doc[page_num]
    images = page.get_images(full=True)

    if len(images) != 8:
        print(f"WARNING: Page {page_num + 1} has {len(images)} images (expected 8)")

    for img_idx, img in enumerate(images[:8]):
        style = STYLE_ORDER[style_idx]
        xref = img[0]
        raw = doc.extract_image(xref)
        img_bytes = raw["image"]

        pil_img = Image.open(io.BytesIO(img_bytes))

        # Convert CMYK / palette to RGB for WebP
        if pil_img.mode not in ("RGB", "RGBA"):
            pil_img = pil_img.convert("RGB")

        # Downscale if larger than target — preserve aspect ratio
        w, h = pil_img.size
        if w > TARGET_MAX_WIDTH or h > TARGET_MAX_HEIGHT:
            pil_img.thumbnail((TARGET_MAX_WIDTH, TARGET_MAX_HEIGHT), Image.LANCZOS)

        out_path = os.path.join(OUT_DIR, f"{style}.webp")
        pil_img.save(out_path, "WEBP", quality=WEBP_QUALITY, method=6)

        final_w, final_h = pil_img.size
        print(f"  [p{page_num+1} i{img_idx}] {style}.webp  {final_w}x{final_h}  ({os.path.getsize(out_path):,} bytes)")

        style_idx += 1

doc.close()

print(f"\nDone. {style_idx} images saved to {OUT_DIR}")
