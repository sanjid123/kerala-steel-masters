## Add PS Steels logo to header and footer

**Steps**
1. Copy uploaded `PS_steels_and_Engineering_Logo_1.png` to `src/assets/ps-steels-logo.png`.
2. Remove background using `imagegen--edit_image` (transparent background) → save as `src/assets/ps-steels-logo.png` (transparent PNG).
3. Update `src/components/site/Header.tsx`: replace the text-based logo block (the two-line "PS Steels / & Engineering" div) with `<img>` of the transparent logo, sized ~h-10 sm:h-12, `alt="PS Steels & Engineering"`, eager loading.
4. Update `src/components/site/Footer.tsx`: add the same logo above/replacing the brand text mark, sized appropriately for footer (~h-12), with proper alt text.

**Out of scope:** color/theme changes, layout restructure beyond the logo swap.