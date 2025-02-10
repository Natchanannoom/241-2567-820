const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
const port = 8000;

//เก็บ user
let users = []
let counter = 1
   
 //path = GET /users
app.get('/users', (req, res) => {
    res.json(users);
    
})

//path = POST/user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1
    users.push(user);
    res.json ({
        message: "User created",
        user: user
    });
})
// path = PUT /user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;
    
    let selectedIndex = users.findIndex(user => user.id == id);

    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname
    }
    
    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname
    }

    /*
    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname   
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
    */

    res.json({
        message: "User updated",
      data: updateUser,
      indexUpdate: selectedIndex
    }
    )

    //path = DELETE /user/:id
    app.delete('/user/:id', (req, res) => {
        let id = req.params.id;
        let selectedIndex = users.findIndex(user => user.id == id)
    //ลบ
        users.splice(selectedIndex, 1)
        res.json({
            message: "Deleted Completed",
            indexDelete: selectedIndex
        });
    })
     /*
     GET USER สำหรับ get users ทั้งหมด
     POST USER สำหรับเพิ่ม create users ใหม่บันทึกเข้าไป
    */
    


    //หา user จาก id ที่ส่งมา


    //update user นั้น

    // ส่งข้อมูล user ที่ update กลับไปที่เดิม
    res.send(id)
})

//เฝ้าส่งข้อมูลว่าใครต้องการอะไรและส่งข้อมูลกลับไป
app.listen(port, (req, res) => {
    console.log('Server is running on port' + port);

});


