import { portfolioData } from '$lib/data/portfolio';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const project = portfolioData.projects.find(p => p.slug === params.slug);
  if (!project) throw error(404, 'Project not found');
  const index = portfolioData.projects.findIndex(p => p.slug === params.slug);
  const prev = portfolioData.projects[index - 1] ?? null;
  const next = portfolioData.projects[index + 1] ?? null;
  return { project, prev, next };
};
