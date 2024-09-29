import { inArray, sql, type SQLWrapper } from "drizzle-orm";

const safeInArray = (column: SQLWrapper, values: unknown[]) => {
	if (Array.isArray(values) && values.length === 0) {
		return sql`false`;
	}
	return inArray(column, values);
};

export default safeInArray;
