<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Sitemap — IntroAlimentar</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 2rem; background: #f9fafb; color: #1f2937; }
          h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
          p.info { color: #6b7280; margin-bottom: 1.5rem; font-size: 0.875rem; }
          table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          th { background: #f3f4f6; text-align: left; padding: 0.75rem 1rem; font-size: 0.75rem; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; }
          td { padding: 0.5rem 1rem; border-top: 1px solid #e5e7eb; font-size: 0.875rem; }
          tr:hover td { background: #f9fafb; }
          a { color: #2563eb; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .priority { font-weight: 600; }
          .badge { display: inline-block; padding: 0.125rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; }
          .badge-high { background: #dcfce7; color: #166534; }
          .badge-med { background: #fef9c3; color: #854d0e; }
          .badge-low { background: #f3f4f6; color: #6b7280; }
        </style>
      </head>
      <body>
        <h1>🍼 IntroAlimentar Sitemap</h1>
        <p class="info">
          This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
        </p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Priority</th>
              <th>Change Freq</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                </td>
                <td>
                  <xsl:variable name="p" select="sitemap:priority"/>
                  <span class="badge">
                    <xsl:attribute name="class">
                      badge <xsl:choose>
                        <xsl:when test="$p &gt;= 0.8">badge-high</xsl:when>
                        <xsl:when test="$p &gt;= 0.5">badge-med</xsl:when>
                        <xsl:otherwise>badge-low</xsl:otherwise>
                      </xsl:choose>
                    </xsl:attribute>
                    <xsl:value-of select="sitemap:priority"/>
                  </span>
                </td>
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:lastmod"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
