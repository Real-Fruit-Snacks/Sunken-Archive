import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"
import { Element, Root } from "hast"

export const CombinedCode: QuartzTransformerPlugin = () => {
  return {
    name: "CombinedCode",
    htmlPlugins() {
      return [
        () => (tree: Root, file) => {
          if (!file.data.frontmatter?.["combined-code"]) return

          const blocks: { lang: string; text: string }[] = []

          visit(tree, "element", (node: Element) => {
            if (
              node.tagName !== "figure" ||
              !("dataRehypePrettyCodeFigure" in (node.properties ?? {}))
            )
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

          const combined = blocks.map((b) => b.text).join("\n\n")

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
