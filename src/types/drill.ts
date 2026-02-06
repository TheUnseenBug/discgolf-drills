export type Drill = {
  id: string;
  name: string;
  description: string;
  category: string;
  throw_type: string; 
  length: number; // seconds
  url: string;
  parent: string | null;
};
