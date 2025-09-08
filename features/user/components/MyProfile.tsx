"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Edit3,
  Trash2,
  Plus,
  Mail,
  Phone,
  User,
  BookOpen,
  Calendar,
  Eye,
  Settings,
  Crown,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import { updateUser } from "../actions/updateUser";
import { deleteBlog } from "@/features/Blogs/actions/deleteBlog";
import { getUserBlogs } from "@/features/Blogs/actions/getUserBlogs";
import Header from "@/components/layout/Header";

export default function MyProfile() {
  const { data: session, status } = useSession();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    if (status !== "loading") setLoadingSession(false);
  }, [status]);

  if (loadingSession) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 rounded-full absolute top-0 left-0 animate-reverse-spin"></div>
          </div>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold animate-pulse">
            Loading your premium profile...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    signIn();
    return null;
  }

  const user = {
    id: (session.user as any)?.id,
    name: session.user?.name || "",
    email: session.user?.email || "",
    phone: (session.user as any)?.phone || "",
    image: session.user?.image || "",
  };

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
      <div className="max-w-6xl mx-auto mt-12 px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard user={user} />
          </div>

          {/* Blogs Section */}
          <div className="lg:col-span-2">
            <UserBlogs userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ user }: { user: any }) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const updatedUser = await updateUser({ id: user.id, name, phone });
      setName(updatedUser.name);
      setPhone(updatedUser.phone);
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const initials = name.charAt(0).toUpperCase() || "U";

  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl relative group hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
      {/* Premium Border Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm"></div>
      <div className="absolute inset-[2px] bg-white dark:bg-slate-800 rounded-lg"></div>

      {/* Profile Header */}
      <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12 animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-0 w-16 h-16 bg-white/10 rounded-full translate-x-8 animate-pulse delay-1000"></div>
        </div>

        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-white hover:bg-white/20 h-8 w-8 p-0 transition-all duration-300 hover:scale-110 hover:rotate-90"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="relative group/avatar">
            {/* Premium Ring Animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-1 animate-spin-slow">
              <div className="w-full h-full bg-emerald-500 rounded-full"></div>
            </div>

            <Avatar className="h-24 w-24 border-4 border-white/50 shadow-2xl relative z-10 group-hover/avatar:scale-110 transition-transform duration-500">
              <AvatarImage
                src={user.image}
                alt={name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Premium Crown */}
            <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Crown className="h-4 w-4 text-white" />
            </div>

            {/* Online Status */}
            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-2xl font-bold mt-4 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            {name}
          </h2>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
              <Star className="h-3 w-3 mr-1" />
              Premium User
            </Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-6 relative z-10">
        {/* Contact Info Display */}
        {!isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300 group/info">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg group-hover/info:scale-110 transition-transform duration-300">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide font-semibold">
                  Email Address
                </p>
                <p className="text-sm font-medium truncate text-gray-800 dark:text-gray-200">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-all duration-300 group/info">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg group-hover/info:scale-110 transition-transform duration-300">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide font-semibold">
                  Phone Number
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {phone || "Not provided"}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-center">
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <User className="h-4 w-4 text-blue-500" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 rounded-xl px-4 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <Mail className="h-4 w-4 text-green-500" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                readOnly
                className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 cursor-not-allowed opacity-70 rounded-xl px-4 py-3"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <Phone className="h-4 w-4 text-purple-500" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 rounded-xl px-4 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl py-3"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="px-8 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {success && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 rounded-xl shadow-lg animate-in slide-in-from-top duration-500">
            <p className="text-green-800 dark:text-green-200 text-sm font-semibold text-center flex items-center justify-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              Profile updated successfully!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function UserBlogs({ userId }: { userId: string }) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getUserBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, [userId]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin animate-reverse-spin"></div>
            </div>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold ml-3">
              Loading your blogs...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl overflow-hidden relative group hover:shadow-3xl transition-all duration-500">
      {/* Premium Border Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm"></div>
      <div className="absolute inset-[2px] bg-white dark:bg-slate-800 rounded-lg"></div>

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white p-8 relative z-10 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 -translate-y-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 translate-y-16 animate-pulse delay-700"></div>
        </div>

        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                My Blogs
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-white/90 text-sm">
                  {blogs.length} {blogs.length === 1 ? "article" : "articles"}{" "}
                  published
                </p>
                <Badge className="bg-white/20 text-white border-white/30 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </div>
          </div>
          <Link href="/blog/create">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-0">
              <Plus className="h-4 w-4 mr-2" />
              New Blog
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-8 relative z-10">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-2xl mx-auto flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-3xl blur-xl animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 mb-3">
              No blogs yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Start sharing your thoughts with the world!
            </p>
            <Link href="/blog/create">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 px-8 py-4 text-lg rounded-xl">
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Blog
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog, index) => (
              <Card
                key={blog.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-r from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Premium Hover Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="absolute inset-[1px] bg-white dark:bg-slate-800 rounded-lg"></div>

                <CardContent className="p-6 relative z-10">
                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-3 py-1"
                        >
                          #{index + 1}
                        </Badge>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>Today</span>
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 text-xs">
                          Published
                        </Badge>
                      </div>

                      <h4 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 line-clamp-2">
                        {blog.title}
                      </h4>

                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed mb-4">
                        {blog.content}
                      </p>

                      <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full">
                          <Eye className="h-3 w-3" />
                          <span>0 views</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-950 rounded-full text-blue-600 dark:text-blue-400">
                          <Star className="h-3 w-3" />
                          <span>Premium</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <Link href={`/blog/edit/${blog.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 w-10 p-0 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-300 hover:scale-110"
                        >
                          <Edit3 className="h-4 w-4 text-blue-600" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                        className="h-10 w-10 p-0 rounded-xl border-2 border-red-200 hover:border-red-400 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Add custom CSS for animations
const styles = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes reverse-spin {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
  
  .animate-reverse-spin {
    animation: reverse-spin 2s linear infinite;
  }
`;
