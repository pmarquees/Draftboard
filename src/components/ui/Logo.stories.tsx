import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "UI/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Draftboard logo SVG component. Inherits color from currentColor for easy theming.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: () => <Logo className="h-16 w-16 text-foreground" />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Logo className="h-8 w-8 text-foreground" />
      <Logo className="h-12 w-12 text-foreground" />
      <Logo className="h-16 w-16 text-foreground" />
      <Logo className="h-24 w-24 text-foreground" />
      <Logo className="h-32 w-32 text-foreground" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo at various sizes. Scale using Tailwind width/height classes.",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Logo className="h-16 w-16 text-foreground" />
      <Logo className="h-16 w-16 text-primary" />
      <Logo className="h-16 w-16 text-muted-foreground" />
      <Logo className="h-16 w-16 text-destructive" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo inherits color from the text color class.",
      },
    },
  },
};

export const OnDarkBackground: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-8 bg-primary rounded-lg">
      <Logo className="h-16 w-16 text-primary-foreground" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo on a dark background using inverted colors.",
      },
    },
  },
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Logo className="h-10 w-10 text-foreground" />
      <span className="text-2xl font-bold">Draftboard</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo combined with text for a complete brand mark.",
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => (
    <div className="flex items-center justify-center h-[200px] w-[200px] border rounded-lg">
      <Logo className="h-16 w-16 text-muted-foreground animate-pulse" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo with pulse animation for loading states.",
      },
    },
  },
};
