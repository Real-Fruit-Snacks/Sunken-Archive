import fs from "fs"
import sharp from "sharp"
import { joinSegments, QUARTZ, FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

export const Favicon: QuartzEmitterPlugin = () => ({
  name: "Favicon",
  async *emit({ argv }) {
    const iconPath = joinSegments(QUARTZ, "static", "icon.svg")
    if (!fs.existsSync(iconPath)) return

    const faviconContent = await sharp(iconPath).resize(48, 48).png().toBuffer()

    yield write({
      ctx: { argv },
      slug: "favicon" as FullSlug,
      ext: ".ico",
      content: faviconContent,
    })
  },
  async *partialEmit() {},
})
