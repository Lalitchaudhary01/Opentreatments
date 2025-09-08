"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { updateUser } from "../actions/updateUser";
import { deleteBlog } from "@/features/Blogs/actions/deleteBlog"; // ✅ correct import

import { getBlogById } from "@/features/Blogs/actions/getBlogById";

export default function MyProfile() {
  const { data: session, status } = useSession();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    if (status !== "loading") setLoadingSession(false);
  }, [status]);

  if (loadingSession) return <p>Loading...</p>;

  if (!session) {
    signIn(); // redirect to login
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
    <div className="flex flex-col gap-8 p-6 min-h-[calc(100vh-4rem)]">
      <ProfileForm user={user} />
      <UserBlogs userId={user.id} />
    </div>
  );
}

function ProfileForm({ user }: { user: any }) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const updatedUser = await updateUser({ id: user.id, name, phone });
      setName(updatedUser.name);
      setPhone(updatedUser.phone);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const initials = name.charAt(0).toUpperCase() || "U";

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl">
      <CardHeader className="flex flex-col items-center space-y-3">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.image} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardTitle className="text-sm text-muted-foreground">
          {user.email}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            readOnly
            className="border p-2 rounded cursor-not-allowed bg-gray-100"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Update Profile"}
          </Button>
        </form>
        {success && (
          <p className="text-green-500 mt-2">Profile updated successfully!</p>
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
        const data = await getBlogById(userId); // ✅ fix
        setBlogs(data ? [data] : []);
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
      await deleteBlog({ id });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl rounded-2xl">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-bold">My Blogs</CardTitle>
        <Link href="/blogs/create">
          <Button>Create New Blog</Button>
        </Link>
      </CardHeader>

      <CardContent>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs yet. Start writing!</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 border rounded-lg flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {blog.content}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/blogs/edit/${blog.id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
