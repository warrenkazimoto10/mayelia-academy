import { useQuery } from '@tanstack/react-query';
import { siteConfigAPI, defaultSiteConfig, type SiteConfigData } from '@/lib/api';

export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-config'],
    queryFn: siteConfigAPI.getPublic,
    staleTime: 5 * 60 * 1000,
    placeholderData: defaultSiteConfig(),
  });
}

export function useSiteSettingsValue(): SiteConfigData {
  const { data } = useSiteSettings();
  return data ?? defaultSiteConfig();
}
