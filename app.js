const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;



// app.get('/' , (req , res) => {
//     res.status(200).json({message: 'hello from the server side!' , name: "kanhaiya" , age: 21});
// });

// app.post('/' , (req , res) => {
//     res.status(200).json({
//         name: "kanhaiya",
//         age: 21
//     })
// })


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`));

// I use JSON.parse befor reading because this data in json format and i wanna data in Java script object foermat so i use json.parse


app.get('/api/v1/tours' , (req , res) => {
    res.status(200).json({
        status: 'success',
        dataLength: tours.length,
        data: {
            tours: tours
        }
    })
})



app.listen(port , () => {
    console.log(`App runing on port ${port}...`);
});
