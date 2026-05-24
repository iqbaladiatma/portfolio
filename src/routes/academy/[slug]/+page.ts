import { academyData, getTotalDuration } from '$lib/data/academy';
import { error } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
  return academyData.map(course => ({ slug: course.slug }));
};

export const load: PageLoad = ({ params }) => {
  const course = academyData.find(c => c.slug === params.slug);
  if (!course) throw error(404, 'Course not found');
  return { course, totalDuration: getTotalDuration(course) };
};

