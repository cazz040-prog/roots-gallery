import fitz
import sys

PDF_PATH = r"C:\Users\armet\.cursor\projects\c-Projects-Roots-Gallery\attachments\2d6a3ad6-96f0-4762-891a-496499b26465\Copy_of_Copy_of_Personal_Copy_with_costs_of_Roots_Stock_Sheet.xlsx__1_.pdf"

doc = fitz.open(PDF_PATH)
print(f"Total pages: {len(doc)}")

for page_num in range(min(6, len(doc))):
    page = doc[page_num]
    imgs = page.get_images(full=True)
    print(f"\nPage {page_num + 1}: {len(imgs)} image(s)")
    for idx, img in enumerate(imgs[:12]):
        xref = img[0]
        info = doc.extract_image(xref)
        ext = info["ext"]
        w = info["width"]
        h = info["height"]
        size = len(info["image"])
        print(f"  [{idx}] xref={xref}  {w}x{h}  .{ext}  {size} bytes")

doc.close()
