package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func login(c *gin.Context) {
	c.PostForm("username")
	c.PostForm("password")

	c.String(http.StatusOK, "Hello %s", "Adhi")
}

func signup(c *gin.Context) {
	c.PostForm("username")
	c.PostForm("password")

	c.String(http.StatusOK, "Hello %s", "Adhi")
}