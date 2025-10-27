"use client";

import { Column, Heading, Text, Button, Flex } from "@/once-ui/components";
import { ProjectCard } from "@/components";
import { useState } from "react";

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
    title: 'ERP & ServiceNow',
    description: 'Enterprise solutions and service management',
    color: 'purple'
  }
};

type CategoryFilter = 'all' | 'devops-cloud' | 'java-angular' | 'erp-servicenow';

export function Projects({ projects, range }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  
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
  const filteredProjects = activeFilter === 'all' 
    ? displayedProjects 
    : displayedProjects.filter(project => {
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
    { key: 'all' as CategoryFilter, label: 'All Projects', color: 'neutral' },
    { key: 'devops-cloud' as CategoryFilter, label: 'DevOps & Cloud', color: 'blue' },
    { key: 'java-angular' as CategoryFilter, label: 'Java & Angular', color: 'green' },
    { key: 'erp-servicenow' as CategoryFilter, label: 'ERP & ServiceNow', color: 'purple' },
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
      {activeFilter === 'all' ? (
        // Show all categories when "All" is selected
        <>
          {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
            const categoryProjects = projectsByCategory[categoryKey] || [];
            
            if (categoryProjects.length === 0) return null;

            return (
              <Column key={categoryKey} fillWidth gap="l">
                <Column gap="s">
                  <Heading level="2" color={`${categoryInfo.color}-on-background-strong`}>
                    {categoryInfo.title}
                  </Heading>
                  <Text color="neutral-on-background-medium">
                    {categoryInfo.description}
                  </Text>
                </Column>
                
                <Column fillWidth gap="l">
                  {categoryProjects.map((post, index) => (
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
              </Column>
            );
          })}
          
          {/* Show uncategorized projects if any */}
          {projectsByCategory.uncategorized && projectsByCategory.uncategorized.length > 0 && (
            <Column fillWidth gap="l">
              <Column gap="s">
                <Heading level="2" color="neutral-on-background-strong">
                  Other Projects
                </Heading>
                <Text color="neutral-on-background-medium">
                  Additional projects and work
                </Text>
              </Column>
              
              <Column fillWidth gap="l">
                {projectsByCategory.uncategorized.map((post, index) => (
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
            </Column>
          )}
        </>
      ) : (
        // Show filtered projects
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
                Try selecting a different category or view all projects.
              </Text>
            </Column>
          )}
        </Column>
      )}
    </Column>
  );
}
