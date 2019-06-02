package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"encoding/json"
	"io/ioutil"
	"fmt"
)

type User struct {

	Id int 
	Email string
	FirstName string
	LastName string
	ProfilePic string

}

var users[] User


func main() {
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/api/v1/getUserDetail", func(c * gin.Context) {
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

	r.POST("/api/v1/addUserDetails", func(c * gin.Context){

		var user User
		b, _ := ioutil.ReadAll(c.Request.Body)
		err := json.Unmarshal(b, &user)

		if (err != nil) {
			fmt.Println(err); 
		} 
		
		users = append(users, user)
		message := user.FirstName + " " + user.LastName + " is added"

		c.JSON(200, message)
	})

	r.PUT("api/v1/UserDetails", func(c * gin.Context) {
		var user User
		b, _ := ioutil.ReadAll(c.Request.Body)
		err := json.Unmarshal(b, &user)

		if (err2 != nil){
			fmt.Println(err)
		}

		if (err != nil) {
			fmt.Println(err); 
		} 
		
		message := user.FirstName + " " + user.LastName + " details are modified!"
		c.JSON(200, message)
	})

	r.Run(":5555")
}