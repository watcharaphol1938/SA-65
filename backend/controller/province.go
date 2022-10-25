package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/watcharaphol1938/SA-65/entity"
)

// POST /provinces
func CreateProvince(c *gin.Context) {
	var province entity.Province

	if err := c.ShouldBindJSON(&province); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	if err := entity.DB().Create(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}

// GET /province/:id
func GetProvince(c *gin.Context) {
	var province entity.Province
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM provinces WHERE id = ?", id).Find(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}

// GET /provinces
func ListProvince(c *gin.Context) {
	var province []entity.Province
	if err := entity.DB().Raw("SELECT * FROM provinces").Scan(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}

// // DELETE /provinces/:id
// func DeleteProvince(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /provinces
// func UpdateProvince(c *gin.Context) {
// 	var province entity.Province
// 	if err := c.ShouldBindJSON(&province); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", province.ID).First(&province); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "province not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&province).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": province})
// }
