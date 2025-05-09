"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1930] to-[#0d2240] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-[#0a1930]/80 rounded-lg border border-[#4caf50] shadow-[0_0_20px_rgba(76,175,80,0.4)] p-8">
        <h1 className="text-4xl font-bold text-white text-center mb-6">QistasChain Co-founder Agreement</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#1a2e47] rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-white mb-4">Create Agreement</h2>
            <p className="text-gray-300 mb-6">
              Generate a comprehensive co-founder agreement tailored to your startup's needs.
            </p>
            <Link href="/generator">
              <Button className="w-full bg-[#4caf50] hover:bg-[#388e3c] text-white">Start Creating</Button>
            </Link>
          </div>

          <div className="bg-[#1a2e47] rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-white mb-4">Team Dashboard</h2>
            <p className="text-gray-300 mb-6">
              Visualize your team structure and manage team members in a football-style formation.
            </p>
            <Link href="/team-dashboard">
              <Button className="w-full bg-[#4caf50] hover:bg-[#388e3c] text-white">
                <UserPlus className="mr-2 h-4 w-4" /> Start Building the Team
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1a2e47] rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-white mb-2">Templates</h3>
            <p className="text-gray-300 mb-4">Browse pre-made agreement templates.</p>
            <Link href="/templates">
              <Button
                variant="outline"
                className="w-full border-[#4caf50] text-[#4caf50] hover:bg-[#4caf50] hover:text-white"
              >
                View Templates
              </Button>
            </Link>
          </div>

          <div className="bg-[#1a2e47] rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-white mb-2">About</h3>
            <p className="text-gray-300 mb-4">Learn more about our platform.</p>
            <Link href="/about">
              <Button
                variant="outline"
                className="w-full border-[#4caf50] text-[#4caf50] hover:bg-[#4caf50] hover:text-white"
              >
                About Us
              </Button>
            </Link>
          </div>

          <div className="bg-[#1a2e47] rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-white mb-2">FAQ</h3>
            <p className="text-gray-300 mb-4">Find answers to common questions.</p>
            <Link href="/faq">
              <Button
                variant="outline"
                className="w-full border-[#4caf50] text-[#4caf50] hover:bg-[#4caf50] hover:text-white"
              >
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
