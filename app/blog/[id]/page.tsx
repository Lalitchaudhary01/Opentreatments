export const dynamic = "force-dynamic";

import { getBlogById } from "@/features/Blogs/actions/getBlogById";
import CommentList from "@/features/Blogs/components/CommentList";
import LikeButton from "@/features/Blogs/components/LikeButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  User,
  Tag,
  ArrowLeft,
  Star,
  Crown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Link from "next/link";

interface BlogDetailsProps {
  params: { id: string };
}

export default async function BlogDetailsPage({ params }: BlogDetailsProps) {
  const blog = await getBlogById(params.id);

  if (!blog) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-white text-black dark:bg-black dark:text-white flex items-center justify-center">
        <Card className="border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-8">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              Blog Not Found
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blogs">
              <Button className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const wordCount = blog.content.split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white text-black dark:bg-black dark:text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header Section */}
      <Header />

      {/* Navigation */}
      <div className="max-w-4xl mx-auto mt-5 px-6 pt-8 relative z-10">
        <Link href="/blog">
          <Button
            variant="ghost"
            className="mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12 relative z-10">
        <Card className="border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl overflow-hidden relative group hover:shadow-3xl transition-all duration-500">
          {/* Premium Border Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm"></div>
          <div className="absolute inset-[2px] bg-white dark:bg-slate-800 rounded-lg"></div>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white p-8 relative z-10 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 -translate-y-20 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 translate-y-16 animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10">
              {/* Meta Information */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Crown className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-white/90 text-sm">
                      By {blog.author.name}
                    </p>
                    <div className="flex items-center gap-3 text-white/70 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>~{estimatedReadTime} min read</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{wordCount} words</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured Post
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 mb-4 leading-tight">
                {blog.title}
              </h1>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors duration-300"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {String(tag)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <CardContent className="p-0 relative z-10">
            {/* Featured Image */}
            {blog.image && (
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[400px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            {/* Content Section */}
            <div className="p-8">
              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 rounded-xl border border-gray-200/50 dark:border-gray-800/50">
                <div className="flex items-center gap-4">
                  <LikeButton
                    blogId={blog.id}
                    initialLiked={blog.likes.some(
                      (like) => like.user.id === blog.author.id
                    )}
                    initialCount={blog.likes.length}
                  />
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">
                      {blog.comments.length} comments
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Separator className="my-8" />

              {/* Blog Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                  {blog.content}
                </div>
              </div>

              <Separator className="my-12" />

              {/* Author Section */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/50 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">
                        {blog.author.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">
                        Content Creator & Blogger
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/50 dark:border-purple-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-purple-700 dark:text-purple-300">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    Comments ({blog.comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CommentList comments={blog.comments} />
                </CardContent>
              </Card>

              {/* Reading Tips */}
              <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Sparkles className="h-5 w-5" />
                    Enjoyed this post?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-green-600 dark:text-green-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Share it with your friends and followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Leave a comment with your thoughts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Follow {blog.author.name} for more content</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
