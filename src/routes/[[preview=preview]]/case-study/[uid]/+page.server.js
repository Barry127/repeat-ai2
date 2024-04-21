import { createClient } from '$lib/prismicio';
import { asText } from '@prismicio/client';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const page = await client.getByUID('case_study', params.uid);

	return {
		page,
		title: asText(page.data.company) + ' Case Study - Repeat.ai'
	};
}

export async function entries() {
	const client = createClient();

	const pages = await client.getAllByType('case_study');

	return pages.map((page) => {
		return { uid: page.uid };
	});
}
