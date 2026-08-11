export const sleep = (ms: number): Promise<NodeJS.Timeout> => new Promise(resovle => setTimeout(resovle, ms));

export const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * Flatten a Minecraft chat component — a plain string, a JSON chat component,
 * an array of components, or a raw prismarine-nbt node — into readable text.
 * Used by the auth module to decode window titles and item names.
 */
export function flattenChatComponent(comp: any): string {
	if (comp == null) return '';
	if (typeof comp === 'string') return comp;
	if (Array.isArray(comp)) return comp.map(c => flattenChatComponent(c)).join('');
	if (typeof comp.type === 'string' && comp.type !== 'text' && 'value' in comp) {
		const v = comp.value;
		if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v);
		if (Array.isArray(v)) return v.map(c => flattenChatComponent(c)).join('');
		if (v && typeof v === 'object') {
			if ('value' in v) return flattenChatComponent(v);
			let out = '';
			for (const key of ['text', 'extra', 'with']) {
				if (v[key] !== undefined) out += flattenChatComponent(v[key]);
			}
			return out;
		}
	}
	let out = '';
	if (typeof comp.text === 'string') out += comp.text;
	if (comp.json && typeof comp.json === 'object' && typeof comp.json[''] === 'string') out += comp.json[''];
	if (typeof comp[''] === 'string') out += comp[''];
	for (const key of ['extra', 'with']) {
		const parts = comp[key];
		if (Array.isArray(parts)) {
			for (const p of parts) out += flattenChatComponent(p);
		}
	}
	if (!out && typeof comp.toString === 'function') {
		try { const s = comp.toString(); if (s) return s; } catch {}
	}
	return out;
}
