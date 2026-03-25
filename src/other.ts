
export function and<Reference>(
	reference: Reference,
	callback: (arg0: Reference) => void
): Reference {
	callback(reference);
	return reference;
}
