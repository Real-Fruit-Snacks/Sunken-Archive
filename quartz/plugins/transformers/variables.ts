import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Element, Text, ElementContent } from "hast"

const VARIABLE_RE = /<([A-Za-z][A-Za-z0-9_-]*)>/g

export const HighlightVariables: QuartzTransformerPlugin = () => {
  return {
    name: "HighlightVariables",
    textTransform(_ctx, src) {
      // Handle <Variable> in prose text (outside code blocks and inline code)
      const codeBlockRegex = /(`{3,}[\s\S]*?`{3,}|`[^`]*`)/g
      const parts = src.split(codeBlockRegex)

      return parts
        .map((part, i) => {
          if (i % 2 === 1) return part
          return part.replace(
            VARIABLE_RE,
            '<span class="variable">&lt;$1&gt;</span>',
          )
        })
        .join("")
    },
    htmlPlugins() {
      // Handle <Variable> inside code blocks (runs after Shiki syntax highlighting)
      return [
        () => (tree: any) => {
          visit(tree, "element", (node: Element) => {
            if (node.tagName !== "code") return
            // Recursively process all text nodes under this code element
            processChildren(node)
          })
        },
      ]
    },
  }
}

function processChildren(node: Element): void {
  const newChildren: ElementContent[] = []
  let modified = false

  for (const child of node.children) {
    if (child.type === "text") {
      const parts = splitVariables(child.value)
      if (parts.length > 1) {
        newChildren.push(...parts)
        modified = true
      } else {
        newChildren.push(child)
      }
    } else if (child.type === "element") {
      // Recurse into child elements (Shiki nests: code > span[data-line] > span[style] > text)
      processChildren(child)
      newChildren.push(child)
    } else {
      newChildren.push(child)
    }
  }

  if (modified) {
    node.children = newChildren
  }
}

function splitVariables(text: string): (Element | Text)[] {
  const parts: (Element | Text)[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  const re = new RegExp(VARIABLE_RE.source, "g")
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) })
    }
    parts.push({
      type: "element",
      tagName: "span",
      properties: { className: ["variable"] },
      children: [{ type: "text", value: match[0] }],
    })
    lastIndex = re.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) })
  }

  return parts
}
