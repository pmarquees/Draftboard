"use client";

import { api } from "~/lib/trpc/client";
import { CommentThread } from "./CommentThread";
import { CommentComposer } from "./CommentComposer";
import { Skeleton } from "~/components/ui/skeleton";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { data: comments, isLoading } = api.comment.byPost.useQuery({ postId });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comment composer */}
      <CommentComposer postId={postId} />

      {/* Comment threads */}
      <div className="space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentThread key={comment.id} comment={comment} postId={postId} />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
