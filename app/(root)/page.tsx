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
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function HealthcareCostComparison() {
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
                  <SelectValue placeholder="Treatment Type" />
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
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">
            Everything you need to make informed healthcare decisions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Hospital className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Compare Hospital Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get transparent pricing from hospitals in your area for any
                  procedure or treatment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>AI Estimator</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our AI analyzes your specific case to provide personalized
                  cost estimates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Verified Bills</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Real patient bills and experiences to give you accurate cost
                  expectations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Insurance Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Calculate your out-of-pocket costs based on your insurance
                  coverage.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                1. Search & Compare
              </h3>
              <p className="text-muted-foreground">
                Enter your treatment and location to see costs from multiple
                providers in your area.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Check Coverage</h3>
              <p className="text-muted-foreground">
                Use our insurance calculator to understand your out-of-pocket
                costs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Hospital className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Book or Consult</h3>
              <p className="text-muted-foreground">
                Schedule your appointment or consult with a doctor directly
                through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Trusted by thousands of patients
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Our commitment to transparency and accuracy in healthcare pricing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <Badge variant="secondary" className="mx-auto mb-4 w-fit">
                  <Award className="w-4 h-4 mr-2" />
                  Verified Data
                </Badge>
                <CardTitle>100% Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All pricing data is verified and sourced directly from
                  healthcare providers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Badge variant="secondary" className="mx-auto mb-4 w-fit">
                  <Users className="w-4 h-4 mr-2" />
                  50K+ Users
                </Badge>
                <CardTitle>Trusted Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join thousands of patients who have saved money using our
                  platform.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Badge variant="secondary" className="mx-auto mb-4 w-fit">
                  <Shield className="w-4 h-4 mr-2" />
                  HIPAA Compliant
                </Badge>
                <CardTitle>Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your health information is protected with enterprise-grade
                  security.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-lg mb-4">
                "MedCost helped me save over $3,000 on my surgery. I wish I had
                known about this platform earlier!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    Knee Surgery Patient
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

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
      <footer className="bg-muted/50 border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Hospital className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">MedCost</span>
              </div>
              <p className="text-muted-foreground">
                Making healthcare costs transparent and accessible for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Cost Comparison
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Insurance Calculator
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Doctor Consultation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    HIPAA Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 MedCost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
