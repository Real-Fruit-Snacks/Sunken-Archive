import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"
import { Element, Root } from "hast"

const HASH_COMMENT = new Set([
  "bash",
  "sh",
  "zsh",
  "python",
  "ruby",
  "perl",
  "r",
  "yaml",
  "yml",
  "toml",
  "makefile",
  "dockerfile",
  "powershell",
  "pwsh",
])

const MARKUP_COMMENT = new Set(["html", "xml", "svg", "markdown", "md"])

function langComment(lang: string, label: string): string {
  const l = lang.toLowerCase()
  if (HASH_COMMENT.has(l)) return `# --- ${label} ---`
  if (MARKUP_COMMENT.has(l)) return `<!-- --- ${label} --- -->`
  return `// --- ${label} ---`
}

export const CombinedCode: QuartzTransformerPlugin = () => {
  return {
    name: "CombinedCode",
    htmlPlugins() {
      return [
        () => (tree: Root, file) => {
          if (!file.data.frontmatter?.["combined-code"]) return

          const blocks: { lang: string; text: string }[] = []

          visit(tree, "element", (node: Element) => {
            if (node.tagName !== "figure" || !node.properties?.["dataRehypePrettyCodeFigure"])
              return

            const pre = node.children.find(
              (c): c is Element => c.type === "element" && c.tagName === "pre",
            )
            if (!pre) return

            const lang = (pre.properties?.dataLanguage as string) ?? ""
            if (lang.toLowerCase() === "mermaid") return

            const code = pre.children.find(
              (c): c is Element => c.type === "element" && c.tagName === "code",
            )
            if (!code) return

            blocks.push({ lang, text: toString(code) })
          })

          if (blocks.length < 2) return

          const combined = blocks
            .map((b) => {
              const header = langComment(b.lang, b.lang || "code")
              return `${header}\n${b.text}`
            })
            .join("\n\n")

          const section: Element = {
            type: "element",
            tagName: "section",
            properties: { className: ["combined-code-section"] },
            children: [
              {
                type: "element",
                tagName: "hr",
                properties: {},
                children: [],
              },
              {
                type: "element",
                tagName: "h2",
                properties: { id: "combined-code" },
                children: [{ type: "text", value: "Combined Code" }],
              },
              {
                type: "element",
                tagName: "pre",
                properties: { className: ["combined-code-block"] },
                children: [
                  {
                    type: "element",
                    tagName: "code",
                    properties: {},
                    children: [{ type: "text", value: combined }],
                  },
                ],
              },
            ],
          }

          tree.children.push(section)
        },
      ]
    },
  }
}
