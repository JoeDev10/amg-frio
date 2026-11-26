#!/usr/bin/env python3
"""Armar un index.html autocontenido para GitHub Pages.

CSS y JS van inline. Imágenes y fuentes se incrustan como data URIs,
incluyendo url() del CSS y rutas img/... referenciadas desde JS/config.
Si un archivo no existe (p.ej. img/antes-*.jpg de placeholders), se deja la ruta.
"""
from __future__ import annotations

import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent / "site-v2"
OUT = Path(__file__).resolve().parent / "bundle" / "index.html"

MIME = {
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".ttf": "font/ttf",
    ".otf": "font/otf",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".css": "text/css",
    ".js": "text/javascript",
}


def mime_for(path: Path) -> str:
    return MIME.get(path.suffix.lower()) or mimetypes.guess_type(path.name)[0] or "application/octet-stream"


def data_uri(path: Path) -> str:
    data = path.read_bytes()
    mime = mime_for(path)
    b64 = base64.b64encode(data).decode("ascii")
    return f"data:{mime};base64,{b64}"


def resolve_asset(base: Path, ref: str) -> Path | None:
    ref = ref.strip().strip("\"'").split("?", 1)[0].split("#", 1)[0]
    if not ref or ref.startswith(("data:", "http://", "https://", "//", "mailto:", "tel:")):
        return None
    candidate = (base / ref).resolve()
    try:
        candidate.relative_to(ROOT.resolve())
    except ValueError:
        # allow only files under site root
        return None
    return candidate if candidate.is_file() else None


# Paths like img/foo.webp, ./img/foo.webp, ../fonts/x.woff2
ASSET_RE = re.compile(
    r"""(?P<prefix>url\(\s*['"]?|['"])(?P<path>(?:\.\./|\./)?(?:img|fonts|css|js)/[^'"\s\)?,]+)(?P<suffix>['"]?\s*\)|['"])"""
)


def embed_assets(text: str, base: Path) -> str:
    def repl(m: re.Match) -> str:
        path = resolve_asset(base, m.group("path"))
        if not path:
            return m.group(0)
        uri = data_uri(path)
        prefix, suffix = m.group("prefix"), m.group("suffix")
        return f"{prefix}{uri}{suffix}"

    return ASSET_RE.sub(repl, text)


def main() -> None:
    html_path = ROOT / "index.html"
    html = html_path.read_text(encoding="utf-8")
    html_dir = html_path.parent

    # Inline CSS
    def css_tag(m: re.Match) -> str:
        href = re.search(r'href=["\']([^"\']+)["\']', m.group(0))
        if not href:
            return m.group(0)
        css_path = resolve_asset(html_dir, href.group(1))
        if not css_path:
            return m.group(0)
        css = embed_assets(css_path.read_text(encoding="utf-8"), css_path.parent)
        return f"<style>\n{css}\n</style>"

    html = re.sub(r'<link\b[^>]*rel=["\']stylesheet["\'][^>]*>', css_tag, html)

    # Drop preload of local assets (they are already inlined as data URIs)
    html = re.sub(
        r'\n?\s*<link\b[^>]*rel=["\']preload["\'][^>]*>',
        lambda m: m.group(0) if "http" in m.group(0) else "",
        html,
    )

    # Inline JS (keep order)
    def js_tag(m: re.Match) -> str:
        src = re.search(r'\ssrc=["\']([^"\']+)["\']', m.group(0))
        if not src:
            return m.group(0)
        js_path = resolve_asset(html_dir, src.group(1))
        if not js_path:
            return m.group(0)
        js = embed_assets(js_path.read_text(encoding="utf-8"), js_path.parent)
        return f"<script>\n{js}\n</script>"

    html = re.sub(r'<script\b[^>]*\ssrc=["\'][^"\']+["\'][^>]*>\s*</script>', js_tag, html)

    # Remaining HTML asset refs (img src, icon href, og:image, etc.)
    html = embed_assets(html, html_dir)

    # Also catch bare src=/href=/content= that the regex might miss with different quoting
    def attr_repl(m: re.Match) -> str:
        attr, quote, ref = m.group("attr"), m.group("quote"), m.group("path")
        path = resolve_asset(html_dir, ref)
        if not path:
            return m.group(0)
        return f"{attr}={quote}{data_uri(path)}{quote}"

    html = re.sub(
        r'(?P<attr>\b(?:src|href|content))=(?P<quote>["\'])(?P<path>(?:\.\./|\./)?(?:img|fonts)/[^"\']+)(?P=quote)',
        attr_repl,
        html,
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    # newline="\n" para que en Windows no quede todo el archivo con CRLF
    # y git no muestre un diff falso de miles de líneas.
    OUT.write_text(html, encoding="utf-8", newline="\n")
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")

    # La imagen de Open Graph NO se incrusta: las redes sociales necesitan una
    # URL absoluta a un archivo real. Se copia junto al index.html del bundle.
    for extra in ("og-cover.jpg",):
        src = ROOT / "img" / extra
        if src.is_file():
            dst = OUT.parent / "img" / extra
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_bytes(src.read_bytes())
            print(f"Copied {src.name} -> {dst}")
        else:
            print(f"AVISO: falta {src}; la preview de WhatsApp y redes no va a funcionar.")

    # Sanity: leftover local refs
    leftovers = []
    for m in re.finditer(r"""(?:src|href|content|url\()\s*[=:]?\s*['"]?((?:\.\./|\./)?(?:img|fonts|css|js)/[^'"\s\)]+)""", html):
        leftovers.append(m.group(1))
    if leftovers:
        print("Leftover local refs (ok if files do not exist yet):")
        for ref in leftovers:
            exists = resolve_asset(html_dir, ref)
            print(f"  {ref}  exists={bool(exists)}")
    else:
        print("No leftover local img/fonts/css/js references.")


if __name__ == "__main__":
    main()
