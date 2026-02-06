import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An avatar component for displaying user profile images with automatic fallback to initials. Built on Radix UI Avatar.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/nonexistent.png" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When the image fails to load, the fallback (initials) is displayed.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-6 w-6">
        <AvatarFallback className="text-xs">XS</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
      <Avatar className="h-24 w-24">
        <AvatarFallback className="text-2xl">2XL</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatars can be sized using Tailwind width/height classes.",
      },
    },
  },
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-3">
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-primary text-primary-foreground">
          AB
        </AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-secondary text-secondary-foreground">
          CD
        </AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-muted text-muted-foreground">
          EF
        </AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-accent text-accent-foreground">
          +3
        </AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Overlapping avatar group showing multiple users with a count indicator.",
      },
    },
  },
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar>
          <AvatarFallback>ON</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
      </div>
      <div className="relative">
        <Avatar>
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-yellow-500" />
      </div>
      <div className="relative">
        <Avatar>
          <AvatarFallback>OF</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-gray-400" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatars with online/away/offline status indicators.",
      },
    },
  },
};

export const InUserList: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      {[
        { name: "John Doe", role: "Admin" },
        { name: "Jane Smith", role: "Editor" },
        { name: "Bob Johnson", role: "Viewer" },
      ].map((user) => (
        <div
          key={user.name}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted"
        >
          <Avatar>
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Avatars used in a user list with names and roles.",
      },
    },
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback className="bg-red-100 text-red-600">RD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-blue-100 text-blue-600">BL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-green-100 text-green-600">
          GR
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-purple-100 text-purple-600">
          PR
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-orange-100 text-orange-600">
          OR
        </AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Custom colored fallback avatars for visual distinction.",
      },
    },
  },
};
