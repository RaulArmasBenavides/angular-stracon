export const saveAs = (blob: Blob, filename: string) => {
	let url = window.URL.createObjectURL(blob);
	let a = document.createElement('a');
	document.body.appendChild(a);
	a.setAttribute('style', 'display: none');
	a.href = url;
	a.download = filename;
	a.click();
	window.URL.revokeObjectURL(url);
	a.remove();
};

export const getFilenameFromDisposition = (disposition?: string | null): string | null => {
	if (!disposition) return null;

	// RFC 5987: filename*=utf-8''nombre%20archivo.pdf
	const star = /filename\*\s*=\s*[^']*'[^']*'([^;]+)/i.exec(disposition);
	if (star) return decodeURIComponent(star[1].trim());

	// filename="nombre.pdf"  |  filename=nombre.pdf
	const m = /filename\s*=\s*"([^"]+)"|filename\s*=\s*([^;]+)/i.exec(disposition);
	const v = (m?.[1] ?? m?.[2])?.trim();
	return v ? v.replace(/^"(.*)"$/, '$1') : null;
};
