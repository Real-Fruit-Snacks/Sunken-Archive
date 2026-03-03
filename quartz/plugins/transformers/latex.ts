import { readFileSync } from "fs"
import { join } from "path"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMathjax from "rehype-mathjax/svg"
//@ts-ignore
import rehypeTypst from "@myriaddreamin/rehype-typst"
import { QuartzTransformerPlugin } from "../types"
import { KatexOptions } from "katex"
import { Options as MathjaxOptions } from "rehype-mathjax/svg"
//@ts-ignore
import { Options as TypstOptions } from "@myriaddreamin/rehype-typst"

interface Options {
  renderEngine: "katex" | "mathjax" | "typst"
  customMacros: MacroType
  katexOptions: Omit<KatexOptions, "macros" | "output">
  mathJaxOptions: Omit<MathjaxOptions, "macros">
  typstOptions: TypstOptions
}

// mathjax macros
export type Args = boolean | number | string | null
interface MacroType {
  [key: string]: string | Args[]
}

export const Latex: QuartzTransformerPlugin<Partial<Options>> = (opts) => {
  const engine = opts?.renderEngine ?? "katex"
  const macros = opts?.customMacros ?? {}
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath]
    },
    htmlPlugins() {
      switch (engine) {
        case "katex": {
          return [[rehypeKatex, { output: "html", macros, ...(opts?.katexOptions ?? {}) }]]
        }
        case "typst": {
          return [[rehypeTypst, opts?.typstOptions ?? {}]]
        }
        default:
        case "mathjax": {
          return [
            [
              rehypeMathjax,
              {
                ...(opts?.mathJaxOptions ?? {}),
                tex: {
                  ...(opts?.mathJaxOptions?.tex ?? {}),
                  macros,
                },
              },
            ],
          ]
        }
      }
    },
    externalResources(ctx) {
      switch (engine) {
        case "katex": {
          const baseUrl = ctx.cfg.configuration.baseUrl ?? "localhost"
          const basePath = new URL(`https://${baseUrl}`).pathname.replace(/\/$/, "")
          const root = process.cwd()

          // Inline KaTeX CSS with font URLs rewritten to self-hosted paths
          let katexCss = readFileSync(join(root, "quartz/static/katex/katex.min.css"), "utf-8")
          katexCss = katexCss.replace(/url\(fonts\//g, `url(${basePath}/static/katex/fonts/`)

          // Inline copy-tex JS
          const copyTexJs = readFileSync(
            join(root, "quartz/static/katex/contrib/copy-tex.min.js"),
            "utf-8",
          )

          return {
            css: [{ content: katexCss, inline: true }],
            js: [
              {
                script: copyTexJs,
                loadTime: "afterDOMReady",
                contentType: "inline",
              },
            ],
          }
        }
      }
    },
  }
}
