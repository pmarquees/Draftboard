import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A tabs component for switching between different views or content sections. Built on Radix UI Tabs.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@johndoe" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const Simple: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Overview content goes here. This is the main dashboard view.
        </p>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Analytics data and charts would be displayed here.
        </p>
      </TabsContent>
      <TabsContent value="reports" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Report generation and export options.
        </p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple tabs with text content.",
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[500px]">
      <TabsList className="w-full">
        <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
        <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
        <TabsTrigger value="draft" className="flex-1">Draft</TabsTrigger>
        <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Showing all items (24 total)
        </p>
      </TabsContent>
      <TabsContent value="active" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Showing active items (12 total)
        </p>
      </TabsContent>
      <TabsContent value="draft" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Showing draft items (8 total)
        </p>
      </TabsContent>
      <TabsContent value="archived" className="mt-4">
        <p className="text-sm text-muted-foreground">
          Showing archived items (4 total)
        </p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with full-width triggers that expand to fill the container.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger value="tab2">Also Available</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          Coming Soon
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <p className="text-sm text-muted-foreground">
          This tab is available and accessible.
        </p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <p className="text-sm text-muted-foreground">
          This tab is also available.
        </p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with a disabled trigger for unavailable options.",
      },
    },
  },
};

export const WithForms: Story = {
  render: () => (
    <Tabs defaultValue="signup" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
        <TabsTrigger value="login">Log In</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Enter your details to create a new account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full">Create Account</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" type="password" />
            </div>
            <Button className="w-full">Sign In</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs switching between sign up and login forms.",
      },
    },
  },
};
