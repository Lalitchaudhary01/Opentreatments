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

      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-12 px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard user={user} />
          </div>
          <Link href="/user/consultations">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              My Consultations
            </Button>
          </Link>

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
    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 shadow-lg bg-white dark:bg-slate-800 relative">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              Profile
            </h2>
            <p className="text-sm text-blue-500 font-medium">Premium User</p>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-blue-500 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              Edit Profile
            </Button>
          )}
        </div>

        {!isEditing ? (
          <>
            {/* Profile Info Display */}
            <div className="flex items-start gap-6 mb-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <Avatar className="h-24 w-24 border-4 border-gray-200 dark:border-gray-700">
                  <AvatarImage
                    src={user.image}
                    alt={name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-bold  text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* User Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {name}
                </h3>
                <p className="text-sm text-blue-500 mb-4">Premium User</p>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Contact Information
              </h4>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </Label>
                <p className="text-sm text-gray-800 dark:text-white font-medium">
                  {user.email}
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Phone
                </Label>
                <p className="text-sm text-gray-800 dark:text-white font-medium">
                  {phone || "Not provided"}
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                readOnly
                className="bg-gray-100 dark:bg-slate-700 cursor-not-allowed opacity-70"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
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
                className="px-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-200 text-sm font-medium text-center">
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
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 shadow-lg bg-white dark:bg-slate-800">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading your blogs...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 shadow-lg bg-white dark:bg-slate-800">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              My Blogs
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {blogs.length} {blogs.length === 1 ? "article" : "articles"}{" "}
              published
            </p>
          </div>
          <Link href="/blog/create">
            <Button className="bg-[#10B981] hover:bg-[#1a8c66] text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Blog
            </Button>
          </Link>
        </div>

        <Separator className="mb-6" />

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              No blogs yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start sharing your thoughts with the world!
            </p>
            <Link href="/blog/create">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Blog
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog, index) => (
              <Card
                key={blog.id}
                className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Published
                        </span>
                      </div>

                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
                        {blog.title}
                      </h4>

                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                        {blog.content}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>0 views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Today</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/blog/edit/${blog.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="h-3 w-3" />
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
