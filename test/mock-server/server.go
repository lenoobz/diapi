package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/api/v1/getUserDetail", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"id": "123",
			"email": "abcdef@example.com",
			"firstName": "Tester#1",
			"lastName": "User",
			"profilePic": "https://www.example.com/profile/tester001.jpg",
		})
	})

	r.GET("/api/v1/getUserDetails", func(c *gin.Context) {
		var param struct{
			UID   []string `json:"uid,omitempty" form:"uid,omitempty"`
		}
		c.BindQuery(&param)

		if(len(param.UID) == 2 || len(param.UID) == 0) {
			interfaceSlice := []struct{
				ID string `json:"id"`
				Email string `json:"email"`
				FirstName string `json:"firstName"`
				LastName string `json:"lastName"`
				ProfilePic string `json:"profilePic"`
			}{
				{
					ID: "123",
					Email: "abcdef@example.com",
					FirstName: "Tester#1",
					LastName: "User",
					ProfilePic: "https://www.example.com/profile/tester001.jpg",
				},
				{
					ID: "124",
					Email: "abcdeg@example.com",
					FirstName: "Tester#2",
					LastName: "User",
					ProfilePic: "https://www.example.com/profile/tester002.jpg",
				},
			}

			c.JSON(200, &interfaceSlice)
			return
		}

		c.JSON(200, gin.H{
			"id": "123",
			"email": "abcdef@example.com",
			"firstName": "Tester#1",
			"lastName": "User",
			"profilePic": "https://www.example.com/profile/tester001.jpg",
		})

	})

	r.Run(":5555")
}