"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Hospital,
  Calculator,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/layout/Header";
import { useTheme } from "next-themes";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

import KeyFeatures from "./KeyFeatures";
import HowWork from "./HowWork";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl text-[#10B981] md:text-6xl font-bold  mb-6 text-balance">
            <LineShadowText className="italic" shadowColor={shadowColor}>
              Know the cost before you step in.
            </LineShadowText>
          </h1>
          <p className="text-xl text-[#1FB6E8] mb-12 text-pretty">
            Compare hospital, medicine, and consultation prices in minutes.
          </p>

          {/* Search Bar */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <Select>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Search For" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="treatment">Treatment</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Enter your location" className="pl-10" />
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search treatments, hospitals..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 bg-[#10B981] hover:bg-[#0ea271] text-white"
            >
              Compare Costs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent"
            >
              Consult a Doctor
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <KeyFeatures />

      {/* How It Works */}
      <HowWork />

      {/* Trust & Safety */}
      

      {/* Latest Insights */}
      <section id="insights" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">
            Latest Healthcare Cost Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted rounded-t-lg"></div>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  Cost Guide
                </Badge>
                <CardTitle className="text-lg">
                  Appendix Surgery Cost in Delhi — 2025 Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete breakdown of appendectomy costs across major
                  hospitals in Delhi, including insurance coverage options.
                </CardDescription>
                <Button variant="ghost" className="mt-4 p-0 h-auto">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted rounded-t-lg"></div>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  Analysis
                </Badge>
                <CardTitle className="text-lg">
                  How to Choose the Right Health Insurance Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Expert tips on selecting health insurance that covers your
                  needs while minimizing out-of-pocket costs.
                </CardDescription>
                <Button variant="ghost" className="mt-4 p-0 h-auto">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted rounded-t-lg"></div>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  Trends
                </Badge>
                <CardTitle className="text-lg">
                  Healthcare Price Transparency: What's New in 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Latest regulations and how they're making healthcare pricing
                  more transparent for patients.
                </CardDescription>
                <Button variant="ghost" className="mt-4 p-0 h-auto">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
