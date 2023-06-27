package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func HeaderMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Server", "gimhook")
	}
}

func main() {
	log.Println("Starting...")

	// Set up gin

	gin.SetMode(gin.ReleaseMode)

	r := gin.Default()
	r.SetTrustedProxies([]string{"127.0.0.1"})

	// Add the middleware

	r.Use(HeaderMiddleware())

	// Handle routes

	r.GET("/api/v1/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"hello": "world",
		})
	})

	log.Println("Ready!")

	r.Run(":8080")
}
