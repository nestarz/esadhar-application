import { type TwindConfig, defineConfig, install, observe } from "@twind/core";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.4";
import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.7";
import presetTypography from "https://esm.sh/@twind/preset-typography@1.0.7";
import presetLineClamp from "https://esm.sh/@twind/preset-line-clamp@1.0.7";

export default {
  ...defineConfig({
    hash: true,
    presets: [
      presetAutoprefix(),
      presetTailwind(),
      presetTypography(),
      presetLineClamp(),
    ],
    preflight: {
      ".scrollbar-hide": {
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
      "@font-face": [
        {
          fontFamily: '"Remix Icon"',
          src: `url("/static/assets/fonts/RemixIcon/remixicon.woff2") format("woff2")`,
          fontStyle: "normal",
          fontDisplay: "swap",
        },
        {
          fontFamily: "'Scto Grotesk B'",
          src: "url('/static/assets/fonts/SctoGroteskB-Bold.woff2') format('woff2')",
          fontWeight: "bold",
          fontStyle: "normal",
          fontDisplay: "swap",
        },
        {
          fontFamily: "'Dutch801 RmHd BT'",
          src: "url('/static/assets/fonts/Dutch801BT-RomanHeadline.woff2') format('woff2')",
          fontWeight: "normal",
          fontStyle: "normal",
          fontDisplay: "swap",
        },
        {
          fontFamily: "'Scto Grotesk B'",
          src: "url('/static/assets/fonts/SctoGroteskB-Regular.woff2') format('woff2')",
          fontWeight: "normal",
          fontStyle: "normal",
          fontDisplay: "swap",
        },
        {
          fontFamily: "'Scto Grotesk B'",
          src: "url('/static/assets/fonts/SctoGroteskB-RegularItalic.woff2') format('woff2')",
          fontWeight: "normal",
          fontStyle: "italic",
          fontDisplay: "swap",
        },
      ],
    },
    theme: {
      fontFamily: {
        icon: ['"Remix Icon"', "Arial"],
        scto: ["Scto Grotesk B"],
        dutch: ["Dutch801 RmHd BT"],
      },
    },
  }),
  selfURL: import.meta.url,
};

let done = false;
export const twind = (twindOptions: TwindConfig) => {
  if (done) return;
  done = true;
  const tw = install(twindOptions);
  observe(tw);
};
