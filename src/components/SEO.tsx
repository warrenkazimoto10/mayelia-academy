import { Helmet } from 'react-helmet-async';

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
    const siteUrl = 'https://mayelia-academy.ci'; // Adjust this to the production URL
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title} | Mayelia Academy</title>
            <meta name="description" content={description} />

            {/* Indexing Control */}
            {preventIndexing && <meta name="robots" content="noindex, nofollow" />}

            {/* Canonical URL */}
            {fullCanonical && <link rel="canonical" href={fullCanonical} />}

            {/* Open Graph / Social Media */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullCanonical || siteUrl} />
            {/* Add og:image if available */}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />

            {/* Structural Data (JSON-LD) for Sitelinks & Rich Snippets */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};
