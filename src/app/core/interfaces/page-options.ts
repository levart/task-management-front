export interface IPageOptions {
  page: number;
  limit: number;
  order?: 'ASC' | 'DESC';
  orderBy?: string
  search?: string;
}
