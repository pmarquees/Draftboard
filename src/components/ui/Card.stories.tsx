import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Badge } from "./badge";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile card component for grouping related content. Includes header, content, and footer sections.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any elements you need.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "A simple card with just header content.",
      },
    },
  },
};

export const WithForm: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Project name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Project description" />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card containing a form with inputs and action buttons.",
      },
    },
  },
};

export const WithBadge: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Alpha</CardTitle>
          <Badge variant="secondary">Draft</Badge>
        </div>
        <CardDescription>
          A new web application for task management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Last updated 2 hours ago
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Project
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with a status badge in the header.",
      },
    },
  },
};

export const PostCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div>
            <CardTitle className="text-base">John Doe</CardTitle>
            <CardDescription>2 hours ago</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          Just finished working on the new design system. Really happy with how
          the components turned out! 🎨
        </p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <span>12 likes • 3 comments</span>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of a social post card layout.",
      },
    },
  },
};

export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i}</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Content for card {i}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple cards in a grid layout.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>This card has hover effects.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Click or hover to see the interaction.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with hover effects for clickable cards.",
      },
    },
  },
};
