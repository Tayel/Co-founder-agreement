import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <Link href="/" className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>Co-Founder Agreement Generator</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
            <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
            <Link href="/generator">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About Our Co-Founder Agreement Generator
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Creating legally sound co-founder agreements to help startups succeed.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  Our mission is to help co-founders establish clear, comprehensive agreements that prevent common
                  pitfalls and conflicts. By addressing potential issues upfront, we help startups build stronger
                  foundations for success.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Why Co-Founder Agreements Matter</h2>
                <p className="text-muted-foreground">
                  According to research by Noam Wasserman, author of "The Founder's Dilemmas," 65% of startups fail due
                  to co-founder conflicts. These conflicts often stem from unclear expectations, misaligned incentives,
                  and ambiguous decision-making processes.
                </p>
                <p className="text-muted-foreground">
                  A well-crafted co-founder agreement addresses these potential issues before they arise, providing a
                  clear framework for:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Equity distribution and vesting schedules</li>
                  <li>Roles, responsibilities, and decision-making processes</li>
                  <li>Intellectual property ownership</li>
                  <li>Exit strategies and buyout procedures</li>
                  <li>Dispute resolution mechanisms</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Approach</h2>
                <p className="text-muted-foreground">
                  Our co-founder agreement generator combines legal expertise with insights from startup research to
                  create comprehensive, customized agreements. We've incorporated principles from various legal
                  traditions, including:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Standard corporate law practices</li>
                  <li>Shariah-compliant partnership principles</li>
                  <li>Modern startup best practices</li>
                  <li>Behavioral economics insights on incentive alignment</li>
                </ul>
                <p className="text-muted-foreground">
                  This holistic approach ensures that your co-founder agreement not only meets legal requirements but
                  also addresses the human and relational aspects of partnership.
                </p>
              </div>

              <div className="flex justify-center">
                <Link href="/generator">
                  <Button size="lg" className="gap-2">
                    Create Your Agreement <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold">
              <FileText className="h-5 w-5" />
              <span>Co-Founder Agreement Generator</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Creating legally sound co-founder agreements to help startups succeed.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-medium">Legal Disclaimer</p>
            <p className="text-muted-foreground">
              This tool provides general information and is not a substitute for legal advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
