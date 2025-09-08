"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Save,
  Image as ImageIcon,
  Type,
  FileText,
  Tag,
  Sparkles,
  Wand2,
  Star,
  Crown,
  TrendingUp,
  Eye,
} from "lucide-react";
import Header from "@/components/layout/Header";

interface BlogFormProps {
  initialData?: {
    title: string;
    content: string;
    image?: string | null;
    tags?: string[];
  };
  onSubmit: (data: {
    title: string;
    content: string;
    image?: string;
    tags?: string[];
  }) => Promise<void>;
  isEditing?: boolean;
}

export default function BlogForm({
  initialData,
  onSubmit,
  isEditing = false,
}: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await onSubmit({
        title,
        content,
        image,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      setSuccess(true);

      // Reset form if creating new blog
      if (!isEditing) {
        setTitle("");
        setContent("");
        setImage("");
        setTags("");
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const charCount = content.length;
  const estimatedReadTime = Math.ceil(wordCount / 200); // Average reading speed

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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-12 px-6 py-8 relative z-10">
        <Card className="border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl overflow-hidden relative group hover:shadow-3xl transition-all duration-500">
          {/* Premium Border Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm"></div>
          <div className="absolute inset-[2px] bg-white dark:bg-slate-800 rounded-lg"></div>

          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white p-8 relative z-10 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 -translate-y-20 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 translate-y-16 animate-pulse delay-700"></div>
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Crown className="h-3 w-3 text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 mb-1">
                  {isEditing ? "Edit Blog Post" : "Create New Blog"}
                </h1>
                <div className="flex items-center gap-3">
                  <p className="text-white/90 text-sm">
                    Share your thoughts with the world
                  </p>
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Premium Editor
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-8 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-4">
                <Label
                  htmlFor="title"
                  className="text-lg font-semibold flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                    <Type className="h-5 w-5 text-white" />
                  </div>
                  Blog Title
                  <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 text-xs">
                    Required
                  </Badge>
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter an engaging title for your blog..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 rounded-xl px-4 py-4 text-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm placeholder:text-gray-400"
                />
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Eye className="h-3 w-3" />
                  <span>
                    {title.length}/100 characters •
                    {title.length > 60
                      ? " Great length!"
                      : " Consider making it longer"}
                  </span>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Content Section */}
              <div className="space-y-4">
                <Label
                  htmlFor="content"
                  className="text-lg font-semibold flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  Blog Content
                  <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 text-xs">
                    Required
                  </Badge>
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write your amazing content here... Share your insights, experiences, and knowledge with your readers."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300 rounded-xl px-4 py-4 min-h-[300px] resize-none bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm placeholder:text-gray-400"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{wordCount} words</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>~{estimatedReadTime} min read</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{charCount} characters</span>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Image Section */}
              <div className="space-y-4">
                <Label
                  htmlFor="image"
                  className="text-lg font-semibold flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg">
                    <ImageIcon className="h-5 w-5 text-white" />
                  </div>
                  Featured Image
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 text-xs">
                    Optional
                  </Badge>
                </Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/your-image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 rounded-xl px-4 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm placeholder:text-gray-400"
                />
                {image && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
                    <p className="text-sm text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Image Preview:
                    </p>
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt="Featured image preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-8" />

              {/* Tags Section */}
              <div className="space-y-4">
                <Label
                  htmlFor="tags"
                  className="text-lg font-semibold flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg">
                    <Tag className="h-5 w-5 text-white" />
                  </div>
                  Tags
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 text-xs">
                    Optional
                  </Badge>
                </Label>
                <Input
                  id="tags"
                  type="text"
                  placeholder="technology, web development, react, nextjs (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-300 rounded-xl px-4 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm placeholder:text-gray-400"
                />
                {tags && (
                  <div className="flex flex-wrap gap-2">
                    {tags.split(",").map((tag, index) => {
                      const trimmedTag = tag.trim();
                      if (!trimmedTag) return null;
                      return (
                        <Badge
                          key={index}
                          className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 dark:from-orange-950 dark:to-red-950 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {trimmedTag}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>

              <Separator className="my-8" />

              {/* Submit Section */}
              <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={loading || !title.trim() || !content.trim()}
                    className="px-12 py-4 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-xl border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {isEditing ? "Updating..." : "Publishing..."}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Save className="h-5 w-5" />
                        {isEditing ? "Update Blog" : "Publish Blog"}
                      </div>
                    )}
                  </Button>
                </div>

                {success && (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 rounded-xl shadow-lg animate-in slide-in-from-top duration-500">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <p className="text-green-800 dark:text-green-200 font-semibold text-lg">
                        {isEditing
                          ? "Blog updated successfully!"
                          : "Blog published successfully!"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tips Section */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <Wand2 className="h-5 w-5" />
                      Writing Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-blue-600 dark:text-blue-400 space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>
                        Use an engaging title to capture readers' attention
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>
                        Include relevant images to make your content more visual
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>
                        Add tags to help readers discover your content
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Aim for 300+ words for better engagement</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
