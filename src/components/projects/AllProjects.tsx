'use client';
import { Card, Carousel } from '@/components/projects/apple-cards';
import { data } from '@/components/projects/Data';

export default function AllProjects() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));
  console.log(data[0]);

  return (
    <div className="h-full w-full pt-8">
      <h2 className="mx-auto max-w-7xl font-sans text-xl font-bold text-neutral-800 md:text-3xl dark:text-neutral-200">
        My Projects
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
