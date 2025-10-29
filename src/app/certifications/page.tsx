import { Column, Heading, Text, Badge, Flex, Button } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { Meta, Schema } from "@/once-ui/modules";
import { about, certifications as certContent, person } from "@/app/resources/content";

export async function generateMetadata() {
  return Meta.generate({
    title: certContent.title,
    description: certContent.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(certContent.title)}`,
    path: certContent.path,
  });
}

export default function Certifications() {
  const items = [
    {
      provider: "Containers",
      name: "Intro to Containers",
      year: "2025",
      verifyUrl: "https://drive.google.com/file/d/1wapZyF2sS0fS-XRyQ6-rdPA6HzjM8dtt/view?usp=sharing",
    },
    {
      provider: "Azure",
      name: "Virtual Network (Azure)",
      year: "2025",
      verifyUrl: "https://drive.google.com/file/d/1RyfcHP8T_DcCQ1jm2zvd87m4tRb-LuZ9/view?usp=sharing",
    },
    { provider: "Oracle Cloud (OCI)", name: "DevOps Professional", year: "In progress" },
    { provider: "Azure", name: "AZ-400: DevOps Engineer Expert", year: "In progress" },
  ];

  return (
    <Column maxWidth="m" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={certContent.path}
        title={certContent.title}
        description={certContent.description}
        image={`${baseURL}/og?title=${encodeURIComponent(certContent.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column gap="m" paddingX="l">
        <Heading as="h1" variant="display-strong-s">{certContent.title}</Heading>
        <Text onBackground="neutral-weak">{certContent.description}</Text>
      </Column>

      <Column gap="l" paddingX="l">
        {items.map((c, idx) => (
          <Column key={`${c.provider}-${idx}`} background="surface" border="neutral-alpha-medium" radius="m-4" shadow="s" padding="16" gap="12">
            <Column gap="4">
              <Text onBackground="neutral-medium" variant="label-default-s">{c.provider}</Text>
              <Text onBackground="neutral-strong" variant="heading-strong-xs">{c.name}</Text>
            </Column>
            <Text onBackground="neutral-medium" variant="label-default-s">{c.year}</Text>
            {"verifyUrl" in c && c.verifyUrl && (
              <Button size="s" variant="tertiary" href={(c as any).verifyUrl}>View certificate</Button>
            )}
          </Column>
        ))}
      </Column>
    </Column>
  );
}


