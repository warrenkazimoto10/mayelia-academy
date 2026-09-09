import { Helmet } from 'react-helmet-async';
import { useSiteSettingsValue } from '@/hooks/useSiteSettings';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    preventIndexing?: boolean;
    structuredData?: Record<string, any>;
}

export const SEO = ({
    title,
    description,
    canonical,
    preventIndexing = false,
    structuredData
}: SEOProps) => {
    const { siteUrl, siteName } = useSiteSettingsValue();
    const base = siteUrl.replace(/\/$/, '');
    const fullCanonical = canonical ? `${base}${canonical}` : undefined;
    const fullTitle = `${title} | ${siteName}`;
    const defaultOgImage = `${base}/android-chrome-512x512.png`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Indexing Control */}
            {preventIndexing && <meta name="robots" content="noindex, nofollow" />}

            {/* Canonical URL */}
            {fullCanonical && <link rel="canonical" href={fullCanonical} />}

            {/* Open Graph / Social Media */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullCanonical || base} />
            <meta property="og:image" content={defaultOgImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={defaultOgImage} />

            {/* Structural Data (JSON-LD) for Sitelinks & Rich Snippets */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};
