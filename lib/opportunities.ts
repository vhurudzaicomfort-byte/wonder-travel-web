import data from '@/data/opportunities.json';

export type OpportunityCategoryId = 'jobs' | 'services' | 'vehicles' | 'refer';

export type OpportunityCategory = {
  id: OpportunityCategoryId;
  label: string;
  blurb: string;
  icon: string;
  accent: string;
};

export type Opportunity = {
  id: string;
  category: OpportunityCategoryId;
  title: string;
  company: string;
  location: string;
  description: string;
  phone: string;
  email: string;
  postedAt: string;
  imageUrl?: string;
};

export function getOpportunityCategories(): OpportunityCategory[] {
  return data.categories as OpportunityCategory[];
}

export function getOpportunityCategory(id: string): OpportunityCategory | undefined {
  return (data.categories as OpportunityCategory[]).find(c => c.id === id);
}

export function getOpportunities(category?: OpportunityCategoryId): Opportunity[] {
  const all = data.listings as Opportunity[];
  if (!category) return all;
  return all.filter(o => o.category === category);
}

export function getOpportunityCounts(): Record<OpportunityCategoryId, number> {
  const all = data.listings as Opportunity[];
  return {
    jobs: all.filter(o => o.category === 'jobs').length,
    services: all.filter(o => o.category === 'services').length,
    vehicles: all.filter(o => o.category === 'vehicles').length,
    refer: all.filter(o => o.category === 'refer').length
  };
}
