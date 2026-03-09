/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kompar-banques.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
