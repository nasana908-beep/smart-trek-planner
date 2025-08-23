import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Map,
  Calendar,
  Users,
  Mountain,
  AlertTriangle,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  TrendingUp,
} from 'lucide-react';

const SmartTrekPlanner = () => {
  const [activeTab, setActiveTab] = useState('chatbot');
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userProfile, setUserProfile] = useState({
    experience: 'beginner',
    fitness: 'moderate',
    budget: 'medium',
    preferences: [],
  });
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [showPlan, setShowPlan] = useState(false);

  // Mock trek data with AI scoring
  const trekDatabase = [
    {
      id: 1,
      name: 'Everest Base Camp',
      difficulty: 'hard',
      altitude: 5364,
      duration: 14,
      location: 'Nepal',
      aiScore: 85,
      riskLevel: 'high',
      bestSeason: 'Oct-Nov, Mar-May',
      highlights: [
        "World's highest peak base",
        'Sherpa culture',
        'Stunning mountain views',
      ],
      gear: ['High-altitude gear', 'Warm sleeping bag', 'Trekking poles'],
      cost: '$2500-4000',
    },
    {
      id: 2,
      name: 'Annapurna Circuit',
      difficulty: 'moderate',
      altitude: 5416,
      duration: 12,
      location: 'Nepal',
      aiScore: 92,
      riskLevel: 'medium',
      bestSeason: 'Oct-Nov, Mar-May',
      highlights: [
        'Diverse landscapes',
        'Cultural villages',
        'Thorong La Pass',
      ],
      gear: ['Standard trekking gear', 'Layers', 'Good boots'],
      cost: '$1200-2500',
    },
    {
      id: 3,
      name: 'Torres del Paine W Trek',
      difficulty: 'moderate',
      altitude: 1200,
      duration: 5,
      location: 'Chile',
      aiScore: 88,
      riskLevel: 'low',
      bestSeason: 'Dec-Mar',
      highlights: [
        'Dramatic granite towers',
        'Glacial lakes',
        'Diverse wildlife',
      ],
      gear: ['Wind-resistant jacket', 'Hiking boots', 'Rain gear'],
      cost: '$800-1500',
    },
  ];

  // AI Chatbot Logic
  const aiResponses = {
    greeting:
      "Hello! I'm your personal trekking advisor. I can help you find the perfect adventure based on your experience, fitness level, and preferences. What kind of trekking experience are you looking for?",
    experience:
      'Great! Based on your experience level, I can recommend treks that match your skills. Are you interested in high-altitude adventures or would you prefer something at lower elevations?',
    recommendations:
      "Based on our conversation, I've identified some perfect treks for you. Let me show you a personalized plan with detailed recommendations!",
  };

  const handleChatSubmit = e => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...chatMessages, { type: 'user', text: inputMessage }];
    setChatMessages(newMessages);

    // Simple AI response logic
    setTimeout(() => {
      let aiResponse = '';
      if (chatMessages.length === 0) {
        aiResponse = aiResponses.greeting;
      } else if (
        inputMessage.toLowerCase().includes('experience') ||
        inputMessage.toLowerCase().includes('beginner')
      ) {
        aiResponse = aiResponses.experience;
        setUserProfile(prev => ({ ...prev, experience: 'beginner' }));
      } else if (
        inputMessage.toLowerCase().includes('plan') ||
        inputMessage.toLowerCase().includes('recommend')
      ) {
        aiResponse = aiResponses.recommendations;
        setTimeout(() => setShowPlan(true), 1000);
      } else {
        aiResponse =
          'That sounds interesting! Tell me more about your trekking experience and what kind of adventure excites you most.';
      }

      setChatMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
    }, 800);

    setInputMessage('');
  };

  // Calculate AI recommendation score
  const calculateTrekScore = trek => {
    let score = trek.aiScore;

    // Adjust based on user profile
    if (userProfile.experience === 'beginner' && trek.difficulty === 'hard')
      score -= 20;
    if (userProfile.experience === 'advanced' && trek.difficulty === 'easy')
      score -= 10;
    if (
      userProfile.budget === 'low' &&
      parseInt(trek.cost.split('-')[0].replace(/\D/g, '')) > 1500
    )
      score -= 15;

    return Math.max(0, Math.min(100, score));
  };

  const getRiskColor = risk => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600';
      case 'moderate':
        return 'text-yellow-600';
      case 'hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mountain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Khoj</h1>
            </div>
            <div className="text-sm text-gray-600">
              AI-Powered Adventure Assistant
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-md font-medium transition-all ${
              activeTab === 'chatbot'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Smart Chatbot</span>
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-md font-medium transition-all ${
              activeTab === 'recommendations'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>AI Recommendations</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-md font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Trek Dashboard</span>
          </button>
        </div>

        {/* Option 1: Smart Chatbot */}
        {activeTab === 'chatbot' && (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="border-b px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Personal Trekking Advisor
              </h2>
              <p className="text-gray-600">
                Chat with AI to discover your perfect adventure
              </p>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 && (
                <div className="flex items-center space-x-3 text-gray-500">
                  <MessageCircle className="w-6 h-6" />
                  <p>
                    Start a conversation to get personalized trek
                    recommendations...
                  </p>
                </div>
              )}

              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg chat-message ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-6">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleChatSubmit(e)}
                  placeholder="Ask about treks, gear, difficulty levels..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleChatSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Option 2: AI Recommendation Engine */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                AI-Powered Trek Scoring
              </h2>
              <p className="text-gray-600 mb-6">
                Our AI analyzes treks, guides, equipment, and altitude risk to
                create personalized recommendations.
              </p>

              <div className="grid gap-6">
                {trekDatabase.map(trek => {
                  const aiScore = calculateTrekScore(trek);
                  return (
                    <div
                      key={trek.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow trek-card"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {trek.name}
                          </h3>
                          <p className="text-gray-600 flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {trek.location} • {trek.duration} days
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="text-lg font-bold text-gray-900">
                              {aiScore}/100
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            AI Match Score
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">
                            Difficulty
                          </div>
                          <div
                            className={`font-medium capitalize ${getDifficultyColor(
                              trek.difficulty
                            )}`}
                          >
                            {trek.difficulty}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            Max Altitude
                          </div>
                          <div className="font-medium text-gray-900">
                            {trek.altitude}m
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            Risk Level
                          </div>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                              trek.riskLevel
                            )}`}
                          >
                            {trek.riskLevel}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Budget</div>
                          <div className="font-medium text-gray-900">
                            {trek.cost}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">
                          Highlights
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {trek.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedTrek(trek);
                          setActiveTab('dashboard');
                        }}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Detailed Plan
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Option 3: Full Trek Planner Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="border-b px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Trek Planning Dashboard
                </h2>
                <p className="text-gray-600">
                  Complete planning with AI suggestions and safety alerts
                </p>
              </div>

              <div className="p-6">
                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-64 mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-green-600 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Interactive Trek Map
                    </h3>
                    <p className="text-gray-600">
                      Visual routes with difficulty markers and altitude
                      profiles
                    </p>
                  </div>
                </div>

                {selectedTrek && (
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Trek Details */}
                    <div className="lg:col-span-2">
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {selectedTrek.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Duration:</span>{' '}
                            {selectedTrek.duration} days
                          </div>
                          <div>
                            <span className="text-gray-500">Best Season:</span>{' '}
                            {selectedTrek.bestSeason}
                          </div>
                          <div>
                            <span className="text-gray-500">Max Altitude:</span>{' '}
                            {selectedTrek.altitude}m
                          </div>
                          <div>
                            <span className="text-gray-500">Difficulty:</span>
                            <span
                              className={`ml-2 capitalize ${getDifficultyColor(
                                selectedTrek.difficulty
                              )}`}
                            >
                              {selectedTrek.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Gear Checklist */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          AI-Generated Gear Checklist
                        </h4>
                        <div className="space-y-2">
                          {selectedTrek.gear.map((item, index) => (
                            <label
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <input
                                type="checkbox"
                                className="rounded text-blue-600"
                              />
                              <span className="text-gray-700">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Safety Alerts */}
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          AI Safety Recommendations
                        </h4>
                        <div className="text-sm text-orange-800 space-y-2">
                          <p>• Altitude acclimatization required</p>
                          <p>• Weather monitoring essential</p>
                          <p>• Emergency evacuation insurance recommended</p>
                        </div>
                      </div>

                      {/* Guide Recommendations */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          Recommended Guides
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">
                                Sherpa Adventures
                              </div>
                              <div className="text-sm text-gray-500">
                                ⭐ 4.9/5 • 127 reviews
                              </div>
                            </div>
                            <div className="text-sm font-medium text-blue-600">
                              $280/day
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">
                                Mountain Guides Co.
                              </div>
                              <div className="text-sm text-gray-500">
                                ⭐ 4.7/5 • 89 reviews
                              </div>
                            </div>
                            <div className="text-sm font-medium text-blue-600">
                              $250/day
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lodging */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Lodging Options
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Tea Houses</span>
                            <span className="text-gray-600">$10-25/night</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Lodge Rooms</span>
                            <span className="text-gray-600">$25-50/night</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Private Rooms</span>
                            <span className="text-gray-600">$50-100/night</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!selectedTrek && (
                  <div className="text-center py-12">
                    <Mountain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No Trek Selected
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Choose a trek from the recommendations tab to see detailed
                      planning information
                    </p>
                    <button
                      onClick={() => setActiveTab('recommendations')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse Recommendations
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Personalized Plan Modal */}
        {showPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">
                  Your Personalized Trek Plan
                </h3>
                <p className="text-gray-600">
                  AI-generated recommendations based on our conversation
                </p>
              </div>

              <div className="p-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Perfect Match Found!
                  </h4>
                  <p className="text-blue-800">
                    Based on your beginner experience level, I recommend the{' '}
                    <strong>Annapurna Circuit</strong> with a 92% compatibility
                    score.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900">
                      Why this trek is perfect for you:
                    </h5>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700 list-disc list-inside">
                      <li>Moderate difficulty suitable for beginners</li>
                      <li>Excellent support infrastructure</li>
                      <li>Diverse cultural and natural experiences</li>
                      <li>Good acclimatization profile</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900">Next Steps:</h5>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700 list-disc list-inside">
                      <li>Start fitness training 2-3 months before</li>
                      <li>Book guide and permits 1 month ahead</li>
                      <li>Purchase/rent gear from our recommendations</li>
                      <li>Consider travel insurance with helicopter rescue</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 rounded-b-xl">
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowPlan(false);
                      setSelectedTrek(trekDatabase[1]); // Annapurna Circuit
                      setActiveTab('dashboard');
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Full Dashboard
                  </button>
                  <button
                    onClick={() => setShowPlan(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartTrekPlanner;
