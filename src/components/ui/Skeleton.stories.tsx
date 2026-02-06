import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A loading placeholder component that shows a pulsing animation while content is loading.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[200px]" />,
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeletons can be any shape using width, height, and border-radius.",
      },
    },
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-[350px] rounded-xl border p-6 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-[180px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <Skeleton className="h-[125px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeleton layout for a card component.",
      },
    },
  },
};

export const PostSkeleton: Story = {
  render: () => (
    <div className="w-[400px] rounded-xl border p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="flex gap-4">
        <Skeleton className="h-8 w-[80px]" />
        <Skeleton className="h-8 w-[80px]" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeleton layout for a social media post.",
      },
    },
  },
};

export const UserListSkeleton: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-3 w-[40%]" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeleton layout for a list of users.",
      },
    },
  },
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-[500px] space-y-2">
      <div className="flex gap-4 p-2 border-b">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4 p-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeleton layout for a table with rows.",
      },
    },
  },
};

export const FormSkeleton: Story = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[60px]" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-20 w-full" />
      </div>
      <Skeleton className="h-9 w-[100px]" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeleton layout for a form.",
      },
    },
  },
};
