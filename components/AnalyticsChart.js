// components/AnalyticsChart.js
import { useMemo } from 'react';

// ========================================
// 📈 LINE CHART (Линейный график)
// ========================================
export function LineChart({ data, height = 200, color = '#3B82F6' }) {
  const { points, maxY } = useMemo(() => {
    if (!data || data.length === 0) return { points: '', maxY: 0 };
    
    const maxY = Math.max(...data.map(d => d.value), 1);
    const width = 100;
    const step = width / (data.length - 1 || 1);
    
    const pts = data.map((d, i) => {
      const x = i * step;
      const y = 100 - (d.value / maxY) * 80 - 10;
      return `${x},${y}`;
    }).join(' ');
    
    return { points: pts, maxY };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="relative" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Градиент под линией */}
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Сетка */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="0.3"
            strokeDasharray="2,2"
          />
        ))}
        
        {/* Область под графиком */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${color})`}
          className="transition-all duration-500"
        />
        
        {/* Линия графика */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500"
        />
        
        {/* Точки на графике */}
        {data.map((d, i) => {
          const x = (i * 100) / (data.length - 1 || 1);
          const y = 100 - (d.value / maxY) * 80 - 10;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill={color}
              className="transition-all duration-300 hover:r-2"
            >
              <title>{d.label}: {d.value}</title>
            </circle>
          );
        })}
      </svg>
      
      {/* Подписи по оси X */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1 pb-2">
        {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0).map((d, i) => (
          <span key={i} className="truncate max-w-12">{d.label}</span>
        ))}
      </div>
    </div>
  );
}

// ========================================
// 📊 BAR CHART (Столбчатый график)
// ========================================
export function BarChart({ data, height = 200, color = '#8B5CF6' }) {
  const maxY = useMemo(() => {
    if (!data || data.length === 0) return 1;
    return Math.max(...data.map(d => d.value), 1);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="relative" style={{ height }}>
      <div className="absolute inset-0 flex items-end justify-around gap-2 pb-8">
        {data.map((d, i) => {
          const barHeight = (d.value / maxY) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative" style={{ height: `${barHeight}%` }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{
                    height: '100%',
                    background: `linear-gradient(to top, ${color}, ${color}dd)`,
                    minHeight: '4px',
                    animation: `growUp 0.5s ease-out ${i * 0.1}s both`
                  }}
                >
                  <title>{d.label}: {d.value}</title>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center" style={{ maxWidth: '60px' }}>
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes growUp {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

// ========================================
// 🍩 DONUT CHART (Круговая диаграмма)
// ========================================
export function DonutChart({ data, size = 160 }) {
  const { segments, total } = useMemo(() => {
    if (!data || data.length === 0) return { segments: [], total: 0 };
    
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let cumulative = 0;
    
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#6366F1', '#EF4444', '#14B8A6'];
    
    const segments = data.map((d, i) => {
      const start = cumulative;
      const fraction = d.value / total;
      cumulative += fraction;
      
      return {
        label: d.label,
        value: d.value,
        percent: Math.round(fraction * 100),
        color: colors[i % colors.length],
        startAngle: start * 360,
        endAngle: cumulative * 360
      };
    });
    
    return { segments, total };
  }, [data]);

  if (!data || data.length === 0 || total === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400" style={{ width: size, height: size }}>
        Нет данных
      </div>
    );
  }

  const describeArc = (startAngle, endAngle, radius = 40) => {
    const start = polarToCartesian(50, 50, radius, endAngle);
    const end = polarToCartesian(50, 50, radius, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    
    return `M 50 50 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (angle - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
        {segments.map((seg, i) => (
          <path
            key={i}
            d={describeArc(seg.startAngle, seg.endAngle)}
            fill={seg.color}
            className="transition-all duration-300 hover:opacity-80 cursor-pointer"
            style={{
              animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`
            }}
          >
            <title>{seg.label}: {seg.value} ({seg.percent}%)</title>
          </path>
        ))}
        {/* Центральное отверстие */}
        <circle cx="50" cy="50" r="25" className="fill-white dark:fill-gray-800" />
      </svg>
      
      {/* Легенда */}
      <div className="space-y-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{seg.label}</span>
            <span className="text-gray-500 dark:text-gray-400 font-medium">({seg.percent}%)</span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ========================================
// ✨ SPARKLINE (Мини-график)
// ========================================
export function Sparkline({ data, color = '#3B82F6' }) {
  const points = useMemo(() => {
    if (!data || data.length < 2) return '';
    const maxY = Math.max(...data, 1);
    const width = 100;
    const step = width / (data.length - 1);
    
    return data.map((v, i) => {
      const x = i * step;
      const y = 100 - (v / maxY) * 80;
      return `${x},${y}`;
    }).join(' ');
  }, [data]);

  return (
    <svg viewBox="0 0 100 100" className="w-full h-12" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}