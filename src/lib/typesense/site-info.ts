import { env } from '@src/lib/env';
import { getTypesenseClient } from '@src/lib/typesense';
const { NEXT_PUBLIC_STORE_ID } = env();

type SiteInfoTypesenseResponse = {
  name: string;
  value: string;
  updated_at?: number;
};

export class SiteInfo {
  static async find(name: string): Promise<SiteInfoTypesenseResponse | undefined> {
    const response = await getTypesenseClient()
      .collections<SiteInfoTypesenseResponse>(`site_info-${NEXT_PUBLIC_STORE_ID}`)
      .documents()
      .search({
        q: name as string,
        query_by: 'name',
        sort_by: '_text_match:desc',
      });
    return response.hits?.[0]?.document ?? undefined;
  }

  static async findMultiple(names: string[]): Promise<SiteInfoTypesenseResponse[]> {
    const response = await getTypesenseClient()
      .collections<SiteInfoTypesenseResponse>(`site_info-${NEXT_PUBLIC_STORE_ID}`)
      .documents()
      .search({ q: '*' as string, query_by: 'name', filter_by: `name:${JSON.stringify(names)}` });
    const results = response.hits?.map((hit) => hit.document);
    return results || [];
  }
}
