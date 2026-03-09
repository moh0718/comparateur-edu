/** @type {import('next-sitemap').IConfig} */
module.exports = { 
  siteUrl: 'https://comparateur-edu-site.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
