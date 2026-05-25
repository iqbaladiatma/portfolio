import { researchPapers } from '$lib/data/research';
import { error } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
  return researchPapers.map(paper => ({ slug: paper.slug }));
};

export const load: PageLoad = ({ params }) => {
  const paper = researchPapers.find(p => p.slug === params.slug);
  if (!paper) throw error(404, 'Research paper not found');

  const index = researchPapers.findIndex(p => p.slug === params.slug);
  const prev = researchPapers[index - 1] ?? null;
  const next = researchPapers[index + 1] ?? null;

  return { paper, prev, next };
};
