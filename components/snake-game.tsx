"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Play, Pause } from "lucide-react"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: "RIGHT" as Direction,
    gameLoop: null as NodeJS.Timeout | null,
  })

  const GRID_SIZE = 20
  const CANVAS_SIZE = 400

  const generateFood = useCallback((): Position => {
    const maxPos = CANVAS_SIZE / GRID_SIZE - 1
    let newFood: Position

    do {
      newFood = {
        x: Math.floor(Math.random() * maxPos),
        y: Math.floor(Math.random() * maxPos),
      }
    } while (gameStateRef.current.snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))

    return newFood
  }, [])

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    gradient.addColorStop(0, "rgba(15, 15, 35, 0.9)")
    gradient.addColorStop(1, "rgba(30, 30, 60, 0.9)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw grid
    ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"
    ctx.lineWidth = 1
    for (let i = 0; i <= CANVAS_SIZE; i += GRID_SIZE) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, CANVAS_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(CANVAS_SIZE, i)
      ctx.stroke()
    }

    // Draw snake with gradient
    gameStateRef.current.snake.forEach((segment, index) => {
      const isHead = index === 0

      if (isHead) {
        // Snake head with glow effect
        ctx.shadowColor = "#8b5cf6"
        ctx.shadowBlur = 10
        ctx.fillStyle = "#8b5cf6"
      } else {
        // Snake body with gradient
        const alpha = 1 - (index / gameStateRef.current.snake.length) * 0.5
        ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
        ctx.shadowBlur = 0
      }

      ctx.fillRect(segment.x * GRID_SIZE + 2, segment.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4)

      // Add border
      ctx.strokeStyle = isHead ? "#ffffff" : "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 1
      ctx.strokeRect(segment.x * GRID_SIZE + 2, segment.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4)
    })

    // Draw food with pulsing effect
    ctx.shadowColor = "#ef4444"
    ctx.shadowBlur = 15
    ctx.fillStyle = "#ef4444"

    const foodSize = GRID_SIZE - 6
    const offset = (GRID_SIZE - foodSize) / 2

    ctx.beginPath()
    ctx.arc(
      gameStateRef.current.food.x * GRID_SIZE + GRID_SIZE / 2,
      gameStateRef.current.food.y * GRID_SIZE + GRID_SIZE / 2,
      foodSize / 2,
      0,
      2 * Math.PI,
    )
    ctx.fill()

    ctx.shadowBlur = 0
  }, [])

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return

    const { snake, direction, food } = gameStateRef.current
    const head = { ...snake[0] }

    // Move head based on direction
    switch (direction) {
      case "UP":
        head.y -= 1
        break
      case "DOWN":
        head.y += 1
        break
      case "LEFT":
        head.x -= 1
        break
      case "RIGHT":
        head.x += 1
        break
    }

    // Check wall collision
    const maxPos = CANVAS_SIZE / GRID_SIZE - 1
    if (head.x < 0 || head.x > maxPos || head.y < 0 || head.y > maxPos) {
      setIsGameOver(true)
      setIsPlaying(false)
      return
    }

    // Check self collision
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      setIsGameOver(true)
      setIsPlaying(false)
      return
    }

    const newSnake = [head, ...snake]

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
      setScore((prev) => {
        const newScore = prev + 10
        if (newScore > highScore) {
          setHighScore(newScore)
        }
        return newScore
      })
      gameStateRef.current.food = generateFood()
    } else {
      newSnake.pop()
    }

    gameStateRef.current.snake = newSnake
    drawGame()
  }, [isPaused, isGameOver, drawGame, generateFood, highScore])

  const startGame = useCallback(() => {
    gameStateRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: generateFood(),
      direction: "RIGHT",
      gameLoop: null,
    }

    setScore(0)
    setIsGameOver(false)
    setIsPaused(false)
    setIsPlaying(true)

    if (gameStateRef.current.gameLoop) {
      clearInterval(gameStateRef.current.gameLoop)
    }

    gameStateRef.current.gameLoop = setInterval(moveSnake, 150)
    drawGame()
  }, [moveSnake, drawGame, generateFood])

  const togglePause = useCallback(() => {
    if (isGameOver) return

    setIsPaused((prev) => !prev)

    if (isPaused) {
      gameStateRef.current.gameLoop = setInterval(moveSnake, 150)
    } else {
      if (gameStateRef.current.gameLoop) {
        clearInterval(gameStateRef.current.gameLoop)
      }
    }
  }, [isPaused, isGameOver, moveSnake])

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isPlaying || isPaused) return

      const { direction } = gameStateRef.current

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") gameStateRef.current.direction = "UP"
          break
        case "ArrowDown":
          if (direction !== "UP") gameStateRef.current.direction = "DOWN"
          break
        case "ArrowLeft":
          if (direction !== "RIGHT") gameStateRef.current.direction = "LEFT"
          break
        case "ArrowRight":
          if (direction !== "LEFT") gameStateRef.current.direction = "RIGHT"
          break
        case " ":
          e.preventDefault()
          togglePause()
          break
      }
    },
    [isPlaying, isPaused, togglePause],
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    drawGame()
    return () => {
      if (gameStateRef.current.gameLoop) {
        clearInterval(gameStateRef.current.gameLoop)
      }
    }
  }, [drawGame])

  return (
    <section id="snake-game" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Snake Game
        </h2>

        <div className="max-w-md mx-auto">
          <div className="glass-strong rounded-2xl p-6 text-center">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                <div className="text-muted-foreground">Score</div>
                <div className="text-2xl font-bold text-primary">{score}</div>
              </div>
              <div className="text-sm">
                <div className="text-muted-foreground">High Score</div>
                <div className="text-2xl font-bold text-primary">{highScore}</div>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              className="border border-primary/30 rounded-lg mb-4 w-full max-w-sm mx-auto"
              style={{ imageRendering: "pixelated" }}
            />

            <div className="flex gap-2 justify-center mb-4">
              <Button onClick={startGame} size="sm" className="bg-primary hover:bg-primary/80">
                <RotateCcw className="mr-2 h-4 w-4" />
                {isPlaying ? "Restart" : "Start"}
              </Button>

              {isPlaying && (
                <Button
                  onClick={togglePause}
                  size="sm"
                  variant="outline"
                  className="glass border-primary/30 bg-transparent"
                >
                  {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
              )}
            </div>

            {isGameOver && (
              <div className="glass rounded-lg p-4 mb-4 border border-destructive/30">
                <div className="text-destructive font-bold mb-2">Game Over!</div>
                <div className="text-sm text-muted-foreground">Final Score: {score}</div>
              </div>
            )}

            <div className="text-xs text-muted-foreground space-y-1">
              <div>Use arrow keys to control the snake</div>
              <div>Press spacebar to pause/resume</div>
              <div>Eat the red food to grow and score points!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
