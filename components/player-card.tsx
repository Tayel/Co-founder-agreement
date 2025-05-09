"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PlayerCardProps {
  player: any
  onClose: () => void
}

export function PlayerCard({ player, onClose }: PlayerCardProps) {
  const [showReports, setShowReports] = useState(false)

  if (!player) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-4xl rounded-lg bg-[#0a1930] border border-[#4caf50] shadow-[0_0_20px_rgba(76,175,80,0.4)] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-[#1a2e47] p-1 text-white hover:bg-[#4caf50]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Navigation tabs */}
        <div className="bg-[#0d2240] px-4 pt-4">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <div className="h-12 w-12 rounded-full bg-[#4caf50] flex items-center justify-center">
                  <img src="/quality-control-checklist.png" alt="QistasChain" className="h-10 w-10 rounded-full" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white uppercase">{player.name}</h2>
                <p className="text-gray-300">
                  {player.position} ({player.role})
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto text-[#4caf50] border-[#4caf50] hover:bg-[#4caf50] hover:text-white"
              >
                <Plus className="mr-1 h-4 w-4" /> ADD TO COMPARISON
              </Button>
            </div>

            <TabsList className="grid w-full grid-cols-5 bg-[#1a2e47]">
              <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
              <TabsTrigger value="training">TRAINING</TabsTrigger>
              <TabsTrigger value="stats">STATS</TabsTrigger>
              <TabsTrigger value="transfers">TRANSFERS</TabsTrigger>
              <TabsTrigger value="reports">REPORTS</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-0">
              <div className="grid grid-cols-12 gap-4">
                {/* Left side - Player image and number */}
                <div className="col-span-4 relative">
                  <div className="absolute top-4 left-8 text-[120px] font-bold text-[#4caf50]/20 z-0">
                    {player.number || player.id}
                  </div>
                  <div className="relative z-10 h-[400px] flex items-center justify-center">
                    <img
                      src={player.photo || "/placeholder.svg?height=350&width=250&query=business person in suit"}
                      alt={player.name}
                      className="h-[350px] object-contain"
                    />
                  </div>
                  <div className="absolute bottom-4 left-0 w-full flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{player.experience?.split(" ")[0] || "5"}</div>
                      <div className="text-xs text-gray-400">YR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{player.completedProjects || "181"}</div>
                      <div className="text-xs text-gray-400">CP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{player.activeProjects || "76"}</div>
                      <div className="text-xs text-gray-400">AP</div>
                    </div>
                  </div>
                </div>

                {/* Right side - Stats and info */}
                <div className="col-span-8 p-6">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Season stats */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">SEASON STATS</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Projects Completed:</span>
                          <span className="text-white font-medium">
                            {player.projectsCompleted || "12"} ({player.onTime || "9"})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Deliverables / Milestones:</span>
                          <span className="text-white font-medium">
                            {player.deliverables || "7"} / {player.milestones || "4"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Tasks (per week):</span>
                          <span className="text-white font-medium">{player.tasksPerWeek || "5.3"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Meetings (per week):</span>
                          <span className="text-white font-medium">{player.meetingsPerWeek || "6.8"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Communication Score:</span>
                          <span className="text-white font-medium">{player.communicationScore || "93"}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Playing positions */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">PLAYING POSITIONS</h3>
                      <div className="relative h-[150px] bg-[#1a2e47] rounded-md overflow-hidden">
                        {/* Soccer field background */}
                        <div className="absolute inset-0 border border-white/20 rounded-md">
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 transform -translate-y-1/2"></div>
                          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 transform -translate-x-1/2"></div>
                          <div className="absolute top-0 left-1/2 w-16 h-8 border border-white/20 transform -translate-x-1/2"></div>
                          <div className="absolute bottom-0 left-1/2 w-16 h-8 border border-white/20 transform -translate-x-1/2"></div>
                          <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        {/* Position markers */}
                        {player.role === "GK" && (
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                            <div className="h-6 w-6 rounded-full bg-[#4caf50] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">GK</span>
                            </div>
                          </div>
                        )}
                        {player.role === "LB" && (
                          <div className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2">
                            <div className="h-6 w-6 rounded-full bg-[#4caf50] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">LB</span>
                            </div>
                          </div>
                        )}
                        {player.role === "LCB" && (
                          <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2">
                            <div className="h-6 w-6 rounded-full bg-[#4caf50] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">CB</span>
                            </div>
                          </div>
                        )}
                        {player.role === "RCB" && (
                          <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2">
                            <div className="h-6 w-6 rounded-full bg-[#4caf50] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">CB</span>
                            </div>
                          </div>
                        )}
                        {player.role === "RB" && (
                          <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2">
                            <div className="h-6 w-6 rounded-full bg-[#4caf50] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">RB</span>
                            </div>
                          </div>
                        )}
                        {player.role === "LM" && (
                          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="h-6 w-6 rounded-full bg-[#ff5722] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">LM</span>
                            </div>
                          </div>
                        )}
                        {player.role === "CM" && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="h-6 w-6 rounded-full bg-[#ff5722] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">CM</span>
                            </div>
                          </div>
                        )}
                        {player.role === "RM" && (
                          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                            <div className="h-6 w-6 rounded-full bg-[#ff5722] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">RM</span>
                            </div>
                          </div>
                        )}
                        {player.role === "ST" && (
                          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
                            <div className="h-6 w-6 rounded-full bg-[#ff5722] flex items-center justify-center">
                              <span className="text-xs font-bold text-white">ST</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">Average Rating:</span>
                          <span className="text-xl font-bold text-[#ffc107]">{player.rating || "8.3"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Physical form */}
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-white mb-4">PERFORMANCE TREND</h3>
                    <div className="grid grid-cols-5 gap-4 mb-2">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <div className="h-8 w-8 rounded-full bg-[#1a2e47] flex items-center justify-center">
                            <span className="text-xs font-bold text-white">P1</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">Jan. 14</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <div className="h-8 w-8 rounded-full bg-[#1a2e47] flex items-center justify-center">
                            <span className="text-xs font-bold text-white">P2</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">Feb. 19</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <div className="h-8 w-8 rounded-full bg-[#1a2e47] flex items-center justify-center">
                            <span className="text-xs font-bold text-white">P3</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">Mar. 27</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <div className="h-8 w-8 rounded-full bg-[#1a2e47] flex items-center justify-center">
                            <span className="text-xs font-bold text-white">P4</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">Apr. 10</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <div className="h-8 w-8 rounded-full bg-[#1a2e47] flex items-center justify-center">
                            <span className="text-xs font-bold text-white">P5</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">May. 18</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 mb-2">
                      <div className="flex justify-center">
                        <div className="h-8 w-12 rounded bg-[#ff9800] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">6.9</span>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="h-8 w-12 rounded bg-[#4caf50] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">7.1</span>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="h-8 w-12 rounded bg-[#f44336] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">5.2</span>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="h-8 w-12 rounded bg-[#f44336] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">5.3</span>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="h-8 w-12 rounded bg-[#4caf50] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">7.5</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative h-12 mt-2">
                      <div className="absolute inset-x-0 top-1/2 h-px bg-gray-600 transform -translate-y-1/2"></div>
                      <div
                        className="absolute left-[10%] right-[10%] top-1/2 h-1 transform -translate-y-1/2 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #ff9800 0%, #4caf50 20%, #f44336 40%, #f44336 60%, #4caf50 80%, #4caf50 100%)",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="p-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">
                    TEAM MEMBERS REPORTING TO {player.name.toUpperCase()}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#4caf50] border-[#4caf50] hover:bg-[#4caf50] hover:text-white"
                    onClick={() => setShowReports(!showReports)}
                  >
                    {showReports ? <ChevronUp className="mr-1 h-4 w-4" /> : <ChevronDown className="mr-1 h-4 w-4" />}
                    {showReports ? "HIDE REPORTS" : "SHOW REPORTS"}
                  </Button>
                </div>

                {showReports && (
                  <div className="space-y-4">
                    {player.reports && player.reports.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {player.reports.map((report, index) => (
                          <div key={index} className="bg-[#1a2e47] rounded-lg p-4 flex items-center">
                            <div className="h-12 w-12 rounded-full bg-[#0d2240] flex items-center justify-center mr-3">
                              <span className="text-white font-bold">{report.initials}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{report.name}</h4>
                              <p className="text-gray-400 text-sm">{report.position}</p>
                            </div>
                            <div className="ml-auto">
                              <Badge
                                className={`${
                                  report.status === "green"
                                    ? "bg-green-500"
                                    : report.status === "amber"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                } text-white`}
                              >
                                {report.status === "green" ? "Active" : report.status === "amber" ? "Warning" : "Issue"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#1a2e47] rounded-lg p-6 text-center">
                        <Users className="h-12 w-12 mx-auto text-gray-500 mb-2" />
                        <p className="text-gray-300">No team members currently reporting to {player.name}.</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="text-lg font-bold text-white mb-4">REPORTING TO</h3>
                  {player.reportsTo ? (
                    <div className="bg-[#1a2e47] rounded-lg p-4 flex items-center">
                      <div className="h-12 w-12 rounded-full bg-[#0d2240] flex items-center justify-center mr-3">
                        <span className="text-white font-bold">{player.reportsTo.initials}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{player.reportsTo.name}</h4>
                        <p className="text-gray-400 text-sm">{player.reportsTo.position}</p>
                      </div>
                      <div className="ml-auto">
                        <Badge className="bg-[#4caf50] text-white">Manager</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#1a2e47] rounded-lg p-6 text-center">
                      <Users className="h-12 w-12 mx-auto text-gray-500 mb-2" />
                      <p className="text-gray-300">{player.name} is at the top of the reporting structure.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">PERFORMANCE METRICS</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Productivity</span>
                        <span className="text-white">{player.productivity || "85"}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4caf50]" style={{ width: `${player.productivity || 85}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Quality</span>
                        <span className="text-white">{player.quality || "92"}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4caf50]" style={{ width: `${player.quality || 92}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Collaboration</span>
                        <span className="text-white">{player.collaboration || "78"}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4caf50]" style={{ width: `${player.collaboration || 78}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Innovation</span>
                        <span className="text-white">{player.innovation || "65"}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff9800]" style={{ width: `${player.innovation || 65}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Leadership</span>
                        <span className="text-white">{player.leadership || "88"}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#1a2e47] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4caf50]" style={{ width: `${player.leadership || 88}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">PROJECT CONTRIBUTIONS</h3>
                  <div className="bg-[#1a2e47] rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Blockchain Integration</span>
                        <Badge className="bg-[#4caf50] text-white">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Smart Contract Development</span>
                        <Badge className="bg-[#4caf50] text-white">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">UI/UX Improvements</span>
                        <Badge className="bg-[#ff9800] text-white">Pending</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">API Integration</span>
                        <Badge className="bg-[#9e9e9e] text-white">Completed</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Security Audit</span>
                        <Badge className="bg-[#f44336] text-white">Delayed</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-white mb-4">SKILLS & EXPERTISE</h3>
                    <div className="flex flex-wrap gap-2">
                      {(
                        player.skills || [
                          "Blockchain",
                          "Smart Contracts",
                          "Solidity",
                          "React",
                          "Node.js",
                          "Project Management",
                        ]
                      ).map((skill, index) => (
                        <Badge key={index} className="bg-[#1a2e47] text-[#4caf50] border border-[#4caf50]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="training" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">TRAINING PROGRESS</h3>
                  <div className="space-y-4">
                    <div className="bg-[#1a2e47] rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Blockchain Fundamentals</span>
                        <Badge className="bg-[#4caf50] text-white">Completed</Badge>
                      </div>
                      <div className="h-2 w-full bg-[#0a1930] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4caf50]" style={{ width: "100%" }}></div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">Completed on: March 15, 2023</p>
                    </div>

                    <div className="bg-[#1a2e47] rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Smart Contract Development</span>
                        <Badge className="bg-[#4caf50] text-white">Completed</Badge>
                      </div>
                      <div className="h-2 w-full bg-[#0a1930] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4caf50]" style={{ width: "100%" }}></div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">Completed on: April 22, 2023</p>
                    </div>

                    <div className="bg-[#1a2e47] rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Advanced Solidity Patterns</span>
                        <Badge className="bg-[#ff9800] text-white">In Progress</Badge>
                      </div>
                      <div className="h-2 w-full bg-[#0a1930] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff9800]" style={{ width: "65%" }}></div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">Expected completion: June 30, 2023</p>
                    </div>

                    <div className="bg-[#1a2e47] rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Islamic Finance Principles</span>
                        <Badge className="bg-[#9e9e9e] text-white">Not Started</Badge>
                      </div>
                      <div className="h-2 w-full bg-[#0a1930] rounded-full overflow-hidden">
                        <div className="h-full bg-[#9e9e9e]" style={{ width: "0%" }}></div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">Scheduled for: July 15, 2023</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">CERTIFICATIONS</h3>
                  <div className="space-y-4">
                    <div className="bg-[#1a2e47] rounded-lg p-4 flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#4caf50] flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Certified Blockchain Developer</h4>
                        <p className="text-gray-400 text-sm">Blockchain Council</p>
                        <p className="text-gray-400 text-xs mt-1">Issued: January 2023 • Expires: January 2026</p>
                      </div>
                    </div>

                    <div className="bg-[#1a2e47] rounded-lg p-4 flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#2196f3] flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Smart Contract Security Professional</h4>
                        <p className="text-gray-400 text-sm">Consensys Academy</p>
                        <p className="text-gray-400 text-xs mt-1">Issued: March 2023 • No Expiration</p>
                      </div>
                    </div>

                    <div className="bg-[#1a2e47] rounded-lg p-4 flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#ff9800] flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Islamic Finance Fundamentals</h4>
                        <p className="text-gray-400 text-sm">AAOIFI</p>
                        <p className="text-gray-400 text-xs mt-1">In Progress • Expected: August 2023</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-white mb-4">DEVELOPMENT PLAN</h3>
                    <div className="bg-[#1a2e47] rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#4caf50] flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-xs font-bold text-white">1</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Complete Advanced Solidity Training</h4>
                            <p className="text-gray-400 text-xs">Target: June 2023</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#ff9800] flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-xs font-bold text-white">2</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Islamic Finance Certification</h4>
                            <p className="text-gray-400 text-xs">Target: August 2023</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#9e9e9e] flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-xs font-bold text-white">3</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Leadership & Management Training</h4>
                            <p className="text-gray-400 text-xs">Target: Q4 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transfers" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">ROLE HISTORY</h3>
                  <div className="space-y-4">
                    <div className="bg-[#1a2e47] rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-white font-medium">{player.position}</h4>
                          <p className="text-gray-400 text-sm">QistasChain</p>
                        </div>
                        <Badge className="bg-[#4caf50] text-white">Current</Badge>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">Jan 2022 - Present</p>
                    </div>

                    <div className="bg-[#1a2e47] rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-white font-medium">Senior Developer</h4>
                          <p className="text-gray-400 text-sm">FinTech Solutions</p>
                        </div>
                        <Badge className="bg-[#9e9e9e] text-white">Previous</Badge>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">Mar 2019 - Dec 2021</p>
                    </div>

                    <div className="bg-[#1a2e47] rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-white font-medium">Software Engineer</h4>
                          <p className="text-gray-400 text-sm">Tech Innovations Inc.</p>
                        </div>
                        <Badge className="bg-[#9e9e9e] text-white">Previous</Badge>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">Jun 2017 - Feb 2019</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">CAREER PROGRESSION</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#1a2e47]"></div>

                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#4caf50] flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Junior Developer</h4>
                        <p className="text-gray-400 text-sm">2017</p>
                        <p className="text-gray-300 text-sm mt-1">Started career in software development</p>
                      </div>
                    </div>

                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#2196f3] flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Senior Developer</h4>
                        <p className="text-gray-400 text-sm">2019</p>
                        <p className="text-gray-300 text-sm mt-1">
                          Promoted to senior role with leadership responsibilities
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#ff9800] flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Current Role</h4>
                        <p className="text-gray-400 text-sm">2022</p>
                        <p className="text-gray-300 text-sm mt-1">Joined QistasChain as {player.position}</p>
                      </div>
                    </div>

                    <div className="relative pl-12">
                      <div className="absolute left-0 w-8 h-8 rounded-full bg-[#9e9e9e] flex items-center justify-center">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Future Progression</h4>
                        <p className="text-gray-400 text-sm">Projected</p>
                        <p className="text-gray-300 text-sm mt-1">Potential advancement to leadership position</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
