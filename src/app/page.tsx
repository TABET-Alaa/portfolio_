import React from "react";
import { fetchSingle } from "@/lib/sanity";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row } from "@/once-ui/components";

import { baseURL, routes } from "@/app/resources";
import { home, about, person } from "@/app/resources/content";
import { ProjectCard } from "@/components";
import { getPosts } from "@/app/utils/utils";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

export default async function Home() {
  const pageInfo = await fetchSingle<{ backgroundInformation?: string }>(
    `*[_type == "pageInfo"][0]{ backgroundInformation }`
  );
  const headline = home.headline;
  const subline = pageInfo?.backgroundInformation ? (
    <>
      {pageInfo.backgroundInformation}
    </>
  ) : (
    home.subline
  );
  // Compute latest project
  const allProjects = getPosts(["src", "app", "work", "projects"]) || [];
  const sortedProjects = allProjects
    .slice()
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime());
  const latestTwo = sortedProjects.slice(0, 2);

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          {home.featured && (
          <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
            <Badge background="brand-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong" textVariant="label-default-s" arrow={false}
              href={home.featured.href}>
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem", objectFit: "cover", objectPosition: "top" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      {/* CTA row */}
      <RevealFx translateY="8" delay={0.5}>
        <Flex gap="12" paddingX="l">
          <Button href="/work" variant="primary" size="m" arrowIcon>
            View Work
          </Button>
          <Button href="/about#contact" variant="secondary" size="m">
            Contact Me
          </Button>
        </Flex>
      </RevealFx>
      <RevealFx translateY="16" delay={0.6}>
        <Column id="technologies" fillWidth gap="l" paddingX="l">
          <Heading as="h2" variant="display-strong-xs">Technologies I work with</Heading>
          <Text onBackground="neutral-weak">From enterprise backend to cloud-native infrastructure and ERP integrations.</Text>
          <Flex gap="12" wrap>
            <Badge background="surface" onBackground="neutral-strong">Angular</Badge>
            <Badge background="surface" onBackground="neutral-strong">TypeScript</Badge>
            <Badge background="surface" onBackground="neutral-strong">Spring Boot</Badge>
            <Badge background="surface" onBackground="neutral-strong">Java</Badge>
            <Badge background="surface" onBackground="neutral-strong">AWS</Badge>
            <Badge background="surface" onBackground="neutral-strong">Azure</Badge>
            <Badge background="surface" onBackground="neutral-strong">Docker</Badge>
            <Badge background="surface" onBackground="neutral-strong">Kubernetes</Badge>
            <Badge background="surface" onBackground="neutral-strong">Terraform</Badge>
            <Badge background="surface" onBackground="neutral-strong">GitHub Actions</Badge>
            <Badge background="surface" onBackground="neutral-strong">PostgreSQL</Badge>
            <Badge background="surface" onBackground="neutral-strong">ServiceNow</Badge>
            <Badge background="surface" onBackground="neutral-strong">SAP</Badge>
            <Badge background="surface" onBackground="neutral-strong">Next.js</Badge>
            <Badge background="surface" onBackground="neutral-strong">Tailwind CSS</Badge>
            <Badge background="surface" onBackground="neutral-strong">JUnit</Badge>
            <Badge background="surface" onBackground="neutral-strong">Sonar</Badge>
            <Badge background="surface" onBackground="neutral-strong">AWS EKS</Badge>
            <Badge background="surface" onBackground="neutral-strong">AWS EC2</Badge>
            <Badge background="surface" onBackground="neutral-strong">AWS RDS</Badge>
            <Badge background="surface" onBackground="neutral-strong">ArgoCD</Badge>
            <Badge background="surface" onBackground="neutral-strong">Jenkins</Badge>
            <Badge background="surface" onBackground="neutral-strong">Azure Boards</Badge>
            <Badge background="surface" onBackground="neutral-strong">SCRUM</Badge>
          </Flex>

          <Column gap="s" paddingTop="24">
            <Heading as="h3" variant="heading-strong-m">Focus areas</Heading>
            <Flex wrap gap="8">
              <Badge background="brand-alpha-weak" onBackground="brand-on-background-strong">DevOps & Cloud</Badge>
              <Badge background="brand-alpha-weak" onBackground="brand-on-background-strong">Java & Angular</Badge>
              <Badge background="brand-alpha-weak" onBackground="brand-on-background-strong">ERP & ITSM</Badge>
              <Badge background="brand-alpha-weak" onBackground="brand-on-background-strong">Microservices</Badge>
              <Badge background="brand-alpha-weak" onBackground="brand-on-background-strong">CI/CD</Badge>
              <Badge background="brand-alpha-weak" onBackground="brand-on-background-strong">AWS-AZURE</Badge>
            </Flex>
          </Column>
        </Column>
      </RevealFx>
      
      {latestTwo.length > 0 && (
        <RevealFx translateY="16" delay={0.6}>
          <Column fillWidth gap="l" paddingX="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest projects
            </Heading>
            <Column fillWidth gap="l">
              {latestTwo.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  priority={index < 2}
                  href={`work/${project.slug}`}
                  images={project.metadata.images}
                  title={project.metadata.title}
                  description={project.metadata.summary}
                  content={project.content}
                  avatars={project.metadata.team?.map((member: any) => ({ src: member.avatar })) || []}
                  link={project.metadata.link || ""}
                />
              ))}
            </Column>
            <Flex paddingTop="8">
              <Button size="m" variant="secondary" href="/work" arrowIcon>View all work</Button>
            </Flex>
          </Column>
        </RevealFx>
      )}
      {/* Services */}
      <RevealFx translateY="16" delay={0.6}>
        <Column fillWidth gap="l" paddingX="l">
          <Heading as="h2" variant="display-strong-xs">Services</Heading>
          <Flex gap="16" wrap={false}>
            <Column flex={1} padding="16" background="surface" border="neutral-alpha-medium" radius="m-4" shadow="m" gap="8">
              <Heading as="h3" variant="heading-strong-s">DevOps & Cloud</Heading>
              <Text onBackground="neutral-weak">CI/CD, containers, IaC, scalable infra.</Text>
              <Button size="s" variant="tertiary" href="/work?category=devops-cloud">View DevOps work</Button>
            </Column>
            <Column flex={1} padding="16" background="surface" border="neutral-alpha-medium" radius="m-4" shadow="m" gap="8">
              <Heading as="h3" variant="heading-strong-s">Java & Angular</Heading>
              <Text onBackground="neutral-weak">Robust backends and polished UIs.</Text>
              <Button size="s" variant="tertiary" href="/work?category=java-angular">View Java/Angular work</Button>
            </Column>
            <Column flex={1} padding="16" background="surface" border="neutral-alpha-medium" radius="m-4" shadow="m" gap="8">
              <Heading as="h3" variant="heading-strong-s">ERP & ITSM</Heading>
              <Text onBackground="neutral-weak">ServiceNow, SAP, enterprise workflows.</Text>
              <Button size="s" variant="tertiary" href="/work?category=erp-servicenow">View ERP work</Button>
            </Column>
          </Flex>
        </Column>
      </RevealFx>


      {/* Certifications */}
      <RevealFx translateY="16" delay={0.6}>
        <Column fillWidth gap="l" paddingX="l">
          <Heading as="h2" variant="display-strong-xs">Certifications</Heading>
          <Flex gap="12" wrap>
            <Badge background="surface" onBackground="neutral-strong">Intro to Containers</Badge>
            <Badge background="surface" onBackground="neutral-strong">Virtual Network (Azure)</Badge>
            <Badge background="surface" onBackground="neutral-strong">OCI DevOps Professional</Badge>
            <Badge background="surface" onBackground="neutral-strong">Azure AZ-400</Badge>
          </Flex>
          <Flex paddingTop="8">
            <Button size="s" variant="tertiary" href="/certifications">View all certifications</Button>
          </Flex>
        </Column>
      </RevealFx>

      {/* Contact banner */}
      <RevealFx translateY="16" delay={0.6}>
        <Column fillWidth gap="m" paddingX="l" paddingY="24" background="surface" border="neutral-alpha-medium" radius="m-4" shadow="m">
          <Heading as="h2" variant="display-strong-xs">Let’s build something impactful</Heading>
          <Text onBackground="neutral-weak">Available for internships, freelance, or full-time roles. Open to remote/hybrid.</Text>
          <Flex gap="12">
            <Button href="/work" variant="secondary" size="m" arrowIcon>Explore my work</Button>
            <Button href="/about#contact" variant="primary" size="m">Get in touch</Button>
        </Flex>
        </Column>
      </RevealFx>
      {/* Removed newsletter subscription section as requested */}
    </Column>
  );
}
