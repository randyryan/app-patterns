/**
 * Represents a KPI appear in the Dashboards as cards. Every KPI card will have it's header, icon.
 * The KPI's value can be one of the three types that of: text, number, or percent.
 *
 * Note: Naming for commonly used abbreviations like XML, HTTP, REST, JDBC, CRUD are written like
 *       everyday words: Xml, Http, Rest, Jdbc in code more and more commonly in modern software.
 *       So we write KPI as "Kpi".
 */
 type Kpi = {
  // Name and icon
  name: string;
  icon: string;
  // Value
  type: KpiType;
  text?: string;
  value: number;
};

/**
 * Denotes the value type of the KPI.
 */
type KpiType = 'text' | 'number' | 'percent';

export default Kpi;
export type { KpiType };
