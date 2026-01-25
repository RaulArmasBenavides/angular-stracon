export const toIso8601 = (input?: string | Date): string | undefined => {
	if (!input) return undefined;
	if (input instanceof Date) return input.toISOString();

	const s = input.trim();
	if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return `${s}T00:00:00Z`;
	if (/Z$|[+-]\d{2}:\d{2}$/.test(s)) return s; // ya trae zona
	if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(s)) return `${s}Z`;
	return s; // fallback
};
