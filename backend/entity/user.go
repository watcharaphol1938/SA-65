package entity

import (
	"time"

	"gorm.io/gorm"
)

// ตาราง User
type User struct {
	gorm.Model
	/* FirstName string
	LastName  string
	Email     string
	Age       uint8
	BirthDsy  time.Time */

	NamePrefixID *uint
	NamePrefix   NamePrefix `gorm:"references:ID"`

	FirstName string
	LastName  string

	EmployeeID *uint
	Employee   Employee `gorm:"references:ID"`

	BirthDay       time.Time
	Identification string `gorm:"uniqueIndex"`
	Email          string `gorm:"uniqueIndex"`
	Password       string

	GenderID *uint
	Gender   Gender `gorm:"references:ID"`

	Mobile  string `gorm:"uniqueIndex"`
	Address string

	ProvinceID *uint
	Province   Province
}

// ตาราง Gender
type Gender struct {
	gorm.Model
	GenderName string
	// ID ทำหน้าที่เป็น FK
	// OwnerID *uint
	// เป็นข้อมูล User ใช้เพื่อ join ง่ายขึ้น
	Users []User `gorm:"foreignKey:GenderID"`
}

// ตาราง Province
type Province struct {
	gorm.Model
	ProvinceName string
	// ID ทำหน้าที่เป็น FK
	// OwnerID *uint
	// เป็นข้อมูล User ใช้เพื่อ join ง่ายขึ้น
	Users []User `gorm:"foreignKey:ProvinceID"`
}

// ตาราง NamePrefix
type NamePrefix struct {
	gorm.Model
	PrefixName string
	// ID ทำหน้าที่เป็น FK
	// OwnerID *uint
	// เป็นข้อมูล User ใช้เพื่อ join ง่ายขึ้น
	Users []User `gorm:"foreignKey:NamePrefixID"`
}

// ตาราง Employee
type Employee struct {
	gorm.Model
	First_Name string
	Last_Name  string
	Email      string
	Password   string
	// ID ทำหน้าที่เป็น FK
	// OwnerID *uint
	// เป็นข้อมูล User ใช้เพื่อ join ง่ายขึ้น
	Users []User `gorm:"foreignKey:EmployeeID"`
}
