"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  endDate: string
}

const calculateTimeLeft = (endDate: string) => {
  const difference = +new Date(endDate) - +new Date()
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

export function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  const formatTime = (time: number) => time.toString().padStart(2, "0")

  const TimeValue = ({ value }: { value: string }) => (
    <span
      key={value}
      className="text-xl font-bold animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
    >
      {value}
    </span>
  );

  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-center">
      <div className="flex h-[58px] w-[50px] flex-col items-center justify-center rounded-md bg-primary/20 p-2">
        <TimeValue value={formatTime(timeLeft.days)} />
        <span className="text-xs">Hari</span>
      </div>
      <div className="flex h-[58px] w-[50px] flex-col items-center justify-center rounded-md bg-primary/20 p-2">
        <TimeValue value={formatTime(timeLeft.hours)} />
        <span className="text-xs">Jam</span>
      </div>
      <div className="flex h-[58px] w-[50px] flex-col items-center justify-center rounded-md bg-primary/20 p-2">
        <TimeValue value={formatTime(timeLeft.minutes)} />
        <span className="text-xs">Menit</span>
      </div>
      <div className="flex h-[58px] w-[50px] flex-col items-center justify-center rounded-md bg-primary/20 p-2">
        <TimeValue value={formatTime(timeLeft.seconds)} />
        <span className="text-xs">Detik</span>
      </div>
    </div>
  )
}