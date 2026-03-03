#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

FONTS_DIR="quartz/static/fonts"
KATEX_DIR="quartz/static/katex"
VENDOR_DIR="quartz/static/vendor"

# ── Google Fonts ──────────────────────────────────────────────
echo "==> Downloading Google Fonts..."
mkdir -p "$FONTS_DIR"

GOOGLE_FONTS_URL="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;700&family=Source+Sans+Pro:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;600&display=swap"

# Chrome user-agent triggers woff2-only response
CSS=$(curl -fsSL \
  -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "$GOOGLE_FONTS_URL")

# Download each unique woff2 and rewrite CSS URLs to local paths
# (Google variable fonts reuse the same URL across weights, so deduplicate)
declare -A SEEN
i=0
while IFS= read -r url; do
  if [[ -z "${SEEN[$url]:-}" ]]; then
    fname="gf-${i}.woff2"
    echo "   $fname"
    curl -fsSL -o "${FONTS_DIR}/${fname}" "$url"
    SEEN[$url]="static/fonts/${fname}"
    i=$((i + 1))
  fi
  CSS="${CSS//$url/${SEEN[$url]}}"
done < <(printf '%s\n' "$CSS" | grep -oP 'url\(\Khttps?://[^)]+')

printf '%s\n' "$CSS" > "quartz/styles/fonts.scss"
echo "   Wrote quartz/styles/fonts.scss ($i unique fonts)"

# ── KaTeX (from node_modules) ────────────────────────────────
echo "==> Copying KaTeX assets from node_modules..."
mkdir -p "${KATEX_DIR}/contrib" "${KATEX_DIR}/fonts"

cp node_modules/katex/dist/katex.min.css "${KATEX_DIR}/"
cp node_modules/katex/dist/contrib/copy-tex.min.js "${KATEX_DIR}/contrib/"
cp node_modules/katex/dist/fonts/*.woff2 "${KATEX_DIR}/fonts/"
echo "   Copied katex.min.css, copy-tex.min.js, $(ls "${KATEX_DIR}"/fonts/*.woff2 | wc -l) woff2 fonts"

# ── Mermaid ───────────────────────────────────────────────────
echo "==> Downloading Mermaid ESM..."
mkdir -p "$VENDOR_DIR"

curl -fsSL -o "${VENDOR_DIR}/mermaid.esm.min.mjs" \
  "https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.4.0/mermaid.esm.min.mjs"
echo "   Wrote ${VENDOR_DIR}/mermaid.esm.min.mjs"

echo ""
echo "==> Done! All vendor assets ready."
echo "    Run 'npx quartz build' to verify."
