const toKebabCase = (normal, toLowerCase) => {
	if (toLowerCase) {
		return normal.trim().toLowerCase().replace(/\s+/g,'-');
	}
	return normal.trim().replace(/\s+/g,'-');
};

export default toKebabCase;