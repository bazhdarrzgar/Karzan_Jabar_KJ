import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Cell } from 'recharts';
import { TrendingUp, Activity, DollarSign, BarChart3, Info, Download } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

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



// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, type }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {type === 'currency' ? `$${entry.value.toFixed(2)}` : entry.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Export chart data as CSV
const exportToCSV = (data: any[], filename: string) => {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).join(','));
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
};

export default function Trade() {
  const { t } = useTranslation();
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
      <TabsContent key={accountInfo.id} value={accountInfo.id} className="space-y-4 sm:space-y-6">
        {/* Account Info Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3 sm:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 dark:text-blue-100">{t('metatrader_account')}</CardTitle>
                <CardDescription className="text-sm sm:text-base text-blue-700 dark:text-blue-300 mt-1">{t('account_id')}: {accountInfo.id}</CardDescription>
              </div>
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('account_id')}</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 break-all">{accountInfo.id}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('investor_password')}</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 font-mono break-all">{accountInfo.password}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm sm:col-span-2 lg:col-span-1">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('server')}</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 break-all">{accountInfo.server}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">{t('total_profit_price')}</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 break-words">
                ${accountInfo.initialBalance.toLocaleString()} to ${accountInfo.finalBalance.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {t('initial_to_final_balance')}
              </p>
            </CardContent>
          </Card>

          <Card className={`${stats.totalProfit >= 0 ? 'border-green-200 bg-green-50 dark:bg-green-950' : 'border-red-200 bg-red-50 dark:bg-red-950'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">{t('total_profit_loss')}</CardTitle>
              <DollarSign className={`h-4 w-4 flex-shrink-0 ${stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${stats.totalProfit.toFixed(2)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {stats.totalProfit >= 0 ? t('profitable_overall') : t('loss_overall')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:bg-green-950 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">{t('total_wins')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">${stats.totalProfitFromWins.toFixed(2)}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {t('avg_per_win', { amount: stats.avgProfit.toFixed(2) })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Cumulative Profit Area Chart with Gradient */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-blue-600" />
                  <CardTitle className="text-base sm:text-lg break-words">{t('cumulative_profit_curve')}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => exportToCSV(cumulativeData, `cumulative-profit-${accountInfo.id}`)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="text-xs sm:text-sm">{t('cumulative_profit_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={280} minWidth={300}>
                  <AreaChart data={cumulativeData}>
                    <defs>
                      <linearGradient id={`colorProfit${accountInfo.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                    <XAxis
                      dataKey="index"
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      label={{ value: t('trade_number'), position: 'insideBottom', offset: -5, fontSize: 11 }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      label={{ value: t('profit_label'), angle: -90, position: 'insideLeft', fontSize: 11 }}
                    />
                    <Tooltip content={<CustomTooltip type="currency" />} />
                    <Area
                      type="monotone"
                      dataKey="cumulative"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill={`url(#colorProfit${accountInfo.id})`}
                      name="Cumulative Profit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Symbol Performance Enhanced Bar Chart */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-purple-600" />
                  <CardTitle className="text-base sm:text-lg break-words">{t('top_performing_symbols')}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => exportToCSV(symbolPerformance, `symbol-performance-${accountInfo.id}`)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="text-xs sm:text-sm">{t('top_symbols_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={280} minWidth={300}>
                  <BarChart data={symbolPerformance} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                    <XAxis
                      dataKey="symbol"
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      label={{ value: t('profit_label'), angle: -90, position: 'insideLeft', fontSize: 11 }}
                    />
                    <Tooltip content={<CustomTooltip type="currency" />} />
                    <Bar
                      dataKey="profit"
                      fill="#8b5cf6"
                      radius={[8, 8, 0, 0]}
                      name="Profit"
                    >
                      {symbolPerformance.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.profit >= 0 ? '#10b981' : '#ef4444'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('loading_trading_data')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <a href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="hidden xs:inline">{t('back_to_home')}</span>
              <span className="xs:hidden">{t('back')}</span>
            </a>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{t('trade_dashboard_title')}</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t('trade_dashboard_desc')}</p>
        </div>

        <Tabs defaultValue={accountsInfo[0].id} className="w-full">
          {/* Mobile: Scrollable tabs, Desktop: Grid */}
          <div className="mb-4 sm:mb-6">
            <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 h-auto sm:h-10 bg-transparent sm:bg-muted p-0 sm:p-1">
              {accountsInfo.map(account => {
                const trades = tradesData[account.id] || [];
                const stats = calculateStats(trades);
                return (
                  <TabsTrigger
                    key={account.id}
                    value={account.id}
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-1.5 px-3 sm:px-4 data-[state=active]:bg-background rounded-md w-full"
                  >
                    <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
                      <span className="hidden sm:inline">Account </span>
                      <span className="sm:hidden">#</span>
                      {account.id}
                    </span>
                    <Badge
                      variant={stats.totalProfit >= 0 ? "default" : "destructive"}
                      className="text-xs whitespace-nowrap"
                    >
                      ${stats.totalProfit.toFixed(2)}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {accountsInfo.map(account => renderAccountCard(account))}
        </Tabs>
      </div>
    </div>
  );
}