import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TemplatesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            <FileText className="h-5 w-5" />
            <span>Co-Founder Agreement Generator</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
            <Link href="/generator">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
                  Agreement Templates
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Choose from our expert-crafted templates that proactively address common founder dilemmas.
                </p>
              </div>

              <Alert className="bg-secondary border-primary/30">
                <Info className="h-5 w-5 text-primary" />
                <AlertTitle className="text-primary">Shariah-Compliant Partnership Principles</AlertTitle>
                <AlertDescription className="text-sm">
                  All our templates follow the principles of Partnership (Sharika شركة) where partners pool resources to
                  share in profit and loss. Profits are shared as agreed, while losses are proportional to capital
                  contribution.
                </AlertDescription>
              </Alert>

              <div className="rounded-lg border p-4 bg-white mb-8">
                <h3 className="font-medium mb-2 text-primary">Key Partnership Terms</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Profit & Loss Distribution</h4>
                    <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                      <li>Profits can be shared in any agreed ratio</li>
                      <li>Losses must be shared in proportion to capital contribution</li>
                      <li>No fixed returns or guarantees are permitted</li>
                      <li>Working partners without capital bear loss of their time/effort</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Partnership Structure</h4>
                    <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                      <li>Partners must consent to all terms</li>
                      <li>Each partner must contribute (capital, labor, or liability)</li>
                      <li>Partners act as agents for the partnership</li>
                      <li>All partners must bear potential risk on contributions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-muted/30">
                <h3 className="font-medium mb-2">Founder Dilemmas Addressed</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  All our templates are designed to prevent the most common startup conflicts by addressing:
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Solo vs. Team Structure</span> - Clear frameworks for adding
                      co-founders
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Cofounder Selection</span> - Provisions for skill assessment and
                      team dynamics
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Role Allocation</span> - Defined responsibilities and authority
                      boundaries
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <span className="text-xs font-bold text-primary">4</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Equity Distribution</span> - Fair allocation frameworks with vesting
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <span className="text-xs font-bold text-primary">5</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Decision-Making</span> - Clear processes for both strategic and
                      operational decisions
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <span className="text-xs font-bold text-primary">6</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Three Rs Alignment</span> - Coherence between relationships, roles,
                      and rewards
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <span className="text-xs font-bold text-primary">7</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Wealth vs. Control</span> - Balancing financial goals with decision
                      authority
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <span className="text-xs font-bold text-primary">8</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Conflict Resolution</span> - Structured processes for addressing
                      disagreements
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-primary">Standard Startup Template</CardTitle>
                    <CardDescription>
                      Balanced approach for first-time founders with equal contributions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Key Dilemmas Addressed</h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          <li>
                            <span className="font-medium">Team Structure:</span> Equal partnership model with clear
                            onboarding process for additional founders
                          </li>
                          <li>
                            <span className="font-medium">Roles:</span> Balanced responsibilities with collaborative
                            decision-making
                          </li>
                          <li>
                            <span className="font-medium">Equity:</span> Equal split (50/50 or 33/33/33) with 4-year
                            vesting and 1-year cliff
                          </li>
                          <li>
                            <span className="font-medium">Conflict:</span> Mediation-first approach with deadlock
                            resolution mechanisms
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1">Shariah Compliance</h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          <li>Sharikat al-amwāl structure (partnership of capital)</li>
                          <li>Equal profit sharing with proportional loss distribution</li>
                          <li>No guaranteed returns or fixed payments</li>
                          <li>Clear agency roles for partnership management</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/generator?template=standard" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90">Use Template</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-primary">Technical/Business Split</CardTitle>
                    <CardDescription>Optimized for technical founder + business founder partnerships.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Key Dilemmas Addressed</h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          <li>
                            <span className="font-medium">Role Allocation:</span> Clear domain separation (technical vs.
                            business) with non-overlapping authority
                          </li>
                          <li>
                            <span className="font-medium">Equity:</span> Contribution-based split (typically 60/40) with
                            milestone-based vesting
                          </li>
                          <li>
                            <span className="font-medium">Decision-Making:</span> Domain-specific autonomy with joint
                            approval for strategic decisions
                          </li>
                          <li>
                            <span className="font-medium">Wealth vs. Control:</span> Balanced provisions for both
                            growth-oriented and control-oriented founders
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1">Shariah Compliance</h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          <li>Hybrid sharikat al-amwāl/aʿmāl structure (capital and labor)</li>
                          <li>Custom profit sharing based on total contribution value</li>
                          <li>Losses distributed according to capital ratio</li>
                          <li>Wakāla (agency) framework for domain management</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/generator?template=tech-business" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90">Use Template</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-primary">Shariah-Compliant Template</CardTitle>
                    <CardDescription>Structured according to Islamic finance principles.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Key Dilemmas Addressed</h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          <li>
                            <span className="font-medium">Relationship Structure:</span> Mushāraka partnership with
                            clear rights and obligations
                          </li>
                          <li>
                            <span className="font-medium">Rewards:</span> Profit sharing by agreement, losses by capital
                            ratio
                          </li>
                          <li>
                            <span className="font-medium">Roles:</span> Agency-based management (Wakāla) with defined
                            authority limits
                          </li>
                          <li>
                            <span className="font-medium">Conflict Resolution:</span> Sulḥ (amicable settlement) process
                            with Islamic arbitration
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1">Shariah Compliance</h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          <li>Strict adherence to classical fiqh partnership principles</li>
                          <li>Avoidance of gharar (uncertainty) and riba (interest)</li>
                          <li>Comprehensive profit-loss sharing framework</li>
                          <li>Ethical business conduct provisions (halal activities only)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/generator?template=shariah" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90">Use Template</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-primary">Silicon Valley Venture-Ready</CardTitle>
                    <CardDescription>Optimized for rapid scaling and investor readiness.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Key Dilemmas Addressed</h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          <li>
                            <span className="font-medium">Wealth vs. Control:</span> Sophisticated provisions balancing
                            growth with founder protection
                          </li>
                          <li>
                            <span className="font-medium">Decision Structure:</span> CEO-led hierarchy with board
                            oversight mechanisms
                          </li>
                          <li>
                            <span className="font-medium">Equity:</span> Dynamic vesting with acceleration triggers and
                            anti-dilution provisions
                          </li>
                          <li>
                            <span className="font-medium">Three Rs Alignment:</span> Structured for high-growth teams
                            with diverse backgrounds
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1">Shariah Compliance</h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          <li>Modified sharikat al-wujūh (partnership of goodwill/credit)</li>
                          <li>Equity-based financing with no interest-bearing components</li>
                          <li>Risk-sharing investor provisions (no guaranteed returns)</li>
                          <li>Halal business activities and ethical investment clauses</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/generator?template=venture" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90">Use Template</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="sm:col-span-2 border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-primary">Custom Agreement</CardTitle>
                    <CardDescription>
                      Build your agreement from scratch with expert guidance on all founder dilemmas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Our expert system will guide you through creating a fully customized Shariah-compliant partnership
                      agreement addressing all eight critical founder dilemmas:
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium mb-1">Partnership Structure & Selection</h3>
                          <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                            <li>Choose from multiple Islamic partnership types:</li>
                            <li>Sharikat al-amwāl (partnership of capital)</li>
                            <li>Sharikat al-aʿmāl/abdan (partnership of services)</li>
                            <li>Sharikat al-wujūh (partnership of goodwill/credit)</li>
                            <li>Mudaraba (capital + labor partnership)</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Role Allocation</h3>
                          <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                            <li>Wakāla (agency) framework for responsibilities</li>
                            <li>Authority boundary definitions</li>
                            <li>Performance evaluation criteria</li>
                            <li>Role evolution frameworks</li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium mb-1">Profit & Loss Distribution</h3>
                          <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                            <li>Customizable profit-sharing ratios</li>
                            <li>Capital-proportional loss distribution</li>
                            <li>Contribution valuation methods</li>
                            <li>Performance-based adjustments (Shariah-compliant)</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Decision-Making & Governance</h3>
                          <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                            <li>Tiered decision frameworks</li>
                            <li>Voting mechanisms by decision type</li>
                            <li>Relationship-role-reward alignment</li>
                            <li>Regular alignment review processes</li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium mb-1">Wealth vs. Control Balance</h3>
                          <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                            <li>Founder motivation assessment</li>
                            <li>Control preservation mechanisms</li>
                            <li>Growth strategy alignment</li>
                            <li>Investor readiness provisions (Shariah-compliant)</li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium mb-1">Conflict Resolution</h3>
                          <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                            <li>Sulḥ (amicable settlement) process</li>
                            <li>Islamic arbitration framework</li>
                            <li>Deadlock-breaking mechanisms</li>
                            <li>Third-party mediation protocols</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/generator?template=custom" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90">Start Custom Agreement</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              <div className="rounded-lg border p-4 bg-white">
                <h3 className="font-medium mb-2 text-primary">Terms That Must Be Clarified</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Capital Contributions</h4>
                    <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                      <li>Exact amount and type of each partner's contribution</li>
                      <li>Valuation method for non-cash contributions</li>
                      <li>Timeline for capital deposits</li>
                      <li>Rules for additional capital calls</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Profit & Loss Distribution</h4>
                    <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                      <li>Specific percentage of profit for each partner</li>
                      <li>Capital-proportional loss distribution</li>
                      <li>Frequency and method of profit distribution</li>
                      <li>Rules for reinvesting profits</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Management & Authority</h4>
                    <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                      <li>Who has authority to bind the partnership</li>
                      <li>Spending limits for each partner</li>
                      <li>Decision-making process for major actions</li>
                      <li>Reporting and accountability requirements</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Exit & Dissolution</h4>
                    <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                      <li>Events triggering dissolution</li>
                      <li>Buy-out valuation methodology</li>
                      <li>Process for partner withdrawal</li>
                      <li>Asset distribution upon dissolution</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-secondary/30">
                <h3 className="font-medium mb-2 text-primary">Modern Implementation Options</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Digital Applications</h4>
                    <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                      <li>Online accounting with automatic profit distribution</li>
                      <li>Digital dashboards for partnership transparency</li>
                      <li>Collaboration tools for decision-making</li>
                      <li>Electronic signature for agreement execution</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Web3/Smart Contract Options</h4>
                    <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                      <li>DAO structures for decentralized governance</li>
                      <li>Automated profit distribution via smart contracts</li>
                      <li>Tokenized partnership shares</li>
                      <li>On-chain voting for major decisions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-white">
                <h3 className="font-medium mb-2 text-primary">Expert Insights on Founder Dilemmas</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our templates incorporate research on why startups succeed or fail due to founder dynamics:
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium">Noam Wasserman's Research:</span> 65% of startups fail due to
                    preventable founder conflicts
                  </li>
                  <li>
                    <span className="font-medium">Y Combinator Data:</span> Teams with prior working relationships have
                    2.5x higher success rates
                  </li>
                  <li>
                    <span className="font-medium">Harvard Business School Study:</span> Clear role definition reduces
                    founder disputes by 73%
                  </li>
                  <li>
                    <span className="font-medium">Islamic Finance Principles:</span> Partnerships based on mutual risk
                    sharing create more sustainable businesses
                  </li>
                  <li>
                    <span className="font-medium">Kauffman Foundation:</span> Balanced wealth/control motivations
                    correlate with 2x higher success rates
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <Link href="/generator">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                    Create Your Agreement <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-primary">
              <FileText className="h-5 w-5" />
              <span>Co-Founder Agreement Generator</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Creating legally sound co-founder agreements to help startups succeed.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-medium text-primary">Legal Disclaimer</p>
            <p className="text-muted-foreground">
              This tool provides general information and is not a substitute for legal advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
