"use client";

import { Column, Heading, Text, Button, Flex } from "@/once-ui/components";
import { ProjectCard } from "@/components";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Project {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    images: string[];
    team?: Array<{ name: string; role: string; avatar: string; linkedIn: string }>;
    link?: string;
    category?: string;
  };
  content: string;
}

interface ProjectsProps {
  projects: Project[];
  range?: [number, number?];
}

const categories = {
  'devops-cloud': {
    title: 'DevOps & Cloud',
    description: 'Infrastructure, automation, and cloud solutions',
    color: 'blue'
  },
  'java-angular': {
    title: 'Java & Angular',
    description: 'Backend and frontend development projects',
    color: 'green'
  },
  'erp-servicenow': {
    title: 'ERP (ServiceNow - SAP, Sage...)',
    description: 'Enterprise solutions and service management',
    color: 'purple'
  }
};

type CategoryFilter = 'all' | 'devops-cloud' | 'java-angular' | 'erp-servicenow';

export function Projects({ projects, range }: ProjectsProps) {
  const searchParams = useSearchParams();
  const initialFilter = (searchParams?.get('category') as CategoryFilter) || 'all';
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('devops-cloud');

  // Sync filter with query param changes
  useEffect(() => {
    const qp = (searchParams?.get('category') as CategoryFilter) || 'devops-cloud';
    setActiveFilter(qp);
  }, [searchParams]);
  
  // Add safety check for projects
  if (!projects || !Array.isArray(projects)) {
    console.error('Projects data is not available:', projects);
    return (
      <Column fillWidth gap="l" center>
        <Heading level="3" color="neutral-on-background-medium">
          No projects available
        </Heading>
        <Text color="neutral-on-background-weak">
          Projects data could not be loaded.
        </Text>
      </Column>
    );
  }
  
  const sortedProjects = projects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  // Filter projects based on active filter
  const filteredProjects = displayedProjects.filter(project => {
    const projectCategory = project.metadata.category;
    console.log('Project:', project.metadata.title, 'Category:', projectCategory, 'Filter:', activeFilter);
    return projectCategory === activeFilter;
  });

  // Group projects by category
  const projectsByCategory = filteredProjects.reduce((acc, project) => {
    const category = project.metadata.category || 'uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const filterButtons = [
    { key: 'devops-cloud' as CategoryFilter, label: 'DevOps & Cloud', color: 'blue' },
    { key: 'java-angular' as CategoryFilter, label: 'Java & Angular', color: 'green' },
    { key: 'erp-servicenow' as CategoryFilter, label: 'ERP (ServiceNow - SAP, Sage...)', color: 'purple' },
  ];

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {/* Filter Buttons */}
      <Column gap="m" fillWidth>
        <Heading level="2" color="neutral-on-background-strong">
          Filter by Category
        </Heading>
        <Flex gap="s" wrap>
          {filterButtons.map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              variant={activeFilter === filter.key ? 'solid' : 'outline'}
              color={activeFilter === filter.key ? filter.color : 'neutral'}
              size="s"
            >
              {filter.label}
            </Button>
          ))}
        </Flex>
      </Column>

      {/* Projects Display */}
      <Column fillWidth gap="l">
        {filteredProjects.length > 0 ? (
          <>
            <Column gap="s">
              <Heading level="2" color={`${categories[activeFilter]?.color || 'neutral'}-on-background-strong`}>
                {categories[activeFilter]?.title || 'Filtered Projects'}
              </Heading>
              <Text color="neutral-on-background-medium">
                {categories[activeFilter]?.description || 'Projects in this category'}
              </Text>
            </Column>
            
            <Column fillWidth gap="l">
              {filteredProjects.map((post, index) => (
                <ProjectCard
                  priority={index < 2}
                  key={post.slug}
                  href={`work/${post.slug}`}
                  images={post.metadata.images}
                  title={post.metadata.title}
                  description={post.metadata.summary}
                  content={post.content}
                  avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
                  link={post.metadata.link || ""}
                />
              ))}
            </Column>
          </>
        ) : (
          <Column gap="m" center>
            <Heading level="3" color="neutral-on-background-medium">
              No projects found in this category
            </Heading>
            <Text color="neutral-on-background-weak">
              Try selecting a different category.
            </Text>
          </Column>
        )}
      </Column>
    </Column>
  );
}
