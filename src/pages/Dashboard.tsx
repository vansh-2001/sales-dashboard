import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Settings, Users, LayoutGrid, Activity, Box, Zap, LogOut, Users2, CircleDot, Camera, Smartphone, Gamepad } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { fetchApiData } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ComparisonData {
  month: string;
  last_year: number;
  this_year: number;
}

interface TweetData {
  date2: string;
  unique_count: number;
  cumulative_tweets: number;
}

interface TopProduct {
  id: string;
  product_name: string;
  sold_amount: number;
  unit_price: number;
  revenue: number;
  rating: number;
}

const mockComparisonData = [
  { month: 'Jan', last_year: 5000, this_year: 6000 },
  { month: 'Feb', last_year: 10000, this_year: 2000 },
  { month: 'Mar', last_year: 20000, this_year: 40000 },
  { month: 'Apr', last_year: 32000, this_year: 21000 },
  { month: 'May', last_year: 12000, this_year: 9200 },
  { month: 'Jun', last_year: 13000, this_year: 8700 }
];

const mockTopProducts = [
  { id: '1', product_name: 'Camera Mi 360°', sold_amount: 432, unit_price: 120, revenue: 51320, rating: 4.81 },
  { id: '2', product_name: 'Message Gun', sold_amount: 120, unit_price: 60, revenue: 23901, rating: 3.44 },
  { id: '3', product_name: 'Redmi Note 9', sold_amount: 190, unit_price: 87.6, revenue: 87211, rating: 2.5 },
  { id: '4', product_name: 'One Plus Nord', sold_amount: 140, unit_price: 24.1, revenue: 29809, rating: 4.65 }
];

