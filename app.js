const express = require('express');
const app = express();
const port = 3000;
app.get('/' , (req , res) => {
    res.status(200).json({message: 'hello from the server side!' , name: "kanhaiya" , age: 21});
});

app.post('/' , (req , res) => {
    res.status(200).json({
        name: "kanhaiya",
        age: 21
    })
})
app.listen(port , () => {
    console.log(`App runing on port ${port}...`);
});
