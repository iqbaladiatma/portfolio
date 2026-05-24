import { academyData, getTotalDuration } from '$lib/data/academy';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = false;

export const load: PageLoad = ({ params }) => {
  const course = academyData.find(c => c.slug === params.slug);
  if (!course) throw error(404, 'Course not found');

  return {
    course,
    totalDuration: getTotalDuration(course)
  };
};
