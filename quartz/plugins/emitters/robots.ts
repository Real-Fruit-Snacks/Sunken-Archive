import { QuartzEmitterPlugin } from "../types"
import { FullSlug, joinSegments } from "../../util/path"
import { write } from "./helpers"

export const Robots: QuartzEmitterPlugin = () => ({
  name: "Robots",
  async *emit({ argv, cfg }) {
    const base = cfg.configuration.baseUrl ?? ""
    const content = [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: https://${joinSegments(base, "sitemap.xml")}`,
      "",
    ].join("\n")

    yield write({
      ctx: { argv, cfg } as Parameters<typeof write>[0]["ctx"],
      content,
      slug: "robots" as FullSlug,
      ext: ".txt",
    })
  },
  async *partialEmit() {},
})
