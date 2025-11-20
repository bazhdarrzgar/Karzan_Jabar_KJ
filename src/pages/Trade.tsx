import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Info } from 'lucide-react';
import { Badge } from '../components/ui/badge';

interface Trade {
  time: string;
  position: string;
  symbol: string;
  type: string;
  volume: number;
  entryPrice: number;
  exitTime: string;
  exitPrice: number;
  profit: number;
  swap: number;
  commission: number;
}

interface AccountInfo {
  id: string;
  password: string;
  server: string;
  filename: string;
  initialBalance: number;
  finalBalance: number;
}

const accountsInfo: AccountInfo[] = [
  {
    id: '2002009090',
    password: 'Kj5000$30000$Kj',
    server: 'JustMarkets-Live',
    filename: '2002009090.tsv',
    initialBalance: 5000,
    finalBalance: 31900
  },
  {
    id: '2000697192',
    password: '$KJcompany$1',
    server: 'JustMarkets-Live',
    filename: '2000697192.tsv',
    initialBalance: 100,
    finalBalance: 11250
  },
  {
    id: '2002588689',
    password: 'KJnumber1$',
    server: 'JustMarkets-Live',
    filename: '2002588689.tsv',
    initialBalance: 250,
    finalBalance: 2500
  }
];

const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6'];

export default function Trade() {
  const [tradesData, setTradesData] = useState<{ [key: string]: Trade[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllTradesData();
  }, []);

  const loadAllTradesData = async () => {
    const allData: { [key: string]: Trade[] } = {};
    
    for (const account of accountsInfo) {
      try {
        const response = await fetch(`/data/${account.filename}`);
        const text = await response.text();
        const trades = parseTSV(text);
        allData[account.id] = trades;
      } catch (error) {
        console.error(`Error loading ${account.filename}:`, error);
        allData[account.id] = [];
      }
    }
    
    setTradesData(allData);
    setLoading(false);
  };

  const parseTSV = (text: string): Trade[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const trades: Trade[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const fields = lines[i].split('\t');
      if (fields.length >= 13) {
        trades.push({
          time: fields[0],
          position: fields[1],
          symbol: fields[2],
          type: fields[3],
          volume: parseFloat(fields[4]) || 0,
          entryPrice: parseFloat(fields[5]) || 0,
          exitTime: fields[8],
          exitPrice: parseFloat(fields[9]) || 0,
          commission: parseFloat(fields[10]) || 0,
          swap: parseFloat(fields[11]) || 0,
          profit: parseFloat(fields[12]) || 0
        });
      }
    }
    
    return trades;
  };

  const calculateStats = (trades: Trade[]) => {
    const totalProfit = trades.reduce((sum, t) => sum + t.profit, 0);
    const profitableTrades = trades.filter(t => t.profit > 0);
    const lossTrades = trades.filter(t => t.profit < 0);
    const totalProfitFromWins = profitableTrades.reduce((sum, t) => sum + t.profit, 0);
    const totalLoss = lossTrades.reduce((sum, t) => sum + t.profit, 0);
    const winRate = trades.length > 0 ? (profitableTrades.length / trades.length) * 100 : 0;
    const avgProfit = profitableTrades.length > 0 ? totalProfitFromWins / profitableTrades.length : 0;
    const avgLoss = lossTrades.length > 0 ? totalLoss / lossTrades.length : 0;
    
    return {
      totalProfit,
      totalProfitFromWins,
      totalLoss,
      profitableTradesCount: profitableTrades.length,
      lossTradesCount: lossTrades.length,
      totalTrades: trades.length,
      winRate,
      avgProfit,
      avgLoss
    };
  };

  const getCumulativeProfitData = (trades: Trade[]) => {
    let cumulative = 0;
    return trades.map((trade, index) => {
      cumulative += trade.profit;
      return {
        index: index + 1,
        profit: trade.profit,
        cumulative: cumulative,
        date: trade.time.split(' ')[0]
      };
    });
  };

  const getSymbolPerformance = (trades: Trade[]) => {
    const symbolMap: { [key: string]: number } = {};
    trades.forEach(trade => {
      if (!symbolMap[trade.symbol]) {
        symbolMap[trade.symbol] = 0;
      }
      symbolMap[trade.symbol] += trade.profit;
    });
    
    return Object.entries(symbolMap)
      .map(([symbol, profit]) => ({ symbol, profit }))
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 10);
  };

  const renderAccountCard = (accountInfo: AccountInfo) => {
    const trades = tradesData[accountInfo.id] || [];
    const stats = calculateStats(trades);
    const cumulativeData = getCumulativeProfitData(trades);
    const symbolPerformance = getSymbolPerformance(trades);

    return (
      <TabsContent key={accountInfo.id} value={accountInfo.id} className="space-y-6">
        {/* Account Info Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100">MetaTrader 5 Account</CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300 mt-1">Account ID: {accountInfo.id}</CardDescription>
              </div>
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">Account ID</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{accountInfo.id}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">Investor Password</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-mono">{accountInfo.password}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">Server</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{accountInfo.server}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit Price</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ${accountInfo.initialBalance.toLocaleString()} to ${accountInfo.finalBalance.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Initial to Final Balance
              </p>
            </CardContent>
          </Card>

          <Card className={`${stats.totalProfit >= 0 ? 'border-green-200 bg-green-50 dark:bg-green-950' : 'border-red-200 bg-red-50 dark:bg-red-950'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
              <DollarSign className={`h-4 w-4 ${stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${stats.totalProfit.toFixed(2)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {stats.totalProfit >= 0 ? 'Profitable' : 'Loss'} overall
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:bg-green-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Wins</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${stats.totalProfitFromWins.toFixed(2)}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Avg: ${stats.avgProfit.toFixed(2)} per win
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cumulative Profit Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Cumulative Profit Over Time
              </CardTitle>
              <CardDescription>Track profit progression across all trades</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cumulativeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) => [`$${parseFloat(value).toFixed(2)}`, 'Cumulative']}
                    labelFormatter={(label) => `Trade #${label}`}
                  />
                  <Line type="monotone" dataKey="cumulative" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Symbol Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Top Symbols Performance
              </CardTitle>
              <CardDescription>Profit by trading symbol (Top 10)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={symbolPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="symbol" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => `$${parseFloat(value).toFixed(2)}`} />
                  <Bar dataKey="profit" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading trading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <a href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </a>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Trading Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and analyze your MetaTrader 5 trading performance</p>
        </div>

        <Tabs defaultValue={accountsInfo[0].id} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {accountsInfo.map(account => {
              const trades = tradesData[account.id] || [];
              const stats = calculateStats(trades);
              return (
                <TabsTrigger key={account.id} value={account.id} className="flex flex-col items-center gap-1">
                  <span className="font-semibold">Account {account.id}</span>
                  <Badge variant={stats.totalProfit >= 0 ? "default" : "destructive"} className="text-xs">
                    ${stats.totalProfit.toFixed(2)}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {accountsInfo.map(account => renderAccountCard(account))}
        </Tabs>
      </div>
    </div>
  );
}