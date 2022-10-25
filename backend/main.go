package main

import (
	"github.com/gin-gonic/gin"
	"github.com/watcharaphol1938/SA-65/controller"
	"github.com/watcharaphol1938/SA-65/entity"
	"github.com/watcharaphol1938/SA-65/middlewares"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		// check token ที่ได้มาจากหน้าบ้าน
		// ข้อมูลถูกต้อง จะเข้าถึง path ที่อยู่ในตัวแปร prptected ได้
		protected := api.Use(middlewares.Authorizes())
		{
			// User Routes
			protected.GET("/users", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			// protected.PATCH("/users", controller.UpdateUser)
			// protected.DELETE("/users/:id", controller.DeleteUser)
			protected.POST("/users", controller.CreateUser)

			// Province Routes
			protected.GET("/provinces", controller.ListProvince)
			protected.GET("/province/:id", controller.GetProvince)
			protected.POST("/provinces", controller.CreateProvince)
			// protected.PATCH("/provinces", controller.UpdateProvince)
			// protected.DELETE("/provinces/:id", controller.DeleteProvince)

			// NamePrefix Routes
			protected.GET("/nameprefixes", controller.ListNamePrefix)
			protected.GET("/nameprefix/:id", controller.GetNamePrefix)
			protected.POST("/nameprefixes", controller.CreateNamePrefix)
			// protected.PATCH("/nameprefixes", controller.UpdateNamePrefix)
			// protected.DELETE("/nameprefixes/:id", controller.DeleteNamePrefix)

			// Gender Routes
			protected.GET("/genders", controller.ListGender)
			protected.GET("/gender/:id", controller.GetGender)
			protected.POST("/genders", controller.CreateGender)
			// protected.PATCH("/genders", controller.UpdateGender)
			// protected.DELETE("/genders/:id", controller.DeleteGender)

			// Employee Routes
			protected.GET("/employees", controller.ListEmployee)
			protected.GET("/employee/:id", controller.GetEmployee)
			protected.POST("/employees", controller.CreateEmployee)
			// protected.PATCH("/employees", controller.UpdateEmployee)
			// protected.DELETE("/employees/:id", controller.DeleteEmployee)
		}
	}

	// Run the server
	r.POST("/login", controller.Login)

	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
