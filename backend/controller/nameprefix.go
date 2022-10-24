package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/watcharaphol1938/SA-65/entity"
)

// POST /nameprefixes
func CreateNamePrefix(c *gin.Context) {
	var nameprefix entity.NamePrefix

	if err := c.ShouldBindJSON(&nameprefix); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	if err := entity.DB().Create(&nameprefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nameprefix})
}

// GET /nameprefix/:id
func GetNamePrefix(c *gin.Context) {
	var nameprefix entity.NamePrefix
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM name_prefixes WHERE id = ?", id).Scan(&nameprefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nameprefix})
}

// GET /nameprefixes
func ListNamePrefix(c *gin.Context) {
	var nameprefix []entity.NamePrefix
	if err := entity.DB().Raw("SELECT * FROM name_prefixes").Scan(&nameprefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nameprefix})
}

// DELETE /nameprefixes/:id
func DeleteNamePrefix(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM name_prefixes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name prefix not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /nameprefixes
func UpdateNamePrefix(c *gin.Context) {
	var nameprefix entity.NamePrefix
	if err := c.ShouldBindJSON(&nameprefix); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", nameprefix.ID).First(&nameprefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&nameprefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nameprefix})
}
