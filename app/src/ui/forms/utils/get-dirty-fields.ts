const getDirtyFields = <T extends Record<string, unknown>>(
	defaultFields: T,
	newFields: T,
) => {
	return Object.entries(newFields).reduce(
		(acc, [key, value]) => {
			if (defaultFields[key] !== value) {
				acc[key] = value;
			}

			return acc;
		},
		{} as Record<string, unknown>,
	) as T;
};

export default getDirtyFields;
