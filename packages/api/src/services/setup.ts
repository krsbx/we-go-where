import _ from 'lodash';
import { Context } from 'hono';

export function getPageLimit(query: ReturnType<Context['req']['query']>) {
  const limit = +(query.limit === 'all' ? 0 : _.get(query, 'limit', 10));
  const page =
    query.page && !Number.isNaN(+query.page) && +query.page > 0
      ? +query.page
      : 1;

  const offset = page > 0 ? limit * (page - 1) : 0;

  return {
    page,
    limit: limit === 0 ? undefined : limit,
    offset,
  };
}
