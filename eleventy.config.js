export default async function (eleventyConfig) {
  eleventyConfig
    .addPassthroughCopy({
      "./public/": "/"
    })
};

export const config = {
  templateFormats: [
    "njk",
  ],

  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: "content",
    output: "_site"
  },
};