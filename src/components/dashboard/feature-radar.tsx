'use client'

import { FeatureScores } from '@/types'

interface FeatureRadarProps {
  scores: FeatureScores
  size?: number
}

export function FeatureRadar({ scores, size = 200 }: FeatureRadarProps) {
  const center = size / 2
  const radius = size / 2 - 30
  
  const features = [
    { key: 'attention', label: 'ATT', angle: -90 },
    { key: 'liquidity', label: 'LIQ', angle: -18 },
    { key: 'coherence', label: 'COH', angle: 54 },
    { key: 'whale', label: 'WHL', angle: 126 },
    { key: 'engineering', label: 'ENG', angle: 198 },
  ] as const
  
  // Calculate polygon points
  const points = features.map(f => {
    const value = scores[f.key]
    const normalizedRadius = (value / 100) * radius
    const angleRad = (f.angle * Math.PI) / 180
    return {
      x: center + normalizedRadius * Math.cos(angleRad),
      y: center + normalizedRadius * Math.sin(angleRad),
      label: f.label,
      value,
      labelX: center + (radius + 15) * Math.cos(angleRad),
      labelY: center + (radius + 15) * Math.sin(angleRad),
    }
  })
  
  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ')
  
  // Background grid lines
  const gridLevels = [25, 50, 75, 100]
  
  return (
    <svg width={size} height={size} className="overflow-visible">
      {/* Grid circles */}
      {gridLevels.map(level => (
        <circle
          key={level}
          cx={center}
          cy={center}
          r={(level / 100) * radius}
          fill="none"
          stroke="#222230"
          strokeWidth={1}
        />
      ))}
      
      {/* Grid lines to points */}
      {features.map(f => {
        const angleRad = (f.angle * Math.PI) / 180
        return (
          <line
            key={f.key}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angleRad)}
            y2={center + radius * Math.sin(angleRad)}
            stroke="#222230"
            strokeWidth={1}
          />
        )
      })}
      
      {/* Score polygon */}
      <polygon
        points={polygonPoints}
        fill="rgba(59, 130, 246, 0.2)"
        stroke="#3b82f6"
        strokeWidth={2}
      />
      
      {/* Points */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="#3b82f6"
          stroke="#0a0a0f"
          strokeWidth={2}
        />
      ))}
      
      {/* Labels */}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.labelX}
          y={p.labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-gray-400"
        >
          {p.label}
        </text>
      ))}
    </svg>
  )
}
