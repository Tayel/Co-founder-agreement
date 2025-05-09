"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Trophy, Clock, PieChart, Users, Star, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlayerCard } from "@/components/player-card"
import { AddTeamWidget } from "@/components/add-team-widget"

export default function TeamDashboard() {
  const [currentWeek, setCurrentWeek] = useState(12)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [showBench, setShowBench] = useState(false)
  const [showAddTeamWidget, setShowAddTeamWidget] = useState(false)

  // QistasChain team data with reporting relationships
  const mohamedTayel = {
    id: 1,
    name: "Mohamed Tayel",
    role: "GK",
    position: "Founder & Compliance Expert",
    status: "green",
    project: "Compliance Framework",
    lastDeliverable: "2023-05-01",
    oneOnOneRating: 4.8,
    x: 50,
    y: 90,
    experience: "10 yrs",
    hours: "40 h/wk",
    rating: 9.2,
    marketValue: "£120k + £30k bonus",
    traits: ["Compliance", "QA"],
    tags: ["Founder", "Quality"],
    photo: "/businessman-suit.png",
    attributes: {
      responsiveness: 88,
      riskAppetite: 45,
      workloadStability: 92,
      strategicVision: 95,
      communication: 85,
      execution: 90,
    },
    reports: [
      {
        initials: "AT",
        name: "Amr Tayel",
        position: "Chief Revenue Officer",
        status: "green",
      },
      {
        initials: "KK",
        name: "Kareem Kassab",
        position: "Growth Product Manager",
        status: "green",
      },
      {
        initials: "SO",
        name: "Sherif Abouklila",
        position: "Senior Software Engineer",
        status: "amber",
      },
    ],
  }

  const amrTayel = {
    id: 9,
    name: "Amr Tayel",
    role: "ST",
    position: "Chief Revenue Officer",
    status: "green",
    project: "Sales Pipeline",
    lastDeliverable: "2023-05-03",
    oneOnOneRating: 4.9,
    x: 50,
    y: 25,
    experience: "8 yrs",
    hours: "40 h/wk",
    rating: 9.0,
    marketValue: "£110k + £40k bonus",
    traits: ["Revenue", "Leadership"],
    tags: ["Sales", "Growth"],
    photo: "/businessman-suit.png",
    attributes: {
      responsiveness: 85,
      riskAppetite: 75,
      workloadStability: 80,
      strategicVision: 88,
      communication: 92,
      execution: 90,
    },
    reports: [
      {
        initials: "AT",
        name: "Aban Tayel",
        position: "Marketing Manager",
        status: "amber",
      },
    ],
    reportsTo: {
      initials: "MT",
      name: "Mohamed Tayel",
      position: "Founder & Compliance Expert",
    },
  }

  const kareemKassab = {
    id: 7,
    name: "Kareem Kassab",
    role: "CM",
    position: "Growth Product Manager",
    status: "green",
    project: "Product Roadmap",
    lastDeliverable: "2023-05-01",
    oneOnOneRating: 4.7,
    x: 50,
    y: 50,
    experience: "6 yrs",
    hours: "40 h/wk",
    rating: 8.7,
    marketValue: "£90k + £20k bonus",
    traits: ["Product", "Growth"],
    tags: ["Strategy", "Execution"],
    photo: "/businessman-suit.png",
    attributes: {
      responsiveness: 90,
      riskAppetite: 70,
      workloadStability: 85,
      strategicVision: 92,
      communication: 88,
      execution: 90,
    },
    reports: [
      {
        initials: "OS",
        name: "Otabek Saydikaharov",
        position: "Data Science & Analytics",
        status: "green",
      },
    ],
    reportsTo: {
      initials: "MT",
      name: "Mohamed Tayel",
      position: "Founder & Compliance Expert",
    },
  }

  // Complete team members array
  const [teamMembers, setTeamMembers] = useState([
    mohamedTayel,
    {
      id: 2,
      initials: "AE",
      name: "Amr Elkordy",
      role: "LB",
      position: "DevOps & Infrastructure",
      status: "green",
      project: "Cloud Infrastructure",
      lastDeliverable: "2023-04-28",
      oneOnOneRating: 4.5,
      x: 20,
      y: 70,
      reportsTo: {
        initials: "SO",
        name: "Sherif Abouklila",
        position: "Senior Software Engineer",
      },
    },
    {
      id: 3,
      initials: "OO",
      name: "Omar Osman",
      role: "LCB",
      position: "Smart Contract Engineer",
      status: "green",
      project: "Blockchain Integration",
      lastDeliverable: "2023-05-03",
      oneOnOneRating: 4.7,
      x: 35,
      y: 70,
      reportsTo: {
        initials: "SO",
        name: "Sherif Abouklila",
        position: "Senior Software Engineer",
      },
    },
    {
      id: 4,
      initials: "SA",
      name: "Sherif Abouklila",
      role: "RCB",
      position: "Senior Software Engineer",
      status: "amber",
      project: "Core Platform",
      lastDeliverable: "2023-04-25",
      oneOnOneRating: 4.3,
      x: 65,
      y: 70,
      reports: [
        {
          initials: "AE",
          name: "Amr Elkordy",
          position: "DevOps & Infrastructure",
          status: "green",
        },
        {
          initials: "OO",
          name: "Omar Osman",
          position: "Smart Contract Engineer",
          status: "green",
        },
      ],
      reportsTo: {
        initials: "MT",
        name: "Mohamed Tayel",
        position: "Founder & Compliance Expert",
      },
    },
    {
      id: 5,
      initials: "MZ",
      name: "Mahmoud Zoeer",
      role: "RB",
      position: "Islamic Finance Consultant",
      status: "green",
      project: "Finance Module",
      lastDeliverable: "2023-05-02",
      oneOnOneRating: 4.6,
      x: 80,
      y: 70,
      reportsTo: {
        initials: "SO",
        name: "Sherif Abouklila",
        position: "Senior Software Engineer",
      },
    },
    {
      id: 6,
      initials: "OS",
      name: "Otabek Saydikaharov",
      role: "LM",
      position: "Data Science & Analytics",
      status: "green",
      project: "Analytics Dashboard",
      lastDeliverable: "2023-04-30",
      oneOnOneRating: 4.5,
      x: 30,
      y: 45,
      reportsTo: {
        initials: "KK",
        name: "Kareem Kassab",
        position: "Growth Product Manager",
      },
    },
    kareemKassab,
    {
      id: 8,
      initials: "AT",
      name: "Aban Tayel",
      role: "RM",
      position: "Marketing Manager",
      status: "amber",
      project: "Marketing Campaign",
      lastDeliverable: "2023-04-27",
      oneOnOneRating: 4.2,
      x: 70,
      y: 45,
      reportsTo: {
        initials: "AT",
        name: "Amr Tayel",
        position: "Chief Revenue Officer",
      },
    },
    amrTayel,
  ])

  const matchEvents = [
    {
      id: 1,
      type: "goal",
      icon: "🔴",
      title: "GOAL-Line Save!",
      description: "Mohamed intervened to avert compliance risk on Finance Module",
      timestamp: "10:15 AM",
    },
    {
      id: 2,
      type: "yellow",
      icon: "⚠️",
      title: "Yellow Card",
      description: "Sherif missed ticket SLAs 2 days running on Core Platform",
      timestamp: "11:30 AM",
    },
    {
      id: 3,
      type: "star",
      icon: "⭐",
      title: "Hat-Trick!",
      description: "Amr Tayel closed 3 major deals this week",
      timestamp: "2:45 PM",
    },
    {
      id: 4,
      type: "sub",
      icon: "🔄",
      title: "Substitution",
      description: "Otabek ready for promotion (perf > 90% + >6 mo)",
      timestamp: "4:20 PM",
    },
  ]

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player)
  }

  const handleAddTeamMember = (newMember) => {
    setTeamMembers((prev) => [...prev, newMember])

    // Add a new match event for the new team member
    const newEvent = {
      id: matchEvents.length + 1,
      type: "transfer",
      icon: "🔄",
      title: "New Signing!",
      description: `${newMember.name} has joined the team as ${newMember.position}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    matchEvents.unshift(newEvent)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#0a1930] to-[#0d2240] bg-fixed"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,.03)' fillRule='evenodd'/%3E%3C/svg%3E\")",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>

          {/* Add Team Member button */}
          <Button className="bg-[#4caf50] hover:bg-[#388e3c] text-white" onClick={() => setShowAddTeamWidget(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Team Member
          </Button>
        </div>

        {/* Top Bar "Scoreboard" */}
        <div className="mb-6 bg-[#0a1930]/80 rounded-lg p-4 border border-[#4caf50] shadow-[0_0_10px_rgba(76,175,80,0.3)] flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-[#4caf50] rounded-full p-2 mr-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">QistasChain Matchday vs Q2 Objectives</h1>
            </div>
          </div>

          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-[#0d2240] rounded-lg p-2 flex items-center">
              <Clock className="h-5 w-5 text-[#4caf50] mr-2" />
              <span className="text-white font-bold">Week {currentWeek} of 52</span>
            </div>
            <div className="ml-4 bg-[#0d2240] rounded-lg p-2 flex items-center">
              <PieChart className="h-5 w-5 text-[#4caf50] mr-2" />
              <div className="w-24 h-4 bg-[#1a2e47] rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-blue-500 h-full" style={{ width: "35%" }}></div>
                  <div className="bg-green-500 h-full" style={{ width: "45%" }}></div>
                  <div className="bg-gray-500 h-full" style={{ width: "20%" }}></div>
                </div>
              </div>
              <span className="text-white text-xs ml-2">L/B/I</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-[#0d2240] rounded-lg p-2">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-[#ffd700] mr-2" />
                <span className="text-white font-bold">Top Performers</span>
              </div>
              <div className="mt-1 text-xs text-white">
                <div className="flex justify-between">
                  <span>1. Amr T.</span>
                  <span className="text-[#ffd700]">9.0</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Mohamed T.</span>
                  <span className="text-[#c0c0c0]">9.2</span>
                </div>
                <div className="flex justify-between">
                  <span>3. Kareem K.</span>
                  <span className="text-[#cd7f32]">8.7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel "Coach Player Card" */}
          <div className="lg:col-span-3">
            <div className="bg-[#0a1930]/80 rounded-lg border border-[#4caf50] shadow-[0_0_10px_rgba(76,175,80,0.3)] overflow-hidden">
              <div className="p-4">
                <h2 className="text-white text-lg font-bold uppercase mb-4">Team Player Cards</h2>

                {[mohamedTayel, amrTayel, kareemKassab].map((coach, index) => (
                  <div
                    key={coach.id}
                    className={`mb-4 border-2 ${index === 0 ? "border-[#4caf50]" : "border-[#1a2e47]"} rounded-lg overflow-hidden cursor-pointer hover:border-[#4caf50] transition-colors duration-200`}
                    onClick={() => handlePlayerClick(coach)}
                  >
                    <div className="bg-[#1a2e47] p-3">
                      <div className="flex">
                        <div className="w-16 h-16 bg-[#0d2240] rounded-md overflow-hidden mr-3">
                          <img
                            src={coach.photo || "/placeholder.svg"}
                            alt={coach.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{coach.name}</h3>
                          <p className="text-gray-300 text-sm">
                            {coach.position} ({coach.role})
                          </p>
                          <p className="text-gray-400 text-xs">
                            Exp: {coach.experience} | {coach.hours}
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {Array.from({ length: Math.floor(coach.rating / 2) }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-[#ffd700] fill-[#ffd700]" />
                              ))}
                              {coach.rating % 2 >= 1 ? <Star className="h-3 w-3 text-[#ffd700]" /> : null}
                              {Array.from({ length: 5 - Math.ceil(coach.rating / 2) }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-gray-500" />
                              ))}
                            </div>
                            <span className="text-white text-xs ml-1">{coach.rating}/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="h-1 w-full bg-[#0a1930] rounded-full overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${coach.rating * 10}%`,
                              background: `linear-gradient(90deg, #4caf50 0%, ${coach.rating > 7 ? "#4caf50" : coach.rating > 5 ? "#ffa500" : "#ff0000"} 100%)`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#0d2240] p-3">
                      <p className="text-white text-sm">Market Value: {coach.marketValue}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {coach.traits.map((trait) => (
                          <Badge
                            key={trait}
                            variant="outline"
                            className="bg-[#1a2e47] text-[#4caf50] border-[#4caf50] text-xs"
                          >
                            #{trait}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {coach.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-[#1a2e47] text-white border-[#1a2e47] text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts "Match Events" Feed */}
            <div className="mt-6 bg-[#0a1930]/80 rounded-lg border border-[#4caf50] shadow-[0_0_10px_rgba(76,175,80,0.3)] overflow-hidden">
              <div className="p-4">
                <h2 className="text-white text-lg font-bold uppercase mb-4">Match Events</h2>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {matchEvents.map((event) => (
                    <div key={event.id} className="bg-[#1a2e47] rounded-lg p-3 border-l-4 border-[#4caf50]">
                      <div className="flex items-start">
                        <div className="text-2xl mr-3">{event.icon}</div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="text-white font-bold text-sm">{event.title}</h4>
                            <span className="text-gray-400 text-xs ml-auto">{event.timestamp}</span>
                          </div>
                          <p className="text-gray-300 text-xs mt-1">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Center "Pitch" – Team Formation Map */}
          <div className="lg:col-span-6">
            <div className="bg-[#0a1930]/80 rounded-lg border border-[#4caf50] shadow-[0_0_10px_rgba(76,175,80,0.3)] overflow-hidden">
              <div className="p-4">
                <h2 className="text-white text-lg font-bold uppercase mb-4">QistasChain Formation (1-4-3-1)</h2>
                <div className="relative w-full" style={{ paddingBottom: "120%" }}>
                  {/* Soccer field background */}
                  <div className="absolute inset-0 bg-[#2e7d32] rounded-lg overflow-hidden">
                    {/* Field markings */}
                    <div className="absolute inset-0 border-2 border-white/30 rounded-lg"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 transform -translate-y-1/2"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/30 transform -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

                    {/* Goal areas */}
                    <div className="absolute top-0 left-1/2 w-40 h-16 border-2 border-white/30 transform -translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-1/2 w-40 h-16 border-2 border-white/30 transform -translate-x-1/2"></div>

                    {/* Penalty areas */}
                    <div className="absolute top-0 left-1/2 w-60 h-24 border-2 border-white/30 transform -translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-1/2 w-60 h-24 border-2 border-white/30 transform -translate-x-1/2"></div>

                    {/* Team members */}
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className={`absolute w-14 h-14 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110`}
                        style={{
                          left: `${member.x}%`,
                          top: `${member.y}%`,
                        }}
                        onClick={() => handlePlayerClick(member)}
                      >
                        <div
                          className={`w-full h-full rounded-full flex items-center justify-center border-2 ${
                            member.status === "green"
                              ? "border-green-500 bg-green-500/20"
                              : member.status === "amber"
                                ? "border-yellow-500 bg-yellow-500/20"
                                : "border-red-500 bg-red-500/20"
                          }`}
                        >
                          <div className="text-white font-bold">{member.initials}</div>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-[#1a2e47] text-white text-xs px-2 py-0.5 rounded-full">
                          {member.role}
                        </div>
                      </div>
                    ))}

                    {/* Formation label */}
                    <div className="absolute bottom-2 right-2 bg-[#1a2e47]/80 text-white text-xs px-2 py-1 rounded">
                      Formation: 1-4-3-1
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comp & Rewards "Post-Match Analysis" */}
            <div className="mt-6 bg-[#0a1930]/80 rounded-lg border border-[#4caf50] shadow-[0_0_10px_rgba(76,175,80,0.3)] overflow-hidden">
              <div className="p-4">
                <h2 className="text-white text-lg font-bold uppercase mb-4">Team Performance Analysis</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-white">
                    <thead>
                      <tr className="border-b border-[#1a2e47]">
                        <th className="text-left py-2 px-3 text-sm font-bold">Name</th>
                        <th className="text-left py-2 px-3 text-sm font-bold">Role</th>
                        <th className="text-left py-2 px-3 text-sm font-bold">Position</th>
                        <th className="text-left py-2 px-3 text-sm font-bold">Rating</th>
                        <th className="text-left py-2 px-3 text-sm font-bold">Market %ile</th>
                        <th className="text-left py-2 px-3 text-sm font-bold">Bonus %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#1a2e47]">
                        <td className="py-2 px-3 text-sm">Mohamed Tayel</td>
                        <td className="py-2 px-3 text-sm">Founder & Compliance</td>
                        <td className="py-2 px-3 text-sm">GK</td>
                        <td className="py-2 px-3 text-sm">9.2/10</td>
                        <td className="py-2 px-3 text-sm">85th</td>
                        <td className="py-2 px-3 text-sm">15%</td>
                      </tr>
                      <tr className="border-b border-[#1a2e47]">
                        <td className="py-2 px-3 text-sm">Amr Tayel</td>
                        <td className="py-2 px-3 text-sm">Chief Revenue Officer</td>
                        <td className="py-2 px-3 text-sm">ST</td>
                        <td className="py-2 px-3 text-sm">9.0/10</td>
                        <td className="py-2 px-3 text-sm">80th</td>
                        <td className="py-2 px-3 text-sm">20%</td>
                      </tr>
                      <tr className="border-b border-[#1a2e47] border-2 border-green-500">
                        <td className="py-2 px-3 text-sm">Kareem Kassab</td>
                        <td className="py-2 px-3 text-sm">Growth Product Manager</td>
                        <td className="py-2 px-3 text-sm">CM</td>
                        <td className="py-2 px-3 text-sm">8.7/10</td>
                        <td className="py-2 px-3 text-sm">75th</td>
                        <td className="py-2 px-3 text-sm">12%</td>
                      </tr>
                      <tr className="border-b border-[#1a2e47] bg-red-500/10">
                        <td className="py-2 px-3 text-sm">Sherif Abouklila</td>
                        <td className="py-2 px-3 text-sm">Senior Software Engineer</td>
                        <td className="py-2 px-3 text-sm">RCB</td>
                        <td className="py-2 px-3 text-sm">7.8/10</td>
                        <td className="py-2 px-3 text-sm">65th</td>
                        <td className="py-2 px-3 text-sm">8%</td>
                      </tr>
                      <tr className="border-b border-[#1a2e47]">
                        <td className="py-2 px-3 text-sm">Otabek Saydikaharov</td>
                        <td className="py-2 px-3 text-sm">Data Science & Analytics</td>
                        <td className="py-2 px-3 text-sm">LM</td>
                        <td className="py-2 px-3 text-sm">8.5/10</td>
                        <td className="py-2 px-3 text-sm">70th</td>
                        <td className="py-2 px-3 text-sm">10%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel "Attribute Bars" */}
          <div className="lg:col-span-3">
            <div className="bg-[#0a1930]/80 rounded-lg border border-[#4caf50] shadow-[0_0_10px_rgba(76,175,80,0.3)] overflow-hidden">
              <div className="p-4">
                <h2 className="text-white text-lg font-bold uppercase mb-4">Player Attributes</h2>

                <Tabs defaultValue="mohamed" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-[#1a2e47]">
                    <TabsTrigger value="mohamed" className="text-xs">
                      Mohamed
                    </TabsTrigger>
                    <TabsTrigger value="amr" className="text-xs">
                      Amr
                    </TabsTrigger>
                    <TabsTrigger value="kareem" className="text-xs">
                      Kareem
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="mohamed" className="mt-4 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Responsiveness</span>
                        <span className="text-white">{mohamedTayel.attributes.responsiveness}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${mohamedTayel.attributes.responsiveness}%`,
                            background: "linear-gradient(90deg, #4caf50 0%, #a5d6a7 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Risk Appetite</span>
                        <span className="text-white">{mohamedTayel.attributes.riskAppetite}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${mohamedTayel.attributes.riskAppetite}%`,
                            background: "linear-gradient(90deg, #ff9800 0%, #ffcc80 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Workload Stability</span>
                        <span className="text-white">{mohamedTayel.attributes.workloadStability}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${mohamedTayel.attributes.workloadStability}%`,
                            background: "linear-gradient(90deg, #2196f3 0%, #90caf9 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Strategic Vision</span>
                        <span className="text-white">{mohamedTayel.attributes.strategicVision}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${mohamedTayel.attributes.strategicVision}%`,
                            background: "linear-gradient(90deg, #9c27b0 0%, #ce93d8 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Communication</span>
                        <span className="text-white">{mohamedTayel.attributes.communication}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${mohamedTayel.attributes.communication}%`,
                            background: "linear-gradient(90deg, #e91e63 0%, #f48fb1 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Execution</span>
                        <span className="text-white">{mohamedTayel.attributes.execution}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${mohamedTayel.attributes.execution}%`,
                            background: "linear-gradient(90deg, #ffc107 0%, #ffe082 100%)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="amr" className="mt-4 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Responsiveness</span>
                        <span className="text-white">{amrTayel.attributes.responsiveness}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${amrTayel.attributes.responsiveness}%`,
                            background: "linear-gradient(90deg, #4caf50 0%, #a5d6a7 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Risk Appetite</span>
                        <span className="text-white">{amrTayel.attributes.riskAppetite}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${amrTayel.attributes.riskAppetite}%`,
                            background: "linear-gradient(90deg, #ff9800 0%, #ffcc80 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Workload Stability</span>
                        <span className="text-white">{amrTayel.attributes.workloadStability}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${amrTayel.attributes.workloadStability}%`,
                            background: "linear-gradient(90deg, #2196f3 0%, #90caf9 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Strategic Vision</span>
                        <span className="text-white">{amrTayel.attributes.strategicVision}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${amrTayel.attributes.strategicVision}%`,
                            background: "linear-gradient(90deg, #9c27b0 0%, #ce93d8 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Communication</span>
                        <span className="text-white">{amrTayel.attributes.communication}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${amrTayel.attributes.communication}%`,
                            background: "linear-gradient(90deg, #e91e63 0%, #f48fb1 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Execution</span>
                        <span className="text-white">{amrTayel.attributes.execution}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${amrTayel.attributes.execution}%`,
                            background: "linear-gradient(90deg, #ffc107 0%, #ffe082 100%)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="kareem" className="mt-4 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Responsiveness</span>
                        <span className="text-white">{kareemKassab.attributes.responsiveness}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${kareemKassab.attributes.responsiveness}%`,
                            background: "linear-gradient(90deg, #4caf50 0%, #a5d6a7 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Risk Appetite</span>
                        <span className="text-white">{kareemKassab.attributes.riskAppetite}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${kareemKassab.attributes.riskAppetite}%`,
                            background: "linear-gradient(90deg, #ff9800 0%, #ffcc80 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Workload Stability</span>
                        <span className="text-white">{kareemKassab.attributes.workloadStability}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${kareemKassab.attributes.workloadStability}%`,
                            background: "linear-gradient(90deg, #2196f3 0%, #90caf9 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Strategic Vision</span>
                        <span className="text-white">{kareemKassab.attributes.strategicVision}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${kareemKassab.attributes.strategicVision}%`,
                            background: "linear-gradient(90deg, #9c27b0 0%, #ce93d8 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Communication</span>
                        <span className="text-white">{kareemKassab.attributes.communication}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${kareemKassab.attributes.communication}%`,
                            background: "linear-gradient(90deg, #e91e63 0%, #f48fb1 100%)",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Execution</span>
                        <span className="text-white">{kareemKassab.attributes.execution}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${kareemKassab.attributes.execution}%`,
                            background: "linear-gradient(90deg, #ffc107 0%, #ffe082 100%)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Bottom "Radar Chart" */}
            <div className="mt-6 bg-[#0a1930]/80 rounded-lg border border-[#4caf50] shadow-[0_0_10px_rgba(76,175,80,0.3)] overflow-hidden">
              <div className="p-4">
                <h2 className="text-white text-lg font-bold uppercase mb-4">Team Skill Wheel</h2>
                <div className="relative w-full" style={{ paddingBottom: "100%" }}>
                  <div className="absolute inset-0">
                    {/* Radar chart background */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full max-w-[250px] max-h-[250px] relative">
                        {/* Concentric circles */}
                        <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
                        <div className="absolute inset-[20%] border border-white/10 rounded-full"></div>
                        <div className="absolute inset-[40%] border border-white/10 rounded-full"></div>
                        <div className="absolute inset-[60%] border border-white/10 rounded-full"></div>
                        <div className="absolute inset-[80%] border border-white/10 rounded-full"></div>

                        {/* Axis lines */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 transform -translate-y-1/2"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/10 transform -translate-x-1/2"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/10 transform -translate-x-1/2 rotate-45"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/10 transform -translate-x-1/2 -rotate-45"></div>

                        {/* Axis labels */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
                          Strategy
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-white text-xs">
                          Communication
                        </div>
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 text-white text-xs">
                          Risk
                        </div>
                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 text-white text-xs">
                          Execution
                        </div>

                        {/* Radar polygon */}
                        <svg className="absolute inset-0" viewBox="0 0 100 100">
                          <polygon
                            points="50,10 90,50 50,90 10,50"
                            fill="rgba(76, 175, 80, 0.3)"
                            stroke="#4caf50"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FIFA-style Player Card Modal */}
        {selectedPlayer && <PlayerCard player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}

        {/* Add Team Widget Modal */}
        {showAddTeamWidget && (
          <AddTeamWidget onClose={() => setShowAddTeamWidget(false)} onAddTeamMember={handleAddTeamMember} />
        )}
      </div>
    </div>
  )
}
