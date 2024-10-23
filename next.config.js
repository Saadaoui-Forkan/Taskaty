/** @type {import('next').NextConfig} */
const nextConfig = {
  timeZone: "Africa/Tunis",
};

const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");

module.exports = withNextIntl(nextConfig);
