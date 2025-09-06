import TextBorderAnimation from "@/components/animata/text/text-border-animation";
import { Button } from "@/components/ui/button";
import { Search, Hospital, Shield } from "lucide-react";
const HowWork = () => {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl text-[#10B981] md:text-4xl font-bold text-center mb-16 text-balance">
          <TextBorderAnimation
            text="How It Works"
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance text-[#10B981]"
          />
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">1. Search & Compare</h3>
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
  );
};

export default HowWork;
