package main

import (
	"gimhook/buildbot"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func HeaderMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Server", "gimhook")
	}
}

func main() {
	log.Println("Starting...")

	contents, err := buildbot.Build(os.Args[1])

	if err != nil {
		log.Fatalln(err)
	}

	log.Println(contents)

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

	err = r.Run(":8080")

	if err != nil {
		log.Fatalln(err)
	}
}