export default function Dashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>(mockComparisonData);
  const [topProducts, setTopProducts] = useState<TopProduct[]>(mockTopProducts);
  const [tweetActivity, setTweetActivity] = useState<TweetData[]>([]);
  const [metrics, setMetrics] = useState({ purchases: 4294, revenue: 322.3, refunds: 8.2 });
  const [performanceScore, setPerformanceScore] = useState(78);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const tweetData = await fetchApiData('sample_assignment_api_4');
        if (tweetData) {
          const processedData = tweetData
            .filter((_: any, index: number) => index % 10 === 0)
            .map((item: TweetData) => ({
              ...item,
              date: new Date(item.date2).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })
            }));
          setTweetActivity(processedData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateGaugeChart = () => {
    const radius = 70;
    const centerX = 100;
    const centerY = 110;
    const startAngle = Math.PI;
    const maxAngle = Math.PI;
    const progressAngle = startAngle + (performanceScore / 100) * maxAngle;
  
    const bgStartX = centerX + radius * Math.cos(startAngle);
    const bgStartY = centerY + radius * Math.sin(startAngle);
    const bgEndX = centerX + radius * Math.cos(startAngle + maxAngle);
    const bgEndY = centerY + radius * Math.sin(startAngle + maxAngle);
  
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(progressAngle);
    const endY = centerY + radius * Math.sin(progressAngle);
    const largeArcFlag = 0;
  
    return (
      <svg className="w-full h-full" viewBox="0 0 200 140">
        <path
          d={`M${bgStartX} ${bgStartY} A70 70 0 0 1 ${bgEndX} ${bgEndY}`}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
          strokeLinecap="round"
        />
  
        <path
          d={`M${startX} ${startY} A70 70 0 ${largeArcFlag} 1 ${endX} ${endY}`}
          fill="none"
          stroke="#2563EB"
          strokeWidth="8"
          strokeLinecap="round"
        />
  
        <text x="100" y="85" textAnchor="middle" fontSize="26" fontWeight="bold" fill="black">
          {performanceScore}
        </text>
  
        <text x="100" y="110" textAnchor="middle" fontSize="12" fill="#6B7280">
          of 100 points
        </text>
      </svg>
    );
  };

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 fixed inset-y-0 bg-gray-100 border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <CircleDot className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-semibold">Salesway</h1>
          </div>
          
          <div className="space-y-6">
            <button className="flex items-center text-gray-500 hover:text-gray-900 w-full">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </button>
            <button className="flex items-center text-gray-500 hover:text-gray-900 w-full">
              <Users2 className="w-5 h-5 mr-3" />
              Team
            </button>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-400 mb-4">MENU</p>
            <div className="space-y-4">
              <button className="flex items-center text-blue-600 font-medium bg-white rounded-lg p-2 w-full">
                <LayoutGrid className="w-5 h-5 mr-3" />
                Dashboard
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-900 w-full p-2">
                <Activity className="w-5 h-5 mr-3" />
                Campaigns
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-900 w-full p-2">
                <Box className="w-5 h-5 mr-3" />
                Flows
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-900 w-full p-2">
                <Zap className="w-5 h-5 mr-3" />
                Integrations
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-900 w-full p-2">
                <Users className="w-5 h-5 mr-3" />
                Customers
              </button>
              <button 
                onClick={handleSignOut}
                className="flex items-center text-gray-500 hover:text-gray-900 w-full p-2"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-64 border-t border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-3"
                />
                <span className="text-sm font-medium">Tom Wang</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 ml-64 min-h-screen overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

          <div className="flex gap-8">
            <div className="flex-1">
              <div className="flex items-center justify-end mb-4">
                <span className="text-gray-500 mr-3">Compare to</span>
                <select className="appearance-none bg-gray-50 text-gray-600 pl-4 pr-8 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last year</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm h-[104px]">
                  <p className="text-gray-500 mb-2">Purchases</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{metrics.purchases.toLocaleString()}</span>
                    <span className="ml-2 text-green-500 text-sm bg-green-50 px-2 py-0.5 rounded-full">+32%</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm h-[104px]">
                  <p className="text-gray-500 mb-2">Revenue</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">${metrics.revenue}k</span>
                    <span className="ml-2 text-green-500 text-sm bg-green-50 px-2 py-0.5 rounded-full">+49%</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm h-[104px]">
                  <p className="text-gray-500 mb-2">Refunds</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">${metrics.refunds}k</span>
                    <span className="ml-2 text-red-500 text-sm bg-red-50 px-2 py-0.5 rounded-full">-7%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 mt-8 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Comparison</h2>
                  <div className="relative">
                    <select className="appearance-none bg-gray-50 text-gray-600 pl-4 pr-8 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>6 months</option>
                    </select>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={comparisonData} 
                      margin={{ top: 20, right: 30, left: 80, bottom: 25 }}
                      barGap={3}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false}
                        dy={10}
                        tick={{ fill: '#6B7280' }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false}
                        ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000]}
                        tickFormatter={(value) => `${value/1000}k`}
                        tick={{ fill: '#6B7280' }}
                        width={80}
                        dx={-20}
                        interval={0}
                        tickMargin={20}
                        
                      />
                      <Tooltip />
                      <Bar 
                        name="Last year"
                        dataKey="last_year" 
                        fill="#93C5FD" 
                        radius={[4, 4, 4, 4]}
                        maxBarSize={40}
                      />
                      <Bar 
                        name="This year"
                        dataKey="this_year" 
                        fill="#3B82F6" 
                        radius={[4, 4, 4, 4]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-sm mr-2"></div>
                    <span className="text-sm text-gray-600">This year</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-200 rounded-sm mr-2"></div>
                    <span className="text-sm text-gray-600">Last year</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Top Products</h2>
                  <button className="text-blue-600 text-sm hover:text-blue-700">
                    Full results
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500">
                        <th className="pb-4 font-medium">Product</th>
                        <th className="pb-4 font-medium">Sold amount</th>
                        <th className="pb-4 font-medium">Unit price</th>
                        <th className="pb-4 font-medium">Revenue</th>
                        <th className="pb-4 font-medium">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product) => (
                        <tr key={product.id} className="border-t">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                                {product.product_name.includes('Camera') && <Camera className="w-4 h-4 text-gray-600" />}
                                {product.product_name.includes('Gun') && <Gamepad className="w-4 h-4 text-gray-600" />}
                                {product.product_name.includes('Note') && <Smartphone className="w-4 h-4 text-gray-600" />}
                                {product.product_name.includes('Nord') && <Smartphone className="w-4 h-4 text-gray-600" />}
                              </div>
                              {product.product_name}
                            </div>
                          </td>
                          <td>{product.sold_amount}</td>
                          <td>${product.unit_price}</td>
                          <td>${product.revenue.toLocaleString()}</td>
                          <td>
                            <div className="flex items-center">
                              <span className="text-yellow-400">★</span>
                              <span className="ml-1">{product.rating.toFixed(2)}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="w-80 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col">
                  <div className="w-full h-48">
                    {generateGaugeChart()}
                  </div>
                  <div className="w-full border-t border-gray-100 my-4"></div>
                  <h3 className="text-xl font-bold">You're good!</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Your sales performance score is better than 80% other users
                  </p>
                  <button className="mt-4 text-blue-500 text-sm font-medium bg-white hover:bg-gray-50 transition-colors rounded-full px-4 py-2 border border-gray-200">
                    Improve your score
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold mb-8">Customers by device</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={tweetActivity} 
                        margin={{ top: 5, right: 5, left: -30, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false}
                          tick={false}
                          stroke="#9CA3AF"
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false}
                          fontSize={12}
                          stroke="#9CA3AF"
                          ticks={[0, 4000, 8000]}
                          tickFormatter={(value) => `${value/1000}k`}
                          domain={[0, 8000]}
                          width={60}
                        />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="unique_count"
                          name="Web sales"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="cumulative_tweets"
                          name="Offline selling"
                          stroke="#93C5FD"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between mt-6 text-sm">
                    <div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-sm mr-2"></div>
                        <span className="text-gray-600">Web sales</span>
                      </div>
                      <div className="font-semibold">1,304%</div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-300 rounded-sm mr-2"></div>
                        <span className="text-gray-600">Offline selling</span>
                      </div>
                      <div className="font-semibold">473%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">Community feedback</h3>
                <h4 className="text-xl font-semibold mb-6">Mostly positive</h4>
                
                <div className="flex space-x-2 h-2 mb-6">
                  <div className="w-[7%] bg-red-300 rounded-full"></div>
                  <div className="w-[18%] bg-yellow-300 rounded-full"></div>
                  <div className="w-[75%] bg-green-300 rounded-full"></div>
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Negative</div>
                    <div className="font-semibold">12</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Neutral</div>
                    <div className="font-semibold">34</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Positive</div>
                    <div className="font-semibold">134</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}