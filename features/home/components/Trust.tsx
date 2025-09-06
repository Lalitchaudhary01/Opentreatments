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

const Trust = () => {
  return (
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
  );
};

export default Trust;
