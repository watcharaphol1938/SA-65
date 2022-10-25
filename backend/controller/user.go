package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/watcharaphol1938/SA-65/entity"
	"golang.org/x/crypto/bcrypt"
)

// GET /user/:id
// ส่งข้อมูลทั้งตัวหลักและตัวย่อยไปที่หน้าบ้านด้วย id ที่ระบุมา
func GetUser(c *gin.Context) {
	var user entity.User
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM users WHERE id = ?", id).
		Preload("NamePrefix").
		Preload("Employee").
		Preload("Gender").
		Preload("Province").
		Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /users
// ส่งข้อมูลทั้งตัวหลักและตัวย่อยไปหน้าบ้านทั้งหมด
func ListUsers(c *gin.Context) {
	var users []entity.User
	if err := entity.DB().Raw("SELECT * FROM users").
		Preload("NamePrefix").
		Preload("Employee").
		Preload("Gender").
		Preload("Province").
		Find(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

// DELETE /users/:id
// func DeleteUser(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// PATCH /users
// func UpdateUser(c *gin.Context) {
// 	var user entity.User
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", user.ID).First(&user); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&user).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": user})
// }

// POST /users
func CreateUser(c *gin.Context) {
	var user entity.User
	var gender entity.Gender
	var nameprefix entity.NamePrefix
	var province entity.Province
	var employee entity.Employee

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	// 8: ค้นหา nameprefix ด้วย id
	if tx := entity.DB().Table("name_prefixes").Where("id = ?", user.NamePrefixID).First(&nameprefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nameprefix not found"})
		return
	}

	// 9: ค้นหา employee ด้วย id
	if tx := entity.DB().Model(&entity.Employee{}).Where("id = ?", user.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// 10: ค้นหา gender ด้วย id
	if tx := entity.DB().Model(&entity.Gender{}).Where("id = ?", user.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// 11: ค้นหา province ด้วย id
	if tx := entity.DB().Model(&entity.Province{}).Where("id = ?", user.ProvinceID).First(&province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	user.Password = string(bytes)

	// 12: สร้าง user
	u := entity.User{
		FirstName:      user.FirstName,
		LastName:       user.LastName,
		NamePrefix:     nameprefix, // โยงความสัมพันธ์กับ Entity NamePrefix
		Gender:         gender,     // โยงความสัมพันธ์กับ Entity Gender
		Province:       province,   // โยงความสัมพันธ์กับ Entiy Province
		Password:       user.Password,
		Employee:       employee, // โยงความสัมพันธ์กับ Entiy Employee
		Address:        user.Address,
		Email:          user.Email,
		Identification: user.Identification,
		BirthDay:       user.BirthDay,
		Mobile:         user.Mobile,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})
}
